import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

function setCorsHeaders(req: VercelRequest, res: VercelResponse): void {
  const requestOrigin = typeof req.headers.origin === 'string' ? req.headers.origin : '';

  if (requestOrigin) {
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
  const recentRequests = (requestLog.get(clientKey) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(clientKey, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(clientKey, recentRequests);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(getClientKey(req))) {
    return res.status(429).json({ error: 'Too many messages. Please try again shortly.' });
  }

  let body: unknown = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body) as unknown;
    } catch {
      return res.status(400).json({ error: 'Request body must be valid JSON.' });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Missing request body.' });
  }

  const { name, email, message } = body as Record<string, unknown>;
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail) || trimmedName.length > 100 || trimmedMessage.length > 2000) {
    return res.status(400).json({ error: 'Invalid form data.' });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing on the server.');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const configuredSender = (process.env.CONTACT_FROM_EMAIL ?? process.env.CONTACT_EMAIL ?? 'onboarding@resend.dev').trim();
  const recipientEmail = (process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_EMAIL ?? 'jasonceloza90@gmail.com').trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${configuredSender}>`,
        to: [recipientEmail],
        reply_to: trimmedEmail,
        subject: `New message from ${trimmedName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
            <h2 style="color: #7aabff; margin-bottom: 24px;">New Portfolio Contact</h2>

            <div style="margin-bottom: 16px;">
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 4px;">NAME</p>
              <p style="font-size: 16px; margin: 0;">${escapeHtml(trimmedName)}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 4px;">EMAIL</p>
              <p style="font-size: 16px; margin: 0;">
                <a href="mailto:${encodeURIComponent(trimmedEmail)}" style="color: #7aabff;">${escapeHtml(trimmedEmail)}</a>
              </p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 4px;">MESSAGE</p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
            </div>

            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px;" />
            <p style="color: #475569; font-size: 12px; margin: 0;">Sent from your portfolio contact form</p>
          </div>
        `,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      let errorMessage = 'Failed to send email';
      try {
        const parsed = JSON.parse(text) as { message?: string; name?: string };
        errorMessage = parsed.message || parsed.name || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }

      return res.status(response.status).json({ error: errorMessage });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Contact form email failed:', { message: errorMessage });
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}