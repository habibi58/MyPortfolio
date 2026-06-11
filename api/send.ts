import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
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
        // This stays secret on the server — never exposed to the browser
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <jasonceloza90@gmail.com>',
        // 👇 Replace with your actual email
        to: [process.env.CONTACT_EMAIL ?? 'jasonceloza90@gmail.com'],
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
    console.log("Resend status:", response.status, "body:", text);

    if (!response.ok) {
      let errorMessage = "Failed to send email";
      try { const e = JSON.parse(text); errorMessage = e.message || e.name || errorMessage; } catch { errorMessage = text || errorMessage; }
      return res.status(response.status).json({ error: errorMessage });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}