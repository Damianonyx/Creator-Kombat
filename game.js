/* ═══════════════════════════════════════════════════════════════════
   CT ARENA CLASH — game.js
   Complete single-player 2D browser fighting game
   No frameworks. No backend. Pure HTML/CSS/JS.
═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   1. CHARACTER ROSTER DATA
───────────────────────────────────────────── */
const FIGHTERS = [
  {
    id: 'momoh',
    name: 'Momoh',
    image: 'assets/momoh.png',
    specialty: 'Power Punch',
    specialName: 'Titan Fist',
    specialType: 'power_punch',
    maxHealth: 140,
    attack: 22,
    speed: 3.5,
    defense: 14,
    specialCooldown: 5000,
    difficultyRating: 4,
    color: '#ff6b35',
    bio: 'Heavy striker, devastating close-range power.'
  },
  {
    id: 'endy',
    name: 'Endy',
    image: 'assets/endy.png',
    specialty: 'Swift Feet',
    specialName: 'Velocity Rush',
    specialType: 'swift_feet',
    maxHealth: 95,
    attack: 14,
    speed: 6.5,
    defense: 8,
    specialCooldown: 4000,
    difficultyRating: 6,
    color: '#00f5d4',
    bio: 'Lightning fast, rapid combos and dodges.'
  },
  {
    id: 'thaniel',
    name: 'Thaniel',
    image: 'assets/thaniel.png',
    specialty: 'Fire Breathing',
    specialName: 'Inferno Breath',
    specialType: 'fire_breath',
    maxHealth: 110,
    attack: 18,
    speed: 4.5,
    defense: 11,
    specialCooldown: 5500,
    difficultyRating: 5,
    color: '#ff4500',
    bio: 'Mid-range fire burns enemies over time.'
  },
  {
    id: 'damianonyx',
    name: 'Damianonyx',
    image: 'assets/damianonyx.png',
    specialty: 'Eye Lasers',
    specialName: 'Precision Beam',
    specialType: 'eye_laser',
    maxHealth: 105,
    attack: 20,
    speed: 5.0,
    defense: 10,
    specialCooldown: 4500,
    difficultyRating: 7,
    color: '#00c3ff',
    bio: 'Long-range precision laser, high damage.'
  },
  {
    id: 'beaulah',
    name: 'Beaulah',
    image: 'assets/beaulah.png',
    specialty: 'Ice Breathing',
    specialName: 'Glacial Blast',
    specialType: 'ice_breath',
    maxHealth: 108,
    attack: 15,
    speed: 4.8,
    defense: 13,
    specialCooldown: 5000,
    difficultyRating: 5,
    color: '#a0e8ff',
    bio: 'Freezes opponents, slowing their movement.'
  },
  {
    id: 'rackz',
    name: 'Rackz',
    image: 'assets/rackz.png',
    specialty: 'Power Kick',
    specialName: 'Shatter Kick',
    specialType: 'power_kick',
    maxHealth: 125,
    attack: 19,
    speed: 4.0,
    defense: 12,
    specialCooldown: 4800,
    difficultyRating: 5,
    color: '#ff3a3a',
    bio: 'Heavy kick with massive knockback force.'
  },
  {
    id: 'magnus',
    name: 'Magnus',
    image: 'assets/magnus.png',
    specialty: 'Tornado Strike',
    specialName: 'Cyclone Fury',
    specialType: 'tornado',
    maxHealth: 115,
    attack: 17,
    speed: 4.2,
    defense: 11,
    specialCooldown: 6000,
    difficultyRating: 6,
    color: '#9ddbff',
    bio: 'Wind area attack pushes enemies away.'
  },
  {
    id: 'whizii',
    name: 'Whizii',
    image: 'assets/whizii.png',
    specialty: 'Speed Burst',
    specialName: 'Overdrive',
    specialType: 'speed_burst',
    maxHealth: 92,
    attack: 15,
    speed: 7.0,
    defense: 7,
    specialCooldown: 5500,
    difficultyRating: 7,
    color: '#ffe033',
    bio: 'Temporary super speed and rapid attacks.'
  },
  {
    id: 'favourr',
    name: 'Favourr',
    image: 'assets/favourr.png',
    specialty: 'Healing Aura',
    specialName: 'Restoration Field',
    specialType: 'heal',
    maxHealth: 130,
    attack: 13,
    speed: 4.3,
    defense: 16,
    specialCooldown: 7000,
    difficultyRating: 5,
    color: '#39ff6e',
    bio: 'Defensive healer, recovers health mid-fight.'
  },
  {
    id: 'chainphantom',
    name: 'Chainphantom',
    image: 'assets/chainphantom.png',
    specialty: 'Shadow Chain',
    specialName: 'Soul Shackle',
    specialType: 'shadow_chain',
    maxHealth: 108,
    attack: 18,
    speed: 5.2,
    defense: 10,
    specialCooldown: 5000,
    difficultyRating: 8,
    color: '#b44aff',
    bio: 'Dark chains pull and trap opponents briefly.'
  },
  {
    id: 'dahheadboy',
    name: 'Dahheadboy',
    image: 'assets/dahheadboy.png',
    specialty: 'Ground Slam',
    specialName: 'Earth Splitter',
    specialType: 'ground_slam',
    maxHealth: 145,
    attack: 24,
    speed: 3.0,
    defense: 15,
    specialCooldown: 6500,
    difficultyRating: 9,
    color: '#ff8c00',
    bio: 'Massive ground shockwave, heavy area damage.'
  },
  {
    id: 'enzyme',
    name: 'Enzyme',
    image: 'assets/enzyme.png',
    specialty: 'Poison Touch',
    specialName: 'Toxic Nova',
    specialType: 'poison',
    maxHealth: 100,
    attack: 16,
    speed: 5.5,
    defense: 9,
    specialCooldown: 4500,
    difficultyRating: 10,
    color: '#7fff00',
    bio: 'Poison drains enemy health over time.'
  }
];

/* ─────────────────────────────────────────────
   2. GAME STATE
───────────────────────────────────────────── */
const STATE = {
  selectedFighter: null,
  currentLevel: 0,
  opponents: [],
  currentOpponent: null,
  currentRound: 1,
  playerRoundWins: 0,
  botRoundWins: 0,
  defeatedOpponents: [],
  tournamentStatus: 'idle', // idle | active | won | lost
};

/* ─────────────────────────────────────────────
   3. CANVAS + GAME LOOP VARIABLES
───────────────────────────────────────────── */
let canvas, ctx;
let animFrameId = null;
let lastTime = 0;
let roundTimer = 60;
let timerInterval = null;

// Fighter runtime objects
let player = null;
let bot    = null;

// Input state
const keys = {};

// Hit cooldowns (prevent damage spam)
let playerHitCooldown = 0;
let botHitCooldown    = 0;
const HIT_CD = 500; // ms

// Status effects
let playerStatus = { burn: 0, poison: 0, frozen: 0, slowUntil: 0 };
let botStatus    = { burn: 0, poison: 0, frozen: 0, slowUntil: 0 };

// DOM refs cache
const $ = id => document.getElementById(id);

/* ─────────────────────────────────────────────
   4. SCREEN NAVIGATION
───────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(id);
  if (el) el.classList.add('active');
}

/* ─────────────────────────────────────────────
   5. IMAGE HELPER
───────────────────────────────────────────── */
function makeImgEl(src, alt, cls) {
  const img = document.createElement('img');
  img.alt = alt;
  if (cls) img.className = cls;
  img.onerror = () => {
    const ph = document.createElement('div');
    ph.className = 'card-placeholder';
    ph.textContent = (alt || '?').charAt(0).toUpperCase();
    img.replaceWith(ph);
  };
  img.src = src;
  return img;
}

/* ─────────────────────────────────────────────
   6. MAIN MENU
───────────────────────────────────────────── */
function initMainMenu() {
  updateMenuStats();
  $('btn-start').addEventListener('click', () => showScreen('screen-charselect'));
  $('btn-howtoplay').addEventListener('click', () => showScreen('screen-howtoplay'));
  $('btn-htp-back').addEventListener('click', () => showScreen('screen-mainmenu'));
}

function updateMenuStats() {
  const best   = localStorage.getItem('bestLevelReached') || 0;
  const champs = localStorage.getItem('championWins') || 0;
  const last   = localStorage.getItem('lastSelectedFighter') || '—';
  $('menu-stats').innerHTML =
    `<span>BEST: LVL ${best}</span><span>WINS: ${champs}</span><span>LAST: ${last.toUpperCase()}</span>`;
}

/* ─────────────────────────────────────────────
   7. CHARACTER SELECT
───────────────────────────────────────────── */
function initCharSelect() {
  $('btn-cs-back').addEventListener('click', () => showScreen('screen-mainmenu'));
  $('btn-cs-start').addEventListener('click', startTournament);
  buildFighterGrid();
}

function buildFighterGrid() {
  const grid = $('fighter-grid');
  grid.innerHTML = '';
  FIGHTERS.forEach(f => {
    const card = buildFighterCard(f, true);
    card.addEventListener('click', () => selectFighter(f));
    grid.appendChild(card);
  });
}

function buildFighterCard(fighter, selectable = false) {
  const card = document.createElement('div');
  card.className = 'fighter-card';
  card.dataset.id = fighter.id;

  // Image
  const imgWrap = document.createElement('div');
  imgWrap.className = 'card-img-wrap';
  const img = makeImgEl(fighter.image, fighter.name);
  img.onerror = () => {
    imgWrap.innerHTML = `<div class="card-placeholder">${fighter.name.charAt(0)}</div>`;
  };
  img.src = fighter.image;
  imgWrap.appendChild(img);

  // Selected badge
  const badge = document.createElement('div');
  badge.className = 'selected-badge';
  badge.textContent = '✓ CHOSEN';

  const name = document.createElement('div');
  name.className = 'card-name';
  name.textContent = fighter.name;

  const spec = document.createElement('div');
  spec.className = 'card-specialty';
  spec.textContent = fighter.specialty;

  // Stat bars
  const stats = document.createElement('div');
  stats.className = 'card-stats';
  const maxVal = 150;
  [
    { label: 'HP',  val: fighter.maxHealth,  cls: 'stat-hp',  max: 150 },
    { label: 'ATK', val: fighter.attack * 5, cls: 'stat-atk', max: 150 },
    { label: 'SPD', val: fighter.speed * 14, cls: 'stat-spd', max: 150 },
    { label: 'DEF', val: fighter.defense * 7, cls: 'stat-def', max: 150 },
  ].forEach(s => {
    const row = document.createElement('div');
    row.className = `stat-row ${s.cls}`;
    row.innerHTML = `
      <span class="stat-label">${s.label}</span>
      <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${Math.min(100,(s.val/s.max)*100).toFixed(1)}%"></div></div>`;
    stats.appendChild(row);
  });

  card.appendChild(imgWrap);
  card.appendChild(badge);
  card.appendChild(name);
  card.appendChild(spec);
  card.appendChild(stats);
  return card;
}

function selectFighter(fighter) {
  STATE.selectedFighter = fighter;

  // Update card visuals
  document.querySelectorAll('.fighter-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.id === fighter.id);
  });

  // Update preview
  const prev = $('selected-preview');
  prev.innerHTML = `<span class="preview-label">SELECTED: <strong style="color:var(--neon-gold);font-family:'Orbitron',monospace">${fighter.name.toUpperCase()}</strong> — ${fighter.specialty}</span>`;

  $('btn-cs-start').disabled = false;
}

/* ─────────────────────────────────────────────
   8. TOURNAMENT SETUP
───────────────────────────────────────────── */
function startTournament() {
  if (!STATE.selectedFighter) return;

  // Build opponent ladder excluding selected fighter, sorted by difficulty
  STATE.opponents = FIGHTERS
    .filter(f => f.id !== STATE.selectedFighter.id)
    .sort((a, b) => a.difficultyRating - b.difficultyRating);

  STATE.currentLevel = 0;
  STATE.playerRoundWins = 0;
  STATE.botRoundWins = 0;
  STATE.defeatedOpponents = [];
  STATE.tournamentStatus = 'active';

  localStorage.setItem('lastSelectedFighter', STATE.selectedFighter.name);
  showLadder();
}

/* ─────────────────────────────────────────────
   9. TOURNAMENT LADDER SCREEN
───────────────────────────────────────────── */
function showLadder() {
  buildLadderScreen();
  showScreen('screen-ladder');
}

function buildLadderScreen() {
  // Player card
  const pc = $('ladder-player-card');
  pc.innerHTML = '';
  const imgWrap = document.createElement('div');
  imgWrap.style.cssText = 'width:80px;height:80px;border-radius:50%;overflow:hidden;border:2px solid var(--neon-gold);';
  const img = makeImgEl(STATE.selectedFighter.image, STATE.selectedFighter.name);
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
  imgWrap.appendChild(img);
  pc.appendChild(imgWrap);
  const pname = document.createElement('div');
  pname.className = 'card-name';
  pname.style.marginTop = '8px';
  pname.textContent = STATE.selectedFighter.name;
  const pspec = document.createElement('div');
  pspec.className = 'card-specialty';
  pspec.textContent = STATE.selectedFighter.specialty;
  pc.appendChild(pname);
  pc.appendChild(pspec);

  // Level indicator
  $('ladder-level-indicator').textContent = `— LEVEL ${STATE.currentLevel + 1} / 11`;

  // Opponent list
  const list = $('ladder-list');
  list.innerHTML = '';
  STATE.opponents.forEach((opp, idx) => {
    const item = document.createElement('div');
    item.className = 'ladder-item';
    if (idx === STATE.currentLevel) item.classList.add('current');
    if (idx < STATE.currentLevel) item.classList.add('defeated');

    const diff = '★'.repeat(Math.ceil(opp.difficultyRating / 2));

    item.innerHTML = `
      <div class="ladder-item-num">${idx + 1}</div>
      <div class="ladder-item-img" id="limg-${opp.id}"></div>
      <div class="ladder-item-info">
        <div class="ladder-item-name">${opp.name}</div>
        <div class="ladder-item-spec">${opp.specialty}</div>
      </div>
      <div class="ladder-item-diff">${diff}</div>
      ${idx < STATE.currentLevel ? '<div class="check-icon">✓</div>' : ''}
    `;
    list.appendChild(item);

    // Load image
    const imgCell = item.querySelector(`#limg-${opp.id}`);
    const li = makeImgEl(opp.image, opp.name);
    li.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;';
    li.onerror = () => {
      imgCell.innerHTML = `<div class="ladder-item-ph">${opp.name.charAt(0)}</div>`;
    };
    imgCell.appendChild(li);
  });

  $('btn-ladder-menu').onclick = () => { stopFight(); showScreen('screen-mainmenu'); };
  $('btn-ladder-fight').onclick = startFight;
}

/* ─────────────────────────────────────────────
   10. FIGHT SCREEN INIT
───────────────────────────────────────────── */
function startFight() {
  STATE.currentOpponent = STATE.opponents[STATE.currentLevel];
  STATE.currentRound = 1;
  STATE.playerRoundWins = 0;
  STATE.botRoundWins = 0;
  initRound();
  showScreen('screen-fight');
}

function initRound() {
  stopFight();

  canvas = $('fight-canvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();

  const pf = STATE.selectedFighter;
  const bf = STATE.currentOpponent;

  const floorY = canvas.height - 80;

  // Create player object
  player = createFighter(pf, 80, floorY, false);
  // Create bot object
  bot = createFighter(bf, canvas.width - 80 - 60, floorY, true);

  playerStatus = { burn: 0, poison: 0, frozen: 0, slowUntil: 0 };
  botStatus    = { burn: 0, poison: 0, frozen: 0, slowUntil: 0 };
  playerHitCooldown = 0;
  botHitCooldown    = 0;
  roundTimer = 60;

  updateHUD();
  updateRoundHUD();
  updateSpecialBar(0);

  // Timer
  let timerMs = 60000;
  let lastTick = performance.now();
  timerInterval = setInterval(() => {
    const now = performance.now();
    timerMs -= (now - lastTick);
    lastTick = now;
    roundTimer = Math.ceil(timerMs / 1000);
    const timerEl = $('fight-timer');
    timerEl.textContent = roundTimer;
    timerEl.classList.toggle('warning', roundTimer <= 10);
    if (roundTimer <= 0) {
      clearInterval(timerInterval);
      endRoundByTimer();
    }
  }, 200);

  lastTime = performance.now();
  animFrameId = requestAnimationFrame(gameLoop);
}

function createFighter(data, x, floorY, isBot) {
  return {
    data,
    x,
    y: floorY - 80,
    w: 60,
    h: 80,
    health: data.maxHealth,
    maxHealth: data.maxHealth,
    vy: 0,
    vx: 0,
    onGround: true,
    facing: isBot ? -1 : 1, // -1=left, 1=right
    isBot,
    // Actions
    attacking: false,
    attackTimer: 0,
    attackType: null, // 'punch'|'kick'|'special'
    attackHit: false,
    dodging: false,
    dodgeTimer: 0,
    invincible: false,
    specialCooldownRemaining: 0,
    speedBoostUntil: 0,
    speedBoostActive: false,
    // Image
    img: null,
    imgLoaded: false,
    // Bot AI
    aiState: 'approach',
    aiTimer: 0,
    aiDecisionInterval: isBot ? 400 + Math.random() * 600 : 0,
    // Visual
    hitFlash: 0,
  };
}

function loadFighterImage(fighter) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => { fighter.img = img; fighter.imgLoaded = true; resolve(); };
    img.onerror = () => { fighter.img = null; fighter.imgLoaded = false; resolve(); };
    img.src = fighter.data.image;
  });
}

/* ─────────────────────────────────────────────
   11. CANVAS & RESIZE
───────────────────────────────────────────── */
function resizeCanvas() {
  const wrap = $('arena-wrap');
  canvas.width  = wrap.clientWidth  || 800;
  canvas.height = wrap.clientHeight || 400;
}

window.addEventListener('resize', () => {
  if (canvas) {
    resizeCanvas();
    const floorY = canvas.height - 80;
    if (player) player.y = Math.min(player.y, floorY - player.h);
    if (bot)    bot.y    = Math.min(bot.y,    floorY - bot.h);
  }
});

/* ─────────────────────────────────────────────
   12. MAIN GAME LOOP
───────────────────────────────────────────── */
function gameLoop(timestamp) {
  const dt = Math.min(timestamp - lastTime, 50); // cap at 50ms
  lastTime = timestamp;

  update(dt);
  render();

  animFrameId = requestAnimationFrame(gameLoop);
}

function stopFight() {
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

/* ─────────────────────────────────────────────
   13. UPDATE
───────────────────────────────────────────── */
function update(dt) {
  if (!player || !bot) return;

  const gravity = 0.6;
  const floorY  = canvas.height - 80;

  updateFighter(player, dt, gravity, floorY);
  updateFighter(bot,    dt, gravity, floorY);

  updatePlayerInput(dt);
  updateBotAI(dt);

  updateHitCooldowns(dt);
  updateStatusEffects(dt);
  checkAttackCollisions();
  updateHUD();
  updateSpecialBar(player.specialCooldownRemaining / player.data.specialCooldown);

  // Clamp positions
  clampFighterX(player);
  clampFighterX(bot);

  // Update facing direction
  if (!player.attacking) {
    player.facing = (bot.x > player.x) ? 1 : -1;
  }
  if (!bot.attacking) {
    bot.facing = (player.x > bot.x) ? 1 : -1;
  }
}

function updateFighter(f, dt, gravity, floorY) {
  // Gravity
  f.vy += gravity;
  f.y  += f.vy;

  // Floor collision
  const groundLevel = floorY - f.h;
  if (f.y >= groundLevel) {
    f.y = groundLevel;
    f.vy = 0;
    f.onGround = true;
  }

  // Horizontal movement (applied via input/AI)
  f.x += f.vx;
  f.vx *= 0.8; // friction

  // Attack timers
  if (f.attacking) {
    f.attackTimer -= dt;
    if (f.attackTimer <= 0) {
      f.attacking = false;
      f.attackType = null;
      f.attackHit  = false;
    }
  }

  // Dodge timer
  if (f.dodging) {
    f.dodgeTimer -= dt;
    if (f.dodgeTimer <= 0) {
      f.dodging = false;
      f.invincible = false;
    }
  }

  // Special cooldown
  if (f.specialCooldownRemaining > 0) {
    f.specialCooldownRemaining -= dt;
    if (f.specialCooldownRemaining < 0) f.specialCooldownRemaining = 0;
  }

  // Speed boost
  if (f.speedBoostUntil > 0 && performance.now() > f.speedBoostUntil) {
    f.speedBoostUntil = 0;
    f.speedBoostActive = false;
  }

  // Hit flash
  if (f.hitFlash > 0) f.hitFlash -= dt;
}

function clampFighterX(f) {
  if (!canvas) return;
  if (f.x < 0) f.x = 0;
  if (f.x + f.w > canvas.width) f.x = canvas.width - f.w;
}

/* ─────────────────────────────────────────────
   14. PLAYER INPUT
───────────────────────────────────────────── */
function updatePlayerInput(dt) {
  if (!player || player.attacking && player.attackTimer > 200) return;

  const speed = getEffectiveSpeed(player, playerStatus);

  // Movement
  if (keys['a'] || keys['arrowleft']) {
    player.vx = -speed;
  } else if (keys['d'] || keys['arrowright']) {
    player.vx = speed;
  }

  // Jump
  if ((keys['w'] || keys['arrowup']) && player.onGround) {
    player.vy = -14;
    player.onGround = false;
    keys['w'] = false; keys['arrowup'] = false; // single trigger
  }

  // Dodge
  if (keys['shift'] && !player.dodging) {
    doDodge(player);
    keys['shift'] = false;
  }

  // Punch
  if (keys['j'] && !player.attacking) {
    doAttack(player, 'punch');
    keys['j'] = false;
  }

  // Kick
  if (keys['k'] && !player.attacking) {
    doAttack(player, 'kick');
    keys['k'] = false;
  }

  // Special
  if (keys['l'] && !player.attacking && player.specialCooldownRemaining <= 0) {
    doSpecial(player, bot, playerStatus, botStatus, false);
    keys['l'] = false;
  }
}

function getEffectiveSpeed(f, status) {
  let spd = f.data.speed;
  if (f.speedBoostActive) spd *= 1.7;
  if (status.slowUntil > 0 && performance.now() < status.slowUntil) spd *= 0.4;
  return spd;
}

/* ─────────────────────────────────────────────
   15. BOT AI
───────────────────────────────────────────── */
function updateBotAI(dt) {
  if (!bot || !player) return;

  bot.aiTimer -= dt;
  if (bot.aiTimer > 0 && bot.aiState !== 'attack') return;

  const dist = Math.abs(bot.x - player.x);
  const speed = getEffectiveSpeed(bot, botStatus);
  // Difficulty scaling — higher level = more aggressive
  const aggression = 0.4 + (STATE.currentLevel / 11) * 0.5;

  // Move toward player
  if (dist > 80) {
    bot.vx = (player.x > bot.x ? 1 : -1) * speed;
    bot.aiState = 'approach';
  } else {
    bot.vx = 0;
    bot.aiState = 'attack';
  }

  // Jump occasionally to avoid being stuck
  if (bot.onGround && Math.random() < 0.008 * aggression) {
    bot.vy = -12;
    bot.onGround = false;
  }

  // Attack when close
  if (dist < 100 && !bot.attacking) {
    const r = Math.random();
    if (r < 0.45 * aggression) {
      doAttack(bot, 'punch');
    } else if (r < 0.75 * aggression) {
      doAttack(bot, 'kick');
    } else if (r < 0.95 * aggression && bot.specialCooldownRemaining <= 0) {
      doSpecial(bot, player, botStatus, playerStatus, true);
    }
  }

  // Dodge when health is low
  if (bot.health < bot.maxHealth * 0.3 && !bot.dodging && Math.random() < 0.02) {
    doDodge(bot);
  }

  bot.aiTimer = bot.data.aiDecisionInterval * (1 - aggression * 0.3);
}

/* ─────────────────────────────────────────────
   16. ATTACK SYSTEM
───────────────────────────────────────────── */
function doAttack(fighter, type) {
  fighter.attacking   = true;
  fighter.attackType  = type;
  fighter.attackHit   = false;
  fighter.attackTimer = type === 'punch' ? 300 : 450;
}

function doDodge(fighter) {
  fighter.dodging   = true;
  fighter.invincible = true;
  fighter.dodgeTimer = 400;
  fighter.vx = fighter.facing * fighter.data.speed * 2.5;
}

function checkAttackCollisions() {
  if (!player || !bot) return;
  const now = performance.now();

  // Player hits bot
  if (player.attacking && !player.attackHit && playerHitCooldown <= 0) {
    const range = player.attackType === 'kick' ? 90 : 65;
    if (getDistance(player, bot) < range) {
      if (!bot.invincible) {
        const dmg = calcDamage(player, bot, player.attackType);
        bot.health = Math.max(0, bot.health - dmg);
        player.attackHit = true;
        bot.hitFlash = 150;
        playerHitCooldown = HIT_CD;
        spawnHitEffect(bot.x + bot.w / 2, bot.y + bot.h / 2, player.attackType, player.data.color);
        if (player.attackType === 'kick') {
          bot.vx = (bot.x > player.x ? 1 : -1) * 6; // knockback
        }
        if (bot.health <= 0) endRound('player');
      }
    }
  }

  // Bot hits player
  if (bot.attacking && !bot.attackHit && botHitCooldown <= 0) {
    const range = bot.attackType === 'kick' ? 90 : 65;
    if (getDistance(bot, player) < range) {
      if (!player.invincible) {
        const dmg = calcDamage(bot, player, bot.attackType);
        player.health = Math.max(0, player.health - dmg);
        bot.attackHit = true;
        player.hitFlash = 150;
        botHitCooldown = HIT_CD;
        spawnHitEffect(player.x + player.w / 2, player.y + player.h / 2, bot.attackType, bot.data.color);
        if (bot.attackType === 'kick') {
          player.vx = (player.x > bot.x ? 1 : -1) * 6;
        }
        if (player.health <= 0) endRound('bot');
      }
    }
  }
}

function calcDamage(attacker, defender, type) {
  const base = type === 'kick' ? attacker.data.attack * 1.4 : attacker.data.attack;
  const reduction = 1 - (defender.data.defense / (defender.data.defense + 30));
  return Math.round(base * reduction * (0.85 + Math.random() * 0.3));
}

function getDistance(a, b) {
  return Math.abs((a.x + a.w / 2) - (b.x + b.w / 2));
}

function updateHitCooldowns(dt) {
  if (playerHitCooldown > 0) playerHitCooldown -= dt;
  if (botHitCooldown    > 0) botHitCooldown    -= dt;
}

/* ─────────────────────────────────────────────
   17. SPECIAL ABILITIES
───────────────────────────────────────────── */
function doSpecial(caster, target, casterStatus, targetStatus, isBot) {
  if (caster.specialCooldownRemaining > 0) return;
  caster.specialCooldownRemaining = caster.data.specialCooldown;
  caster.attacking = true;
  caster.attackType = 'special';
  caster.attackTimer = 500;
  caster.attackHit = false;

  const cx = caster.x + caster.w / 2;
  const cy = caster.y + caster.h / 2;
  const tx = target.x + target.w / 2;
  const ty = target.y + target.h / 2;

  switch (caster.data.specialType) {
    case 'power_punch': {
      if (getDistance(caster, target) < 100) {
        const dmg = Math.round(caster.data.attack * 2.2 * (0.9 + Math.random() * 0.2));
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        target.vx = (target.x > caster.x ? 1 : -1) * 9;
        spawnEffect('impact_burst', cx, cy, '#ffe033');
        triggerShake();
      }
      break;
    }
    case 'swift_feet': {
      caster.speedBoostActive = true;
      caster.speedBoostUntil = performance.now() + 3000;
      spawnEffect('aura', cx, cy, '#00f5d4');
      break;
    }
    case 'fire_breath': {
      if (getDistance(caster, target) < 160) {
        const dmg = Math.round(caster.data.attack * 1.5);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        targetStatus.burn = performance.now() + 4000;
        spawnEffect('flame', cx, cy, '#ff4500');
      }
      break;
    }
    case 'eye_laser': {
      if (getDistance(caster, target) < 400) {
        const dmg = Math.round(caster.data.attack * 1.8);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        spawnBeam(cx, cy, tx, ty, caster.data.color);
      }
      break;
    }
    case 'ice_breath': {
      if (getDistance(caster, target) < 160) {
        const dmg = Math.round(caster.data.attack * 1.2);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        targetStatus.slowUntil = performance.now() + 3500;
        spawnEffect('ice', tx, ty, '#a0e8ff');
      }
      break;
    }
    case 'power_kick': {
      if (getDistance(caster, target) < 110) {
        const dmg = Math.round(caster.data.attack * 1.9);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        target.vx = (target.x > caster.x ? 1 : -1) * 12;
        spawnEffect('impact_burst', cx, cy, '#ff3a3a');
        triggerShake();
      }
      break;
    }
    case 'tornado': {
      if (getDistance(caster, target) < 130) {
        const dmg = Math.round(caster.data.attack * 1.4);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        target.vx = (target.x > caster.x ? 1 : -1) * 8;
        spawnEffect('tornado_spin', cx, cy, '#9ddbff');
      }
      break;
    }
    case 'speed_burst': {
      caster.speedBoostActive = true;
      caster.speedBoostUntil = performance.now() + 4000;
      spawnEffect('aura', cx, cy, '#ffe033');
      break;
    }
    case 'heal': {
      const heal = Math.round(caster.data.maxHealth * 0.15);
      caster.health = Math.min(caster.data.maxHealth, caster.health + heal);
      spawnEffect('heal', cx, cy, '#39ff6e');
      break;
    }
    case 'shadow_chain': {
      if (getDistance(caster, target) < 300) {
        const dmg = Math.round(caster.data.attack * 1.5);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        // Briefly pull target toward caster
        target.vx = (caster.x > target.x ? 1 : -1) * 7;
        targetStatus.slowUntil = performance.now() + 1500;
        spawnEffect('chain', tx, ty, '#b44aff');
      }
      break;
    }
    case 'ground_slam': {
      if (getDistance(caster, target) < 150) {
        const dmg = Math.round(caster.data.attack * 2.0);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        spawnEffect('shockwave', cx, canvas.height - 85, '#ff8c00');
        triggerShake();
        triggerShake();
      }
      break;
    }
    case 'poison': {
      if (getDistance(caster, target) < 140) {
        const dmg = Math.round(caster.data.attack * 1.2);
        applyDamage(target, dmg, casterStatus, targetStatus, isBot);
        targetStatus.poison = performance.now() + 5000;
        spawnEffect('poison', tx, ty, '#7fff00');
      }
      break;
    }
  }
}

function applyDamage(target, dmg, casterStatus, targetStatus, isBot) {
  if (target.invincible) return;
  target.health = Math.max(0, target.health - dmg);
  target.hitFlash = 150;
  if (isBot) botHitCooldown = HIT_CD;
  else playerHitCooldown = HIT_CD;
  if (target.health <= 0) endRound(isBot ? 'player' : 'bot');
}

/* ─────────────────────────────────────────────
   18. STATUS EFFECTS (burn, poison, freeze)
───────────────────────────────────────────── */
let lastBurnTick    = 0;
let lastPoisonTick  = 0;

function updateStatusEffects(dt) {
  const now = performance.now();

  // Burn on bot
  if (botStatus.burn > 0 && now < botStatus.burn) {
    if (now - lastBurnTick > 800) {
      bot.health = Math.max(0, bot.health - 4);
      lastBurnTick = now;
      spawnBurnParticle(bot.x + bot.w / 2, bot.y);
      if (bot.health <= 0) endRound('player');
    }
  } else { botStatus.burn = 0; }

  // Poison on bot
  if (botStatus.poison > 0 && now < botStatus.poison) {
    if (now - lastPoisonTick > 700) {
      bot.health = Math.max(0, bot.health - 3);
      lastPoisonTick = now;
      spawnEffect('poison_tick', bot.x + bot.w / 2, bot.y + bot.h / 2, '#7fff00');
      if (bot.health <= 0) endRound('player');
    }
  } else { botStatus.poison = 0; }

  // Burn on player
  if (playerStatus.burn > 0 && now < playerStatus.burn) {
    if (now - lastBurnTick > 800) {
      player.health = Math.max(0, player.health - 4);
      lastBurnTick = now;
      spawnBurnParticle(player.x + player.w / 2, player.y);
      if (player.health <= 0) endRound('bot');
    }
  } else { playerStatus.burn = 0; }

  // Poison on player
  if (playerStatus.poison > 0 && now < playerStatus.poison) {
    if (now - lastPoisonTick > 700) {
      player.health = Math.max(0, player.health - 3);
      lastPoisonTick = now;
      spawnEffect('poison_tick', player.x + player.w / 2, player.y + player.h / 2, '#7fff00');
      if (player.health <= 0) endRound('bot');
    }
  } else { playerStatus.poison = 0; }
}

/* ─────────────────────────────────────────────
   19. RENDER
───────────────────────────────────────────── */
function render() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Floor line
  const floorY = canvas.height - 80;
  ctx.strokeStyle = 'rgba(0,195,255,0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, floorY);
  ctx.lineTo(canvas.width, floorY);
  ctx.stroke();

  drawFighter(player);
  drawFighter(bot);
}

function drawFighter(f) {
  if (!f) return;
  const cx = f.x, cy = f.y, fw = f.w, fh = f.h;

  ctx.save();

  // Hit flash
  if (f.hitFlash > 0) {
    ctx.filter = 'brightness(4) saturate(0)';
  }

  // Dodge semi-transparent
  if (f.dodging) ctx.globalAlpha = 0.45;

  // Speed boost afterimage
  if (f.speedBoostActive) {
    ctx.globalAlpha = 0.25;
    ctx.drawImage(f.img || null, cx - 12, cy + 6, fw, fh);
    ctx.globalAlpha = f.dodging ? 0.45 : 1.0;
  }

  // Draw fighter
  if (f.imgLoaded && f.img) {
    ctx.drawImage(f.img, cx, cy, fw, fh);
  } else {
    // Fallback — draw colored rectangle with initial
    const grad = ctx.createLinearGradient(cx, cy, cx, cy + fh);
    grad.addColorStop(0, f.data.color + 'cc');
    grad.addColorStop(1, f.data.color + '44');
    ctx.fillStyle = grad;
    ctx.fillRect(cx, cy, fw, fh);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.floor(fh * 0.45)}px Orbitron, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(f.data.name.charAt(0), cx + fw / 2, cy + fh / 2);
  }

  ctx.restore();

  // Attack visual indicator on canvas
  if (f.attacking) {
    drawAttackIndicator(f);
  }

  // Status glow under fighter
  drawStatusGlow(f, f === player ? playerStatus : botStatus);
}

function drawAttackIndicator(f) {
  if (!ctx) return;
  const range = f.attackType === 'kick' ? 90 : 60;
  const dir   = f.facing;
  const cx    = f.x + f.w / 2;
  const cy    = f.y + f.h * 0.4;
  const tx    = cx + dir * range;

  ctx.save();
  const col = f.attackType === 'special' ? f.data.color : (f.attackType === 'kick' ? '#ff6b6b' : '#ffe033');
  ctx.strokeStyle = col + '88';
  ctx.lineWidth = f.attackType === 'kick' ? 3 : 2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(tx, cy);
  ctx.stroke();
  ctx.restore();
}

function drawStatusGlow(f, status) {
  if (!f || !ctx) return;
  let glowColor = null;
  const now = performance.now();
  if (status.burn   > 0 && now < status.burn)   glowColor = '#ff4500';
  if (status.poison > 0 && now < status.poison)  glowColor = '#7fff00';
  if (status.slowUntil > 0 && now < status.slowUntil) glowColor = '#a0e8ff';
  if (!glowColor) return;

  ctx.save();
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 18;
  ctx.strokeStyle = glowColor + '88';
  ctx.lineWidth = 2;
  ctx.strokeRect(f.x - 2, f.y - 2, f.w + 4, f.h + 4);
  ctx.restore();
}

/* Load images async so canvas has them */
async function loadBothImages() {
  await Promise.all([loadFighterImage(player), loadFighterImage(bot)]);
}

/* ─────────────────────────────────────────────
   20. HUD UPDATES
───────────────────────────────────────────── */
function updateHUD() {
  if (!player || !bot) return;
  const ph = (player.health / player.maxHealth) * 100;
  const bh = (bot.health    / bot.maxHealth)    * 100;

  const pfill = $('health-fill-player');
  const bfill = $('health-fill-bot');
  const ptxt  = $('health-text-player');
  const btxt  = $('health-text-bot');

  if (pfill) {
    pfill.style.width = ph + '%';
    pfill.style.background = hpColor(ph);
  }
  if (bfill) {
    bfill.style.width = bh + '%';
    bfill.style.background = `linear-gradient(270deg, ${hpColor(bh)}, ${hpColor(bh)}88)`;
  }
  if (ptxt) ptxt.textContent = Math.ceil(player.health);
  if (btxt) btxt.textContent = Math.ceil(bot.health);

  $('hud-player-name').textContent = player.data.name.toUpperCase();
  $('hud-bot-name').textContent    = bot.data.name.toUpperCase();
}

function hpColor(pct) {
  if (pct > 60) return 'linear-gradient(90deg, #00e676, #00ff44)';
  if (pct > 30) return 'linear-gradient(90deg, #ffeb3b, #ffc107)';
  return 'linear-gradient(90deg, #f44336, #ff1744)';
}

function updateRoundHUD() {
  $('round-indicator').textContent = `ROUND ${STATE.currentRound}`;
  $('match-score').textContent = `${STATE.playerRoundWins} — ${STATE.botRoundWins}`;
  updateRoundPips();
}

function updateRoundPips() {
  const pp = $('round-wins-player');
  const bp = $('round-wins-bot');
  pp.innerHTML = '';
  bp.innerHTML = '';
  for (let i = 0; i < 2; i++) {
    const pip = document.createElement('div');
    pip.className = 'round-win-pip' + (i < STATE.playerRoundWins ? ' filled' : '');
    pp.appendChild(pip);
  }
  for (let i = 0; i < 2; i++) {
    const pip = document.createElement('div');
    pip.className = 'round-win-pip' + (i < STATE.botRoundWins ? ' filled' : '');
    bp.appendChild(pip);
  }
}

function updateSpecialBar(fillRatio) {
  const remaining = player ? player.specialCooldownRemaining : 0;
  const total     = player ? player.data.specialCooldown : 1;
  const pct       = remaining > 0 ? ((1 - remaining / total) * 100) : 100;
  const fill = $('special-fill');
  const ready = $('special-ready');
  const label = $('special-label');
  if (fill)  fill.style.width = pct + '%';
  if (ready) {
    const isReady = remaining <= 0;
    ready.textContent = isReady ? 'READY' : Math.ceil(remaining / 1000) + 's';
    ready.classList.toggle('active', isReady);
  }
  if (label && player) label.textContent = player.data.specialName.toUpperCase();
}

/* ─────────────────────────────────────────────
   21. ROUND END
───────────────────────────────────────────── */
function endRoundByTimer() {
  if (!player || !bot) return;
  const winner = player.health >= bot.health ? 'player' : 'bot';
  endRound(winner);
}

function endRound(winner) {
  stopFight();

  if (winner === 'player') {
    STATE.playerRoundWins++;
  } else {
    STATE.botRoundWins++;
  }

  // Update best level
  const best = parseInt(localStorage.getItem('bestLevelReached') || '0');
  if (STATE.currentLevel > best) localStorage.setItem('bestLevelReached', STATE.currentLevel);

  // Check match result
  if (STATE.playerRoundWins >= 2) {
    showMatchVictory();
  } else if (STATE.botRoundWins >= 2) {
    showGameOver();
  } else {
    // Show round result, then start next round
    STATE.currentRound++;
    showRoundResult(winner);
  }
}

/* ─────────────────────────────────────────────
   22. ROUND RESULT SCREEN
───────────────────────────────────────────── */
function showRoundResult(winner) {
  const title = $('round-result-title');
  const score = $('result-score-display');
  const badge = $('result-badge');

  if (winner === 'player') {
    title.textContent = `${STATE.selectedFighter.name} Wins the Round!`;
    badge.style.color = 'var(--neon-cyan)';
    badge.style.borderColor = 'var(--neon-cyan)';
  } else {
    title.textContent = `${STATE.currentOpponent.name} Wins the Round!`;
    badge.style.color = 'var(--neon-red)';
    badge.style.borderColor = 'var(--neon-red)';
  }
  badge.textContent = `ROUND ${STATE.currentRound - 1} OVER`;
  score.textContent = `${STATE.playerRoundWins} — ${STATE.botRoundWins}`;

  const btn = $('btn-round-continue');
  btn.onclick = () => {
    showScreen('screen-fight');
    initRound();
    loadBothImages();
  };

  showScreen('screen-roundresult');
}

/* ─────────────────────────────────────────────
   23. MATCH VICTORY
───────────────────────────────────────────── */
function showMatchVictory() {
  STATE.defeatedOpponents.push(STATE.currentOpponent);
  STATE.currentLevel++;

  if (STATE.currentLevel >= STATE.opponents.length) {
    // All 11 defeated — Champion!
    setTimeout(() => showChampion(), 400);
    return;
  }

  const next = STATE.opponents[STATE.currentLevel];
  const title = $('matchvic-title');
  const details = $('matchvic-details');

  title.textContent = `Level ${STATE.currentLevel} Complete!`;
  details.innerHTML = `
    Defeated: <strong>${STATE.currentOpponent.name}</strong><br>
    Score: <strong>${STATE.playerRoundWins} — ${STATE.botRoundWins}</strong><br>
    Next: <strong>${next.name}</strong> — ${next.specialty}
  `;

  $('btn-matchvic-continue').onclick = () => {
    STATE.playerRoundWins = 0;
    STATE.botRoundWins    = 0;
    showLadder();
  };

  showScreen('screen-matchvictory');
}

/* ─────────────────────────────────────────────
   24. GAME OVER
───────────────────────────────────────────── */
function showGameOver() {
  $('gameover-title').textContent = `Defeated by ${STATE.currentOpponent.name}`;
  $('gameover-details').innerHTML = `
    Level reached: <strong>${STATE.currentLevel + 1}</strong><br>
    Your fighter: <strong>${STATE.selectedFighter.name}</strong><br>
    Score: <strong>${STATE.playerRoundWins} — ${STATE.botRoundWins}</strong>
  `;

  $('btn-go-menu').onclick = () => { stopFight(); showScreen('screen-mainmenu'); updateMenuStats(); };
  $('btn-go-retry').onclick = () => {
    stopFight();
    startTournament();
    showLadder();
  };

  showScreen('screen-gameover');
}

/* ─────────────────────────────────────────────
   25. CHAMPION
───────────────────────────────────────────── */
function showChampion() {
  const wins = parseInt(localStorage.getItem('championWins') || '0') + 1;
  localStorage.setItem('championWins', wins);

  // Fighter display
  const disp = $('champion-fighter-display');
  disp.innerHTML = '';
  const imgEl = document.createElement('img');
  imgEl.className = 'champion-fighter-img';
  imgEl.alt = STATE.selectedFighter.name;
  imgEl.onerror = () => {
    const ph = document.createElement('div');
    ph.className = 'champion-fighter-ph';
    ph.textContent = STATE.selectedFighter.name.charAt(0);
    imgEl.replaceWith(ph);
  };
  imgEl.src = STATE.selectedFighter.image;
  const nm = document.createElement('div');
  nm.className = 'champion-fighter-name';
  nm.textContent = STATE.selectedFighter.name;
  disp.appendChild(imgEl);
  disp.appendChild(nm);

  // Defeated list
  const dl = $('defeated-list');
  dl.innerHTML = '';
  STATE.defeatedOpponents.forEach(opp => {
    const chip = document.createElement('div');
    chip.className = 'defeated-chip';
    const imgCell = document.createElement('div');
    imgCell.className = 'defeated-chip-img';
    const ci = makeImgEl(opp.image, opp.name);
    ci.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;';
    ci.onerror = () => { imgCell.innerHTML = `<div class="defeated-chip-ph">${opp.name.charAt(0)}</div>`; };
    imgCell.appendChild(ci);
    const cn = document.createElement('div');
    cn.className = 'defeated-chip-name';
    cn.textContent = opp.name;
    chip.appendChild(imgCell);
    chip.appendChild(cn);
    dl.appendChild(chip);
  });

  $('btn-champ-menu').onclick = () => { showScreen('screen-mainmenu'); updateMenuStats(); };
  showScreen('screen-champion');
}

/* ─────────────────────────────────────────────
   26. FX EFFECTS
───────────────────────────────────────────── */
function spawnEffect(type, x, y, color) {
  const fx = $('fx-layer');
  if (!fx) return;

  const el = document.createElement('div');

  switch (type) {
    case 'impact_burst':
      el.className = 'fx-impact';
      el.style.cssText = `
        width:60px; height:60px;
        left:${x - 30}px; top:${y - 30}px;
        background: radial-gradient(circle, ${color}cc, transparent);
        box-shadow: 0 0 20px ${color};
      `;
      break;
    case 'flame':
      el.className = 'fx-flame';
      el.style.cssText = `
        width:120px; height:60px;
        left:${x - 20}px; top:${y - 30}px;
        background: linear-gradient(90deg, ${color}ee, #ffaa0066, transparent);
        border-radius: 50%;
      `;
      break;
    case 'ice':
      el.className = 'fx-ice';
      el.style.cssText = `
        width:80px; height:80px;
        left:${x - 40}px; top:${y - 40}px;
        background: radial-gradient(circle, ${color}cc, rgba(0,195,255,0.3), transparent);
        border-radius: 50%;
      `;
      break;
    case 'shockwave':
      el.className = 'fx-shockwave';
      el.style.cssText = `
        width:80px; height:80px;
        left:${x - 40}px; top:${y - 40}px;
        border-color: ${color};
      `;
      break;
    case 'poison':
    case 'poison_tick':
      el.className = 'fx-poison';
      el.style.cssText = `
        width:50px; height:50px;
        left:${x - 25}px; top:${y - 25}px;
      `;
      break;
    case 'heal':
      el.className = 'fx-heal';
      el.style.cssText = `
        width:80px; height:80px;
        left:${x - 40}px; top:${y - 40}px;
      `;
      break;
    case 'aura':
      el.className = 'fx-heal'; // reuse animation
      el.style.cssText = `
        width:90px; height:90px;
        left:${x - 45}px; top:${y - 45}px;
        background: radial-gradient(circle, ${color}88, transparent);
      `;
      break;
    case 'chain':
      el.className = 'fx-impact';
      el.style.cssText = `
        width:70px; height:70px;
        left:${x - 35}px; top:${y - 35}px;
        background: radial-gradient(circle, ${color}cc, transparent);
        box-shadow: 0 0 24px ${color};
      `;
      break;
    case 'tornado_spin':
      el.className = 'fx-ice';
      el.style.cssText = `
        width:100px; height:100px;
        left:${x - 50}px; top:${y - 50}px;
        background: conic-gradient(${color}66, transparent, ${color}66);
        border-radius: 50%;
        animation: fx-tornado 0.5s linear forwards;
      `;
      break;
    default:
      el.className = 'fx-impact';
      el.style.cssText = `
        width:50px; height:50px;
        left:${x - 25}px; top:${y - 25}px;
        background: radial-gradient(circle, ${color}cc, transparent);
      `;
  }

  fx.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

function spawnBeam(x1, y1, x2, y2, color) {
  const fx = $('fx-layer');
  if (!fx) return;
  const el = document.createElement('div');
  el.className = 'fx-beam';
  const len = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  el.style.cssText = `
    width:${len}px; height:4px;
    left:${x1}px; top:${y1}px;
    transform: rotate(${angle}deg);
    transform-origin: 0 50%;
    background: linear-gradient(90deg, ${color}, #fff, ${color}44);
    box-shadow: 0 0 12px ${color}, 0 0 24px ${color}88;
    animation: fx-beam-anim 0.35s ease-out forwards;
  `;
  fx.appendChild(el);
  setTimeout(() => el.remove(), 400);
}

function spawnHitEffect(x, y, type, color) {
  if (type === 'special') return; // handled by special functions
  spawnEffect('impact_burst', x, y, type === 'kick' ? color : '#ffe033');
}

function spawnBurnParticle(x, y) {
  const fx = $('fx-layer');
  if (!fx) return;
  for (let i = 0; i < 3; i++) {
    const p = document.createElement('div');
    p.className = 'burn-particle';
    p.style.cssText = `left:${x - 3 + (Math.random() - 0.5) * 20}px; top:${y}px;`;
    fx.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

function triggerShake() {
  const wrap = $('arena-wrap');
  if (!wrap) return;
  wrap.classList.remove('screen-shake');
  void wrap.offsetWidth;
  wrap.classList.add('screen-shake');
  setTimeout(() => wrap.classList.remove('screen-shake'), 300);
}

/* ─────────────────────────────────────────────
   27. KEYBOARD INPUT
───────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  // Prevent arrow key scrolling in-game
  if (['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase())) {
    if ($('screen-fight').classList.contains('active')) e.preventDefault();
  }
});
document.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
});

/* ─────────────────────────────────────────────
   28. MOBILE CONTROLS
───────────────────────────────────────────── */
function setupMobileControls() {
  function hold(id, key) {
    const btn = $(id);
    if (!btn) return;
    btn.addEventListener('touchstart', e => { e.preventDefault(); keys[key] = true; }, { passive: false });
    btn.addEventListener('touchend',   e => { e.preventDefault(); keys[key] = false; }, { passive: false });
    btn.addEventListener('mousedown',  () => keys[key] = true);
    btn.addEventListener('mouseup',    () => keys[key] = false);
  }
  function tap(id, key) {
    const btn = $(id);
    if (!btn) return;
    btn.addEventListener('touchstart', e => { e.preventDefault(); keys[key] = true; setTimeout(() => keys[key] = false, 80); }, { passive: false });
    btn.addEventListener('click', () => { keys[key] = true; setTimeout(() => keys[key] = false, 80); });
  }

  hold('mc-left',  'a');
  hold('mc-right', 'd');
  tap('mc-jump',   'w');
  tap('mc-punch',  'j');
  tap('mc-kick',   'k');
  tap('mc-special','l');
  tap('mc-dodge',  'shift');
}

/* ─────────────────────────────────────────────
   29. CHARACTER SELECT SCREEN (charselect)
───────────────────────────────────────────── */
function showCharSelect() {
  STATE.selectedFighter = null;
  $('btn-cs-start').disabled = true;
  $('selected-preview').innerHTML = '<span class="preview-label">No fighter selected</span>';
  buildFighterGrid();
  showScreen('screen-charselect');
}

/* ─────────────────────────────────────────────
   30. INIT
───────────────────────────────────────────── */
async function init() {
  // Wire up screens
  initMainMenu();
  initCharSelect();

  // Character select event
  $('btn-start').onclick     = () => showCharSelect();
  $('btn-cs-back').onclick   = () => showScreen('screen-mainmenu');
  $('btn-cs-start').onclick  = startTournament;

  setupMobileControls();
  showScreen('screen-mainmenu');
}

/* After fight starts, load images */
const origStartFight = startFight;
window.startFight = async function() {
  origStartFight();
  await loadBothImages();
};
// Override with the async version
$('btn-ladder-fight') && ($('btn-ladder-fight').onclick = window.startFight);

// Kick off
document.addEventListener('DOMContentLoaded', init);

/* ─────────────────────────────────────────────
   31. ADDITIONAL: RE-WIRE btn-ladder-fight after buildLadderScreen
   (buildLadderScreen calls onclick directly, so we patch after)
───────────────────────────────────────────── */
const _buildLadderScreen = buildLadderScreen;
function buildLadderScreen() {
  _buildLadderScreen();
  // Re-assign with async image loading
  $('btn-ladder-fight').onclick = async () => {
    STATE.currentOpponent = STATE.opponents[STATE.currentLevel];
    STATE.currentRound = 1;
    STATE.playerRoundWins = 0;
    STATE.botRoundWins = 0;

    // Show fight screen first
    showScreen('screen-fight');
    // Init round (creates fighters)
    initRound();
    // Load images async
    await loadBothImages();
  };
}
