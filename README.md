# CT Arena Clash

A complete single-player 2D browser fighting game. 12 CT Creator fighters. 11 tournament levels. One champion.

---

## Folder Structure

```
ct-arena-clash/
│
├── index.html
├── style.css
├── game.js
│
└── assets/
    ├── momoh.png
    ├── endy.png
    ├── thaniel.png
    ├── damianonyx.png
    ├── beaulah.png
    ├── rackz.png
    ├── magnus.png
    ├── whizii.png
    ├── favourr.png
    ├── chainphantom.png
    ├── dahheadboy.png
    └── enzyme.png
```

Place your character images in the `assets/` folder with exact filenames above.
If any image is missing, the game uses a styled letter placeholder — it won't crash.

---

## Run Locally

1. Place all files in one folder as shown above.
2. Open a terminal in that folder.
3. Run a local server (required because of image loading):

**Using Python:**
```bash
python3 -m http.server 8080
```
Then open: http://localhost:8080

**Using Node.js (npx):**
```bash
npx serve .
```

**Using VS Code:**
Install the "Live Server" extension, right-click `index.html` → Open with Live Server.

> ⚠️ Do NOT just double-click `index.html` directly — browsers block local image loading from `file://` URLs.

---

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. In your project folder:
```bash
vercel
```

3. Follow the prompts:
   - Set up and deploy: **Y**
   - Which scope: your account
   - Link to existing project: **N**
   - Project name: `ct-arena-clash`
   - Directory: `./` (current)
   - Override settings: **N**

4. Vercel will give you a live URL instantly.

**Or deploy via GitHub:**
- Push your folder to a GitHub repo
- Go to vercel.com → New Project → Import from GitHub
- Select your repo → Deploy

No build step needed. It's a static site.

---

## Controls

| Action | Keyboard | Mobile |
|--------|----------|--------|
| Move Left | A / ← | ◀ button |
| Move Right | D / → | ▶ button |
| Jump | W / ↑ | ▲ button |
| Punch | J | PUNCH button |
| Kick | K | KICK button |
| Special | L | SPECIAL button |
| Dodge | Shift | ◈ button |

---

## Game Rules

- Select 1 fighter from 12. The other 11 become your opponents.
- Opponents are ordered from easiest to hardest (by difficulty rating).
- Each match is **Best of 3 rounds** (60 seconds per round).
- Win 2 rounds → win the match → advance.
- Lose 2 rounds → Game Over.
- Clear all 11 levels → **CT Arena Champion**.

---

## Fighter Roster

| Fighter | Specialty | Style |
|---------|-----------|-------|
| Momoh | Power Punch | Heavy striker |
| Endy | Swift Feet | Speed + combos |
| Thaniel | Fire Breathing | Burn DOT |
| Damianonyx | Eye Lasers | Long-range precision |
| Beaulah | Ice Breathing | Freeze + slow |
| Rackz | Power Kick | Heavy knockback |
| Magnus | Tornado Strike | Area push |
| Whizii | Speed Burst | Super speed mode |
| Favourr | Healing Aura | Self-heal |
| Chainphantom | Shadow Chain | Pull + trap |
| Dahheadboy | Ground Slam | Area shockwave |
| Enzyme | Poison Touch | Poison DOT |
