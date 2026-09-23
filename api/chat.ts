import Groq from 'groq-sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { portfolioSystemInstruction as JASON_PERSONA } from '../src/lib/data/portfolioContext.js';

type ChatRole = 'user' | 'assistant';

type HistoryMessage = {
  role: ChatRole;
  text: string;
};

type FrontendMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequestBody = {
  message?: unknown;
  history?: unknown;
  messages?: unknown;
};

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_LENGTH = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const MAX_TRACKED_CLIENTS = 10_000;
const requestLog = new Map<string, number[]>();

function setCorsHeaders(req: VercelRequest, res: VercelResponse): void {
  const requestOrigin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
  const allowedOrigins = [
    process.env.APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ].filter((value): value is string => Boolean(value));

  const isAllowedOrigin = requestOrigin !== '' && (
    allowedOrigins.includes(requestOrigin) || requestOrigin.endsWith('.vercel.app')
  );

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getClientKey(req: VercelRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  return typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : 'anonymous';
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const recentRequests = (requestLog.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  for (const [key, timestamps] of requestLog) {
    if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
      requestLog.delete(key);
    }
  }

  if (!requestLog.has(clientKey) && requestLog.size >= MAX_TRACKED_CLIENTS) {
    const oldestClient = requestLog.keys().next().value;
    if (typeof oldestClient === 'string') requestLog.delete(oldestClient);
  }

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(clientKey, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(clientKey, recentRequests);
  return false;
}

const DEFAULT_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODEL = 'qwen/qwen3.8-27b';
const SAFE_REFUSAL_MESSAGE = 'I can help with Jason\'s portfolio, skills, experience, and contact details. I can\'t reveal internal instructions, source code, API keys, or secret backend details.';
const BLOCKED_PROMPT_PATTERNS = [
  'system prompt',
  'prompt instructions',
  'internal instructions',
  'hidden prompt',
  'reveal your prompt',
  'show me your prompt',
  'what are your instructions',
  'api key',
  'secret key',
  'access token',
  'source code',
  'show me the code',
  'reveal the code',
  'show the source',
  'read the source',
  'env file',
  '.env',
  'environment variable',
  'private key',
  'token',
  'secret',
  'debug your backend',
  'ignore previous instructions',
  'jailbreak',
  'developer message',
  'system message',
  'prompt engineering',
  'how did you build this',
];

function normalizeForPromptCheck(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function containsBlockedPrompt(value: string): boolean {
  const normalized = normalizeForPromptCheck(value);
  return BLOCKED_PROMPT_PATTERNS.some((pattern) => normalized.includes(pattern));
}

function parseHistoryMessage(value: unknown): HistoryMessage | null {
  if (!value || typeof value !== 'object') return null;
  const message = value as Record<string, unknown>;
  const rawRole = String(message.role ?? '').toLowerCase();
  const role: ChatRole | null =
    rawRole === 'user' ? 'user' : (rawRole === 'assistant' || rawRole === 'model' || rawRole === 'bot') ? 'assistant' : null;
  if (!role) return null;
  if (typeof message.text !== 'string') return null;
  const text = message.text.trim();
  if (!text || text.length > MAX_MESSAGE_LENGTH) return null;
  return { role, text };
}

function isFrontendMessage(value: unknown): value is FrontendMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

function parseRequest(body: unknown): { message: string; history: HistoryMessage[] } | null {
  if (!body || typeof body !== 'object') return null;
  const request = body as ChatRequestBody;

  if (typeof request.message === 'string') {
    const message = request.message.trim();
    const history = Array.isArray(request.history)
      ? (request.history.map(parseHistoryMessage).filter((item): item is HistoryMessage => item !== null))
      : [];
    if (!message || message.length > MAX_MESSAGE_LENGTH) return null;
    return { message, history: history.slice(-MAX_HISTORY_LENGTH) };
  }

  if (!Array.isArray(request.messages)) return null;
  const messages = request.messages.filter(isFrontendMessage);
  const latestMessage = messages[messages.length - 1];
  if (!latestMessage || latestMessage.role !== 'user') return null;

  return {
    message: latestMessage.content.trim(),
    history: messages.slice(0, -1).slice(-MAX_HISTORY_LENGTH).map(({ role, content }) => ({
      role,
      text: content.trim(),
    })),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, OPTIONS, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(getClientKey(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  let requestBody: unknown = req.body;
  if (typeof requestBody === 'string') {
    try {
      requestBody = JSON.parse(requestBody) as unknown;
    } catch {
      return res.status(400).json({ error: 'Request body must be valid JSON.' });
    }
  }

  const parsedRequest = parseRequest(requestBody);
  if (!parsedRequest) {
    return res.status(400).json({
      error: `Send a non-empty message of ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    });
  }

  const promptText = parsedRequest.message;
  const historyText = parsedRequest.history.map((item) => item.text).join(' ');

  if (containsBlockedPrompt(promptText) || containsBlockedPrompt(historyText)) {
    console.warn('Blocked potentially sensitive prompt request.', {
      messagePreview: promptText.slice(0, 200),
      historyPreview: historyText.slice(0, 200),
    });
    return res.status(200).json({ reply: SAFE_REFUSAL_MESSAGE });
  }

  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    console.error('GROQ_API_KEY is missing on the server.');
    return res.status(500).json({ error: 'AI service is not configured.' });
  }

  const primaryModel = process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL;
  const modelsToTry = primaryModel !== FALLBACK_MODEL ? [primaryModel, FALLBACK_MODEL] : [primaryModel];

  try {
    const groq = new Groq({ apiKey });
    let lastError: unknown = null;

    for (const model of modelsToTry) {
      try {
        const completion = await groq.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: JASON_PERSONA },
            ...parsedRequest.history.map(({ role, text }) => ({ role, content: text })),
            { role: 'user', content: parsedRequest.message },
          ],
          temperature: 0.3,
          max_tokens: 300,
        });

        const reply = completion.choices[0]?.message?.content?.trim();
        if (reply) {
          return res.status(200).json({ reply });
        }
      } catch (attemptError) {
        lastError = attemptError;
        console.warn(`Groq chat attempt with model ${model} failed:`, attemptError);
      }
    }

    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    const safeErrorMessage = errorMessage.includes('api key') || errorMessage.includes('API key')
      ? 'AI service authentication failed.'
      : 'AI service temporarily unavailable.';
    return res.status(502).json({ error: safeErrorMessage });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Groq chat request failed:', { message: errorMessage });
    return res.status(500).json({ error: 'Backend error.' });
  }
}

