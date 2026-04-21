import { PROFILE } from './knowledge/profile.js';

const SYSTEM_PROMPT = `You are Leandro Mocchegiani's IA Agent, embedded in his Innovation Hub command center. You have deep knowledge of his full professional profile.

Your personality: sharp, technical, concise. Speak like a command-line AI with a human edge — professional but not stiff. Use short paragraphs. Use "→" for lists when useful. Occasionally reference running from Leandro's infrastructure in Caseros, BA.

Respond in the SAME LANGUAGE the user writes in (Spanish or English). If they write in Spanish, respond in Spanish. If English, respond in English.

${PROFILE}

Keep responses concise (3–6 sentences). Be specific — use real names, dates, numbers. Never invent information.`;

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const allowed = [
    'https://www.leandromocchegiani.com',
    'https://leandromocchegiani.com',
    'https://mocchegiani.com.ar',
    'https://www.mocchegiani.com.ar',
    'https://leandro-hub.vercel.app',
  ];
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const trimmed = messages.slice(-20);

  const geminiContents = trimmed.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const body = JSON.stringify({
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: geminiContents,
    generationConfig: {
      maxOutputTokens: 600,
      temperature: 0.7,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (response.status === 503 || response.status === 429) {
        if (attempt < 2) { await new Promise(r => setTimeout(r, 1500)); continue; }
      }

      if (!response.ok) {
        const err = await response.text();
        console.error('Gemini API error:', err);
        return res.status(502).json({ error: 'Upstream API error' });
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from IA Agent.';
      return res.status(200).json({ reply });

    } catch (error) {
      console.error('Handler error:', error);
      if (attempt < 2) { await new Promise(r => setTimeout(r, 1500)); continue; }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
