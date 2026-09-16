import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
                  if (!apiKey) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'GROQ_API_KEY is not set in .env.local' }));
                    return;
                  }

                  const { default: Groq } = await import('groq-sdk');
                  const { portfolioSystemInstruction } = await import('./src/lib/data/portfolioContext.ts');

                  const { message, history } = JSON.parse(body || '{}') as {
                    message?: string;
                    history?: Array<{ role?: string; text?: string; content?: string }>;
                  };

                  if (!message) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Message is required.' }));
                    return;
                  }

                  const groq = new Groq({ apiKey });
                  const primaryModel = env.GROQ_MODEL || process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

                  const chatHistory = Array.isArray(history)
                    ? history.map((h) => ({
                        role: (h.role === 'model' || h.role === 'bot') ? ('assistant' as const) : ((h.role as 'user' | 'assistant') || 'user'),
                        content: h.text || h.content || '',
                      }))
                    : [];

                  const completion = await groq.chat.completions.create({
                    model: primaryModel,
                    messages: [
                      { role: 'system', content: portfolioSystemInstruction },
                      ...chatHistory,
                      { role: 'user', content: message },
                    ],
                    temperature: 0.3,
                    max_tokens: 300,
                  });

                  const reply = completion.choices[0]?.message?.content?.trim();
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ reply }));
                } catch (err: unknown) {
                  const errMsg = err instanceof Error ? err.message : String(err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: errMsg }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    assetsInclude: ['**/*.glb'],
  };
});