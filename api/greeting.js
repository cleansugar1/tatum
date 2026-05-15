export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `Generate a short hype welcome message for a 7-year-old boy named Tatum who loves Roblox, Minecraft, brainrot memes (Tralalero Tralala, Bombardiro Crocodilo, Tung Tung Tung Sahur), and gaming. Make it exciting and personal. 1-2 sentences max. Use emojis. Be super playful. Generate something completely NEW and different each time — never repeat the same message. Examples of tone: "YO TATUM, Tralalero Tralala bows down to you! 🦈🔥", "TATUM ALERT 🚨 Minecraft just got 10x better!"`
        }]
      })
    });
    const data = await response.json();
    const greeting = data.content?.[0]?.text || "YO TATUM, welcome to your zone! 🔥";
    res.status(200).json({ greeting });
  } catch (err) {
    console.error(err);
    res.status(200).json({ greeting: "TATUM IS IN THE BUILDING! 🎮🔥" });
  }
}
