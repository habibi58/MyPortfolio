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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_EMAIL ?? 'jasonceloza90@gmail.com'],
        subject: `New message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
            <h2 style="color: #7aabff; margin-bottom: 24px;">New Portfolio Contact</h2>

            <div style="margin-bottom: 16px;">
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 4px;">NAME</p>
              <p style="font-size: 16px; margin: 0;">${name}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 4px;">EMAIL</p>
              <p style="font-size: 16px; margin: 0;">
                <a href="mailto:${email}" style="color: #7aabff;">${email}</a>
              </p>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 0.1em; margin: 0 0 4px;">MESSAGE</p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px;" />
            <p style="color: #475569; font-size: 12px; margin: 0;">Sent from your portfolio contact form</p>
          </div>
        `,
      }),
    });

    const text = await response.text();
    console.log('Resend status:', response.status, 'body:', text);

    if (!response.ok) {
      let errorMessage = 'Failed to send email';
      try { const e = JSON.parse(text); errorMessage = e.message || e.name || errorMessage; } catch { errorMessage = text || errorMessage; }
      return res.status(response.status).json({ error: errorMessage });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}