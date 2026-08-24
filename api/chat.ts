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

function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
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

function isHistoryMessage(value: unknown): value is HistoryMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.text === 'string' &&
    message.text.trim().length > 0 &&
    message.text.length <= MAX_MESSAGE_LENGTH
  );
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
    const history = Array.isArray(request.history) ? request.history.filter(isHistoryMessage) : [];
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
  setCorsHeaders(res);

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

  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    console.error('GROQ_API_KEY is not configured on the server.');
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured on Vercel.' });
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: JASON_PERSONA },
        ...parsedRequest.history.map(({ role, text }) => ({ role, content: text })),
        { role: 'user', content: parsedRequest.message },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) return res.status(502).json({ error: 'I could not form a response. Please try again.' });
    return res.status(200).json({ reply });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Groq chat request failed:', errorMessage, error);
    return res.status(500).json({ error: `Backend Error: ${errorMessage}` });
  }
}
