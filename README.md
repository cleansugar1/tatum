# 🎮 Tatum's Zone v2

Tatum's personal gaming hub! Password protected with 6 games, AI greeting, and leaderboards.

## 🎮 Games
1. 💥 **Dodge or Die** — dodge enemies, catch diamonds, leaderboard with names
2. 🧠 **Big Brain Quiz** — 300 questions on Roblox, Minecraft & brainrot, 10 random per game
3. 🏃 **Endless Runner** — tap to jump over brainrot enemies
4. 🔨 **Whack-a-Creeper** — tap brainrot creepers before they escape
5. ⛏️ **Mining Clicker** — tap to mine ores, upgrade pickaxes (progress saves!)
6. 🎯 **Target Shooter** — tap flying brainrot enemies before they escape

## 🔐 Password
`tatumtatum`

## 🚀 Deploy

### Push to GitHub
```bash
git init
git add .
git commit -m "Tatum's Zone v2 🎮"
git remote add origin https://github.com/YOUR_USERNAME/tatums-zone.git
git push -u origin main
```

### Vercel Environment Variable
In Vercel → Settings → Environment Variables:
- **Name:** `ANTHROPIC_API_KEY`
- **Value:** your key from console.anthropic.com

Then redeploy.

## 📁 Structure
```
/
├── api/greeting.js     ← AI greeting serverless function
├── public/index.html   ← Entire site (single file)
├── vercel.json         ← Vercel routing config
└── .gitignore
```
