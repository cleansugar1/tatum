# 🎮 Tatum's Zone

A personal gaming website for Tatum! Password protected with three games and an AI-generated greeting on every login.

## Games
- 💥 **Dodge or Die** – Dodge falling emoji enemies. Score tracked with a personal best.
- 🧠 **Big Brain Quiz** – 12-question Roblox & Minecraft trivia (8 random per game).
- 🧑‍🎤 **Character Builder** – Build and save custom emoji characters.

## Setup

### 1. Clone & push to GitHub
```bash
git init
git add .
git commit -m "Tatum's Zone 🎮"
git remote add origin https://github.com/YOUR_USERNAME/tatums-zone.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and import your GitHub repo
2. In **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your API key from [console.anthropic.com](https://console.anthropic.com)
3. Deploy!

### 3. Get your API key (free account)
1. Sign up at [console.anthropic.com](https://console.anthropic.com) with your other account
2. Go to **API Keys** → **Create Key**
3. Paste it into Vercel as described above

## Password
`tatumtatum`

## Project Structure
```
/
├── api/
│   └── greeting.js       ← Serverless function for AI greeting
├── public/
│   └── index.html        ← The whole site
└── vercel.json           ← Vercel config
```
