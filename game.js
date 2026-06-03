"use strict";

/* ============================================================
   CT ARENA CLASH
   Frontend-only tournament fighting game MVP.
   No backend. No frameworks. No multiplayer.
============================================================ */

/* -----------------------------
   Fighter roster
----------------------------- */

const fighters = [
  {
    id: "momoh",
    name: "Momoh",
    image: "assets/momoh.png",
    maxHealth: 112,
    attack: 92,
    speed: 56,
    defense: 82,
    specialName: "Power Punch",
    specialType: "powerPunch",
    specialCooldown: 5200,
    difficultyRating: 8,
    style: "Heavy striker with strong close-range punches."
  },
  {
    id: "endy",
    name: "Endy",
    image: "assets/endy.png",
    maxHealth: 88,
    attack: 68,
    speed: 104,
    defense: 48,
    specialName: "Swift Feet",
    specialType: "swiftFeet",
    specialCooldown: 4300,
    difficultyRating: 3,
    style: "Fast movement, quick dodges, rapid combos."
  },
  {
    id: "thaniel",
    name: "Thaniel",
    image: "assets/thaniel.png",
    maxHealth: 94,
    attack: 76,
    speed: 66,
    defense: 58,
    specialName: "Fire Breathing",
    specialType: "fireBreath",
    specialCooldown: 5600,
    difficultyRating: 6,
    style: "Mid-range fire attack that burns over time."
  },
  {
    id: "damianonyx",
    name: "Damianonyx",
    image: "assets/damianonyx.png",
    maxHealth: 96,
    attack: 82,
    speed: 70,
    defense: 62,
    specialName: "Eye Lasers",
    specialType: "eyeLasers",
    specialCooldown: 6000,
    difficultyRating: 7,
    style: "Long-range precision beam attack with high damage."
  },
  {
    id: "beaulah",
    name: "Beaulah",
    image: "assets/beaulah.png",
    maxHealth: 96,
    attack: 66,
    speed: 60,
    defense: 72,
    specialName: "Ice Breathing",
    specialType: "iceBreath",
    specialCooldown: 5700,
    difficultyRating: 5,
    style: "Slows or freezes the enemy briefly."
  },
  {
    id: "rackz",
    name: "Rackz",
    image: "assets/rackz.png",
    maxHealth: 106,
    attack: 86,
    speed: 62,
    defense: 76,
    specialName: "Power Kick",
    specialType: "powerKick",
    specialCooldown: 5000,
    difficultyRating: 4,
    style: "Heavy kick with knockback."
  },
  {
    id: "magnus",
    name: "Magnus",
    image: "assets/magnus.png",
    maxHealth: 118,
    attack: 82,
    speed: 50,
    defense: 92,
    specialName: "Tornado Strike",
    specialType: "tornadoStrike",
    specialCooldown: 6800,
    difficultyRating: 10,
    style: "Area attack that pushes enemies away."
  },
  {
    id: "whizii",
    name: "Whizii",
    image: "assets/whizii.png",
    maxHealth: 82,
    attack: 62,
    speed: 112,
    defense: 42,
    specialName: "Speed Burst",
    specialType: "speedBurst",
    specialCooldown: 4400,
    difficultyRating: 2,
    style: "Temporary super speed and faster attacks."
  },
  {
    id: "favourr",
    name: "Favourr",
    image: "assets/favourr.png",
    maxHealth: 102,
    attack: 56,
    speed: 64,
    defense: 66,
    specialName: "Healing Aura",
    specialType: "healingAura",
    specialCooldown: 7800,
    difficultyRating: 1,
    style: "Defensive fighter who can recover small health."
  },
  {
    id: "chainphantom",
    name: "Chainphantom",
    image: "assets/chainphantom.png",
    maxHealth: 92,
    attack: 72,
    speed: 88,
    defense: 58,
    specialName: "Shadow Chain",
    specialType: "shadowChain",
    specialCooldown: 6200,
    difficultyRating: 9,
    style: "Pulls or traps enemies briefly."
  },
  {
    id: "dahheadboy",
    name: "Dahheadboy",
    image: "assets/dahheadboy.png",
    maxHealth: 124,
    attack: 96,
    speed: 46,
    defense: 86,
    specialName: "Ground Slam",
    specialType: "groundSlam",
    specialCooldown: 7000,
    difficultyRating: 11,
    style: "Heavy area damage attack."
  },
  {
    id: "enzyme",
    name: "Enzyme",
    image: "assets/enzyme.png",
    maxHealth: 92,
    attack: 64,
    speed: 68,
    defense: 62,
    specialName: "Poison Touch",
    specialType: "poisonTouch",
    specialCooldown: 5600,
    difficultyRating: 12,
    style: "Damage-over-time attack that drains enemy health."
  }
];

/* -----------------------------
   DOM references
----------------------------- */

const screens = {
  menu: document.getElementById("menuScreen"),
  how: document.getElementById("howScreen"),
  select: document.getElementById("selectScreen"),
  ladder: document.getElementById("ladderScreen"),
  fight: document.getElementById("fightScreen"),
  roundResult: document.getElementById("roundResultScreen"),
  matchVictory: document.getElementById("matchVictoryScreen"),
  gameOver: document.getElementById("gameOverScreen"),
  champion: document.getElementById("championScreen")
};

const fighterGrid = document.getElementById("fighterGrid");
const selectedPanel = document.getElementById("selectedPanel");
const selectedName = document.getElementById("selectedName");
const selectedSpecial = document.getElementById("selectedSpecial");

const ladderList = document.getElementById("ladderList");
const ladderSubtext = document.getElementById("ladderSubtext");
const playerSummary = document.getElementById("playerSummary");
const currentLevelBadge = document.getElementById("currentLevelBadge");

const arena = document.getElementById("arena");
const effectsLayer = document.getElementById("effectsLayer");
const playerSprite = document.getElementById("playerSprite");
const botSprite = document.getElementById("botSprite");

const playerNameHud = document.getElementById("playerNameHud");
const botNameHud = document.getElementById("botNameHud");
const playerHealthBar = document.getElementById("playerHealthBar");
const botHealthBar = document.getElementById("botHealthBar");
const playerSpecialHud = document.getElementById("playerSpecialHud");
const botSpecialHud = document.getElementById("botSpecialHud");
const playerRoundWinsHud = document.getElementById("playerRoundWinsHud");
const botRoundWinsHud = document.getElementById("botRoundWinsHud");
const timerHud = document.getElementById("timerHud");
const roundHud = document.getElementById("roundHud");
const levelHud = document.getElementById("levelHud");
const matchScoreHud = document.getElementById("matchScoreHud");
const specialCooldownBar = document.getElementById("specialCooldownBar");

const bestLevelText = document.getElementById("bestLevelText");
const championWinsText = document.getElementById("championWinsText");

const roundResultTitle = document.getElementById("roundResultTitle");
const roundResultText = document.getElementById("roundResultText");
const roundPlayerScore = document.getElementById("roundPlayerScore");
const roundBotScore = document.getElementById("roundBotScore");

const matchVictoryTitle = document.getElementById("matchVictoryTitle");
const matchVictoryText = document.getElementById("matchVictoryText");
const gameOverText = document.getElementById("gameOverText");
const championText = document.getElementById("championText");
const defeatedList = document.getElementById("defeatedList");

/* -----------------------------
   Game state
----------------------------- */

const state = {
  selectedFighter: null,
  opponents: [],
  currentLevel: 0,
  currentOpponent: null,
  defeatedOpponents: [],

  currentRound: 1,
  playerRoundWins: 0,
  botRoundWins: 0,
  afterRoundTarget: "nextRound",

  player: null,
  bot: null,

  roundActive: false,
  roundTimer: 60,
  lastFrameTime: 0,
  animationId: null,

  keys: Object.create(null),
  arenaWidth: 900,
  arenaHeight: 460,
  floorY: 350
};

const SAVE_KEYS = {
  bestLevel: "ctArenaBestLevelReached",
  lastFighter: "ctArenaLastSelectedFighter",
  championWins: "ctArenaChampionWins"
};

/* -----------------------------
   Initialization
----------------------------- */

document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
  renderSaveStats();
  renderFighterSelect();
  bindButtons();
  bindKeyboard();
  bindMobileControls();

  const lastFighterId = localStorage.getItem(SAVE_KEYS.lastFighter);
  const remembered = fighters.find(f => f.id === lastFighterId);

  if (remembered) {
    selectFighter(remembered.id);
  }
}

function bindButtons() {
  document.getElementById("startBtn").addEventListener("click", () => showScreen("select"));
  document.getElementById("howBtn").addEventListener("click", () => showScreen("how"));
  document.getElementById("backFromHowBtn").addEventListener("click", () => showScreen("menu"));
  document.getElementById("backToMenuBtn").addEventListener("click", () => showScreen("menu"));
  document.getElementById("ladderMenuBtn").addEventListener("click", () => {
    stopLoop();
    showScreen("menu");
  });

  document.getElementById("startTournamentBtn").addEventListener("click", startTournament);
  document.getElementById("beginMatchBtn").addEventListener("click", beginMatch);

  document.getElementById("continueRoundBtn").addEventListener("click", continueAfterRound);
  document.getElementById("continueToLadderBtn").addEventListener("click", () => {
    renderLadder();
    showScreen("ladder");
  });

  document.getElementById("retryBtn").addEventListener("click", retryTournament);
  document.getElementById("gameOverMenuBtn").addEventListener("click", () => showScreen("menu"));
  document.getElementById("championMenuBtn").addEventListener("click", () => {
    resetTournamentSoft();
    renderSaveStats();
    showScreen("menu");
  });
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function renderSaveStats() {
  bestLevelText.textContent = localStorage.getItem(SAVE_KEYS.bestLevel) || "0";
  championWinsText.textContent = localStorage.getItem(SAVE_KEYS.championWins) || "0";
}

/* -----------------------------
   Character select
----------------------------- */

function renderFighterSelect() {
  fighterGrid.innerHTML = "";

  fighters.forEach(fighter => {
    const card = document.createElement("button");
    card.className = "fighter-card";
    card.type = "button";
    card.dataset.fighterId = fighter.id;

    card.innerHTML = `
      <div class="fighter-portrait">
        <img src="${fighter.image}" alt="${fighter.name}" />
        <div class="fallback-name">${fighter.name}</div>
      </div>

      <div>
        <div class="fighter-name">${fighter.name}</div>
        <div class="special-label">${fighter.specialName}</div>
        <p class="fighter-style">${fighter.style}</p>
      </div>

      <div class="stat-lines">
        ${statLine("HP", fighter.maxHealth, 130)}
        ${statLine("ATK", fighter.attack, 120)}
        ${statLine("SPD", fighter.speed, 120)}
        ${statLine("DEF", fighter.defense, 120)}
      </div>
    `;

    const img = card.querySelector("img");
    img.onerror = () => card.classList.add("img-error");

    card.addEventListener("click", () => selectFighter(fighter.id));
    fighterGrid.appendChild(card);
  });
}

function statLine(label, value, max) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return `
    <div class="stat-line">
      <span>${label}</span>
      <div class="stat-bar">
        <div class="stat-fill" style="width:${pct}%"></div>
      </div>
    </div>
  `;
}

function selectFighter(fighterId) {
  const fighter = fighters.find(f => f.id === fighterId);

  if (!fighter) return;

  state.selectedFighter = fighter;
  localStorage.setItem(SAVE_KEYS.lastFighter, fighter.id);

  document.querySelectorAll(".fighter-card").forEach(card => {
    card.classList.toggle("selected", card.dataset.fighterId === fighterId);
  });

  selectedPanel.classList.remove("hidden");
  selectedName.textContent = fighter.name;
  selectedSpecial.textContent = `${fighter.specialName} — ${fighter.style}`;
}

/* -----------------------------
   Tournament ladder
----------------------------- */

function startTournament() {
  if (!state.selectedFighter) return;

  state.currentLevel = 0;
  state.defeatedOpponents = [];
  state.playerRoundWins = 0;
  state.botRoundWins = 0;
  state.currentRound = 1;

  state.opponents = fighters
    .filter(f => f.id !== state.selectedFighter.id)
    .sort((a, b) => a.difficultyRating - b.difficultyRating);

  renderLadder();
  showScreen("ladder");
}

function renderLadder() {
  if (!state.selectedFighter) return;

  ladderSubtext.textContent = `${state.selectedFighter.name} will fight ${state.opponents.length} opponents from easiest to hardest.`;
  currentLevelBadge.textContent = `Level ${Math.min(state.currentLevel + 1, 11)} / 11`;

  renderPlayerSummary();
  ladderList.innerHTML = "";

  state.opponents.forEach((opponent, index) => {
    const item = document.createElement("div");
    item.className = "ladder-item";

    if (index < state.currentLevel) item.classList.add("done");
    if (index === state.currentLevel) item.classList.add("current");

    const status = index < state.currentLevel
      ? "Defeated"
      : index === state.currentLevel
        ? "Next Fight"
        : "Locked";

    const statusClass = index < state.currentLevel
      ? "done"
      : index === state.currentLevel
        ? "current"
        : "";

    item.innerHTML = `
      <div class="ladder-avatar">
        <img src="${opponent.image}" alt="${opponent.name}" />
        <span>${opponent.name}</span>
      </div>

      <div class="ladder-meta">
        <strong>Level ${index + 1}: ${opponent.name}</strong>
        <span>${opponent.specialName}</span>
      </div>

      <span class="status-tag ${statusClass}">${status}</span>
    `;

    const img = item.querySelector("img");
    img.onerror = () => item.classList.add("img-error");

    ladderList.appendChild(item);
  });

  document.getElementById("beginMatchBtn").disabled = state.currentLevel >= state.opponents.length;
}

function renderPlayerSummary() {
  const f = state.selectedFighter;

  playerSummary.innerHTML = `
    <img src="${f.image}" alt="${f.name}" />
    <div>
      <h3>${f.name}</h3>
      <p class="special-label">${f.specialName}</p>
      <p class="fighter-style">${f.style}</p>
    </div>
    <div class="stat-lines">
      ${statLine("HP", f.maxHealth, 130)}
      ${statLine("ATK", f.attack, 120)}
      ${statLine("SPD", f.speed, 120)}
      ${statLine("DEF", f.defense, 120)}
    </div>
  `;

  const img = playerSummary.querySelector("img");
  img.onerror = () => {
    img.style.display = "none";
  };
}

function beginMatch() {
  if (state.currentLevel >= state.opponents.length) {
    showChampionScreen();
    return;
  }

  state.currentOpponent = state.opponents[state.currentLevel];
  state.currentRound = 1;
  state.playerRoundWins = 0;
  state.botRoundWins = 0;

  beginRound();
}

function retryTournament() {
  if (!state.selectedFighter) {
    showScreen("select");
    return;
  }

  startTournament();
}

function resetTournamentSoft() {
  state.currentLevel = 0;
  state.currentOpponent = null;
  state.defeatedOpponents = [];
  state.opponents = [];
}

/* -----------------------------
   Combatant creation
----------------------------- */

function createCombatant(fighter, side, isBot = false) {
  const levelModifier = isBot ? 1 + state.currentLevel * 0.035 : 1;

  return {
    fighter,
    isBot,
    side,

    width: window.innerWidth < 560 ? 96 : 118,
    height: window.innerWidth < 560 ? 134 : 154,

    x: side === "left" ? 90 : state.arenaWidth - 210,
    z: 0,
    vx: 0,
    vz: 0,

    maxHealth: Math.round(fighter.maxHealth * levelModifier),
    health: Math.round(fighter.maxHealth * levelModifier),

    attack: fighter.attack * levelModifier,
    defense: fighter.defense * levelModifier,
    baseSpeed: fighter.speed,

    facing: side === "left" ? 1 : -1,

    grounded: true,

    lastPunch: 0,
    lastKick: 0,
    lastSpecial: -99999,
    lastDodge: 0,
    lastAiThink: 0,

    hitInvulnerableUntil: 0,
    stunnedUntil: 0,
    slowUntil: 0,
    trappedUntil: 0,
    dodgeUntil: 0,
    boostUntil: 0,

    burnUntil: 0,
    nextBurnAt: 0,
    poisonUntil: 0,
    nextPoisonAt: 0
  };
}

/* -----------------------------
   Round lifecycle
----------------------------- */

function beginRound() {
  measureArena();

  state.player = createCombatant(state.selectedFighter, "left", false);
  state.bot = createCombatant(state.currentOpponent, "right", true);

  state.roundTimer = 60;
  state.roundActive = true;
  state.afterRoundTarget = "nextRound";

  effectsLayer.innerHTML = "";

  buildSprite(playerSprite, state.selectedFighter);
  buildSprite(botSprite, state.currentOpponent);

  updateHud();

  showScreen("fight");

  stopLoop();
  state.lastFrameTime = performance.now();
  state.animationId = requestAnimationFrame(gameLoop);
}

function measureArena() {
  const rect = arena.getBoundingClientRect();
  state.arenaWidth = Math.max(320, rect.width);
  state.arenaHeight = Math.max(360, rect.height);
  state.floorY = state.arenaHeight - 82;
}

function buildSprite(spriteEl, fighter) {
  spriteEl.classList.remove("img-error", "hit", "dodging", "boosted", "frozen", "poisoned");
  spriteEl.innerHTML = "";

  const img = document.createElement("img");
  img.src = fighter.image;
  img.alt = fighter.name;
  img.onerror = () => spriteEl.classList.add("img-error");

  const fallback = document.createElement("div");
  fallback.className = "sprite-fallback";
  fallback.textContent = fighter.name;

  spriteEl.appendChild(img);
  spriteEl.appendChild(fallback);
}

function stopLoop() {
  if (state.animationId) {
    cancelAnimationFrame(state.animationId);
    state.animationId = null;
  }
}

/* -----------------------------
   Main game loop
----------------------------- */

function gameLoop(now) {
  if (!state.roundActive) return;

  const dt = Math.min(0.033, (now - state.lastFrameTime) / 1000);
  state.lastFrameTime = now;

  state.roundTimer -= dt;

  updatePlayer(dt, now);
  updateBot(dt, now);
  updatePhysics(state.player, dt);
  updatePhysics(state.bot, dt);
  updateStatusEffects(state.player, now);
  updateStatusEffects(state.bot, now);
  faceEachOther();

  renderCombatants(now);
  updateHud();

  if (state.roundTimer <= 0) {
    const winner = state.player.health >= state.bot.health ? "player" : "bot";
    endRound(winner, "Timer ended. Higher health wins.");
    return;
  }

  if (state.player.health <= 0) {
    endRound("bot", `${state.currentOpponent.name} knocked out ${state.selectedFighter.name}.`);
    return;
  }

  if (state.bot.health <= 0) {
    endRound("player", `${state.selectedFighter.name} knocked out ${state.currentOpponent.name}.`);
    return;
  }

  state.animationId = requestAnimationFrame(gameLoop);
}

/* -----------------------------
   Player controls
----------------------------- */

function bindKeyboard() {
  window.addEventListener("keydown", event => {
    state.keys[event.key.toLowerCase()] = true;

    if (!state.roundActive) return;
    if (event.repeat) return;

    const key = event.key.toLowerCase();

    if (key === "w" || event.key === "ArrowUp") jump(state.player);
    if (key === "j") punch(state.player, state.bot);
    if (key === "k") kick(state.player, state.bot);
    if (key === "l") useSpecial(state.player, state.bot);
    if (key === "shift") dodge(state.player);
  });

  window.addEventListener("keyup", event => {
    state.keys[event.key.toLowerCase()] = false;
  });
}

function bindMobileControls() {
  document.querySelectorAll(".mobile-controls button").forEach(button => {
    const hold = button.dataset.hold;
    const action = button.dataset.action;

    if (hold) {
      button.addEventListener("pointerdown", event => {
        event.preventDefault();
        state.keys[hold === "left" ? "a" : "d"] = true;
      });

      button.addEventListener("pointerup", () => {
        state.keys[hold === "left" ? "a" : "d"] = false;
      });

      button.addEventListener("pointerleave", () => {
        state.keys[hold === "left" ? "a" : "d"] = false;
      });
    }

    if (action) {
      button.addEventListener("pointerdown", event => {
        event.preventDefault();
        if (!state.roundActive) return;

        if (action === "jump") jump(state.player);
        if (action === "punch") punch(state.player, state.bot);
        if (action === "kick") kick(state.player, state.bot);
        if (action === "special") useSpecial(state.player, state.bot);
        if (action === "dodge") dodge(state.player);
      });
    }
  });
}

function updatePlayer(dt, now) {
  const player = state.player;

  if (!player || now < player.stunnedUntil || now < player.trappedUntil) {
    if (player) player.vx = 0;
    return;
  }

  const left = state.keys.a || state.keys.arrowleft;
  const right = state.keys.d || state.keys.arrowright;

  let direction = 0;

  if (left) direction -= 1;
  if (right) direction += 1;

  const speedMultiplier = now < player.boostUntil ? 1.65 : 1;
  const slowMultiplier = now < player.slowUntil ? 0.45 : 1;

  player.vx = direction * (player.baseSpeed * 2.35) * speedMultiplier * slowMultiplier;

  if (direction !== 0) player.facing = direction;
}

/* -----------------------------
   AI bot
----------------------------- */

function updateBot(dt, now) {
  const bot = state.bot;
  const player = state.player;

  if (!bot || !player) return;

  if (now < bot.stunnedUntil || now < bot.trappedUntil) {
    bot.vx = 0;
    return;
  }

  const distance = centerX(player) - centerX(bot);
  const absDistance = Math.abs(distance);
  const direction = Math.sign(distance) || -1;

  bot.facing = direction;

  const levelAggression = 1 + state.currentLevel * 0.045;
  const speedMultiplier = now < bot.boostUntil ? 1.55 : 1;
  const slowMultiplier = now < bot.slowUntil ? 0.45 : 1;

  const wantsRange = ["fireBreath", "iceBreath", "eyeLasers", "shadowChain"].includes(bot.fighter.specialType);

  let desiredMovement = 0;

  if (wantsRange) {
    if (absDistance < 170) desiredMovement = -direction;
    else if (absDistance > 300) desiredMovement = direction;
  } else {
    if (absDistance > 92) desiredMovement = direction;
  }

  bot.vx = desiredMovement * bot.baseSpeed * 1.65 * levelAggression * speedMultiplier * slowMultiplier;

  const punchChanceDelay = Math.max(330, 900 - state.currentLevel * 42);
  const kickChanceDelay = Math.max(460, 1200 - state.currentLevel * 48);
  const specialChanceDelay = Math.max(700, 1800 - state.currentLevel * 60);

  if (absDistance < 88 && now - bot.lastPunch > punchChanceDelay) {
    punch(bot, player);
  }

  if (absDistance < 132 && now - bot.lastKick > kickChanceDelay && Math.random() < 0.45) {
    kick(bot, player);
  }

  if (now - bot.lastSpecial > bot.fighter.specialCooldown + 600 && now - bot.lastAiThink > specialChanceDelay) {
    bot.lastAiThink = now;

    if (Math.random() < 0.7) {
      useSpecial(bot, player);
    }
  }

  if (absDistance < 95 && now - bot.lastDodge > 2500 && Math.random() < 0.005 + state.currentLevel * 0.0008) {
    dodge(bot);
  }
}

/* -----------------------------
   Physics
----------------------------- */

function updatePhysics(entity, dt) {
  if (!entity) return;

  entity.x += entity.vx * dt;

  entity.x = clamp(entity.x, 10, state.arenaWidth - entity.width - 10);

  if (!entity.grounded || entity.z > 0) {
    entity.vz -= 1850 * dt;
    entity.z += entity.vz * dt;

    if (entity.z <= 0) {
      entity.z = 0;
      entity.vz = 0;
      entity.grounded = true;
    }
  }
}

function jump(entity) {
  if (!entity || !entity.grounded || !state.roundActive) return;

  entity.vz = 650;
  entity.grounded = false;
}

function dodge(entity) {
  const now = performance.now();

  if (!entity || now - entity.lastDodge < 1400) return;

  entity.lastDodge = now;
  entity.dodgeUntil = now + 360;
  entity.x += entity.facing * 54;
  entity.x = clamp(entity.x, 10, state.arenaWidth - entity.width - 10);

  addEffect("impact", centerX(entity) - 36, getEntityTop(entity) + 70);
}

/* -----------------------------
   Basic attacks
----------------------------- */

function punch(attacker, target) {
  const now = performance.now();

  if (!attacker || !target || now - attacker.lastPunch < 430) return;

  attacker.lastPunch = now;

  const hit = isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 96;

  addEffect("impact", centerX(attacker) + attacker.facing * 48 - 36, getEntityTop(attacker) + 58);

  if (hit) {
    applyDamage(target, getScaledDamage(attacker, target, 13), attacker.facing * 12);
  }
}

function kick(attacker, target) {
  const now = performance.now();

  if (!attacker || !target || now - attacker.lastKick < 720) return;

  attacker.lastKick = now;

  const hit = isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 135;

  addEffect("kickwave", centerX(attacker) + attacker.facing * 44 - 52, getEntityTop(attacker) + 74);

  if (hit) {
    applyDamage(target, getScaledDamage(attacker, target, 17), attacker.facing * 28);
  }
}

/* -----------------------------
   Special abilities
----------------------------- */

function useSpecial(attacker, target) {
  const now = performance.now();

  if (!attacker || !target) return;

  const cooldown = attacker.fighter.specialCooldown;

  if (now - attacker.lastSpecial < cooldown) return;

  attacker.lastSpecial = now;

  switch (attacker.fighter.specialType) {
    case "powerPunch":
      specialPowerPunch(attacker, target);
      break;

    case "swiftFeet":
      specialSpeedBoost(attacker, "swift");
      break;

    case "fireBreath":
      specialFireBreath(attacker, target);
      break;

    case "eyeLasers":
      specialEyeLasers(attacker, target);
      break;

    case "iceBreath":
      specialIceBreath(attacker, target);
      break;

    case "powerKick":
      specialPowerKick(attacker, target);
      break;

    case "tornadoStrike":
      specialTornado(attacker, target);
      break;

    case "speedBurst":
      specialSpeedBoost(attacker, "burst");
      break;

    case "healingAura":
      specialHealingAura(attacker);
      break;

    case "shadowChain":
      specialShadowChain(attacker, target);
      break;

    case "groundSlam":
      specialGroundSlam(attacker, target);
      break;

    case "poisonTouch":
      specialPoisonTouch(attacker, target);
      break;

    default:
      punch(attacker, target);
  }

  updateHud();
}

function specialPowerPunch(attacker, target) {
  addEffect("impact", centerX(attacker) + attacker.facing * 54 - 36, getEntityTop(attacker) + 56);
  shakeArena();

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 118) {
    applyDamage(target, getScaledDamage(attacker, target, 28), attacker.facing * 34);
  }
}

function specialSpeedBoost(attacker, type) {
  const now = performance.now();
  attacker.boostUntil = now + (type === "burst" ? 3600 : 3000);

  addEffect("aura", centerX(attacker) - 80, getEntityTop(attacker) - 2);
}

function specialFireBreath(attacker, target) {
  addDirectionalEffect("cone fire", attacker, 172, 62);

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 205) {
    applyDamage(target, getScaledDamage(attacker, target, 13), attacker.facing * 8);

    const now = performance.now();
    target.burnUntil = now + 3600;
    target.nextBurnAt = now + 650;
  }
}

function specialEyeLasers(attacker, target) {
  const beamWidth = Math.min(480, Math.max(160, Math.abs(centerX(target) - centerX(attacker)) + 30));
  addDirectionalEffect("beam", attacker, beamWidth, 8);

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 520) {
    applyDamage(target, getScaledDamage(attacker, target, 25), attacker.facing * 14);
  }
}

function specialIceBreath(attacker, target) {
  addDirectionalEffect("cone ice", attacker, 170, 62);

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 185) {
    applyDamage(target, getScaledDamage(attacker, target, 11), attacker.facing * 9);

    const now = performance.now();
    target.slowUntil = now + 3200;
  }
}

function specialPowerKick(attacker, target) {
  addEffect("kickwave", centerX(attacker) + attacker.facing * 56 - 55, getEntityTop(attacker) + 78);

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 152) {
    applyDamage(target, getScaledDamage(attacker, target, 26), attacker.facing * 46);
  }
}

function specialTornado(attacker, target) {
  addEffect("tornado", centerX(attacker) - 65, getEntityTop(attacker) - 2);

  if (distanceBetween(attacker, target) < 168) {
    applyDamage(target, getScaledDamage(attacker, target, 19), attacker.facing * 42);
  }
}

function specialHealingAura(attacker) {
  attacker.health = Math.min(attacker.maxHealth, attacker.health + 26);
  addEffect("aura", centerX(attacker) - 80, getEntityTop(attacker) - 2);
}

function specialShadowChain(attacker, target) {
  const x1 = centerX(attacker);
  const x2 = centerX(target);
  const y = getEntityTop(attacker) + 72;
  const width = Math.abs(x2 - x1);

  const effect = addEffect("chain", Math.min(x1, x2), y);
  effect.style.width = `${width}px`;

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 285) {
    applyDamage(target, getScaledDamage(attacker, target, 9), 0);

    const now = performance.now();
    target.trappedUntil = now + 1450;

    target.x += Math.sign(centerX(attacker) - centerX(target)) * 45;
    target.x = clamp(target.x, 10, state.arenaWidth - target.width - 10);
  }
}

function specialGroundSlam(attacker, target) {
  addEffect("shockwave", centerX(attacker) - 110, state.floorY - 26);
  shakeArena();

  if (distanceBetween(attacker, target) < 165) {
    applyDamage(target, getScaledDamage(attacker, target, 27), attacker.facing * 26);
    target.stunnedUntil = performance.now() + 450;
  }
}

function specialPoisonTouch(attacker, target) {
  addEffect("poison", centerX(attacker) + attacker.facing * 40 - 45, getEntityTop(attacker) + 54);

  if (isFacingTarget(attacker, target) && distanceBetween(attacker, target) < 128) {
    applyDamage(target, getScaledDamage(attacker, target, 10), attacker.facing * 10);

    const now = performance.now();
    target.poisonUntil = now + 4600;
    target.nextPoisonAt = now + 600;
  }
}

/* -----------------------------
   Damage & status effects
----------------------------- */

function applyDamage(target, amount, knockback = 0) {
  const now = performance.now();

  if (!target || target.health <= 0) return;
  if (now < target.hitInvulnerableUntil) return;
  if (now < target.dodgeUntil) {
    addEffect("impact", centerX(target) - 36, getEntityTop(target) + 58);
    return;
  }

  target.health = Math.max(0, target.health - amount);
  target.x += knockback;
  target.x = clamp(target.x, 10, state.arenaWidth - target.width - 10);
  target.hitInvulnerableUntil = now + 240;

  const sprite = target.isBot ? botSprite : playerSprite;
  sprite.classList.add("hit");

  setTimeout(() => sprite.classList.remove("hit"), 130);

  updateHud();
}

function updateStatusEffects(entity, now) {
  if (!entity || entity.health <= 0) return;

  if (entity.burnUntil > now && now >= entity.nextBurnAt) {
    entity.nextBurnAt = now + 700;
    entity.health = Math.max(0, entity.health - 4);
    addEffect("impact", centerX(entity) - 26, getEntityTop(entity) + 46);
  }

  if (entity.poisonUntil > now && now >= entity.nextPoisonAt) {
    entity.nextPoisonAt = now + 760;
    entity.health = Math.max(0, entity.health - 5);
    addEffect("poison", centerX(entity) - 45, getEntityTop(entity) + 50);
  }
}

function getScaledDamage(attacker, target, base) {
  const attackScale = attacker.attack / 75;
  const defenseScale = 100 / (100 + target.defense * 0.58);
  return Math.max(2, Math.round(base * attackScale * defenseScale));
}

/* -----------------------------
   Round ending
----------------------------- */

function endRound(winner, reason) {
  if (!state.roundActive) return;

  state.roundActive = false;
  stopLoop();

  if (winner === "player") {
    state.playerRoundWins += 1;
  } else {
    state.botRoundWins += 1;
  }

  playerRoundWinsHud.textContent = state.playerRoundWins;
  botRoundWinsHud.textContent = state.botRoundWins;

  const winnerName = winner === "player"
    ? state.selectedFighter.name
    : state.currentOpponent.name;

  roundResultTitle.textContent = `${winnerName} Wins Round ${state.currentRound}`;
  roundResultText.textContent = reason;
  roundPlayerScore.textContent = state.playerRoundWins;
  roundBotScore.textContent = state.botRoundWins;

  if (state.playerRoundWins >= 2) {
    state.afterRoundTarget = "matchVictory";
  } else if (state.botRoundWins >= 2) {
    state.afterRoundTarget = "gameOver";
  } else {
    state.afterRoundTarget = "nextRound";
  }

  showScreen("roundResult");
}

function continueAfterRound() {
  if (state.afterRoundTarget === "nextRound") {
    state.currentRound = state.playerRoundWins + state.botRoundWins + 1;
    beginRound();
    return;
  }

  if (state.afterRoundTarget === "matchVictory") {
    handleMatchVictory();
    return;
  }

  if (state.afterRoundTarget === "gameOver") {
    showGameOver();
  }
}

function handleMatchVictory() {
  state.defeatedOpponents.push(state.currentOpponent);
  state.currentLevel += 1;

  updateBestLevel();

  if (state.currentLevel >= state.opponents.length) {
    showChampionScreen();
    return;
  }

  const next = state.opponents[state.currentLevel];

  matchVictoryTitle.textContent = `${state.currentOpponent.name} Defeated`;
  matchVictoryText.textContent = `Level ${state.currentLevel} complete. Next opponent: ${next.name}, specialist in ${next.specialName}.`;

  showScreen("matchVictory");
}

function updateBestLevel() {
  const currentBest = Number(localStorage.getItem(SAVE_KEYS.bestLevel) || "0");
  const newBest = Math.max(currentBest, state.currentLevel);
  localStorage.setItem(SAVE_KEYS.bestLevel, String(newBest));
  renderSaveStats();
}

function showGameOver() {
  updateBestLevel();

  gameOverText.textContent = `${state.currentOpponent.name} ended your run at Level ${state.currentLevel + 1}. You fought as ${state.selectedFighter.name}.`;

  showScreen("gameOver");
}

function showChampionScreen() {
  const currentWins = Number(localStorage.getItem(SAVE_KEYS.championWins) || "0");
  localStorage.setItem(SAVE_KEYS.championWins, String(currentWins + 1));
  localStorage.setItem(SAVE_KEYS.bestLevel, "11");

  championText.textContent = `${state.selectedFighter.name} cleared all 11 levels and defeated every CT Creator in the tournament.`;

  defeatedList.innerHTML = "";

  state.defeatedOpponents.forEach(fighter => {
    const badge = document.createElement("span");
    badge.textContent = fighter.name;
    defeatedList.appendChild(badge);
  });

  renderSaveStats();
  showScreen("champion");
}

/* -----------------------------
   Rendering
----------------------------- */

function renderCombatants(now) {
  renderEntity(playerSprite, state.player, now);
  renderEntity(botSprite, state.bot, now);
}

function renderEntity(sprite, entity, now) {
  if (!sprite || !entity) return;

  const top = getEntityTop(entity);

  sprite.style.left = `${entity.x}px`;
  sprite.style.top = `${top}px`;
  sprite.style.width = `${entity.width}px`;
  sprite.style.height = `${entity.height}px`;

  sprite.classList.toggle("facing-left", entity.facing === -1);
  sprite.classList.toggle("dodging", now < entity.dodgeUntil);
  sprite.classList.toggle("boosted", now < entity.boostUntil);
  sprite.classList.toggle("frozen", now < entity.slowUntil);
  sprite.classList.toggle("poisoned", now < entity.poisonUntil);
}

function updateHud() {
  if (!state.player || !state.bot || !state.currentOpponent) return;

  playerNameHud.textContent = state.selectedFighter.name;
  botNameHud.textContent = state.currentOpponent.name;

  playerSpecialHud.textContent = state.selectedFighter.specialName;
  botSpecialHud.textContent = state.currentOpponent.specialName;

  playerRoundWinsHud.textContent = state.playerRoundWins;
  botRoundWinsHud.textContent = state.botRoundWins;

  levelHud.textContent = `Level ${state.currentLevel + 1}`;
  roundHud.textContent = `Round ${state.currentRound}`;
  matchScoreHud.textContent = `${state.playerRoundWins} - ${state.botRoundWins}`;

  timerHud.textContent = Math.max(0, Math.ceil(state.roundTimer));

  const playerHealthPct = clamp((state.player.health / state.player.maxHealth) * 100, 0, 100);
  const botHealthPct = clamp((state.bot.health / state.bot.maxHealth) * 100, 0, 100);

  playerHealthBar.style.width = `${playerHealthPct}%`;
  botHealthBar.style.width = `${botHealthPct}%`;

  const now = performance.now();
  const elapsed = now - state.player.lastSpecial;
  const cooldown = state.selectedFighter.specialCooldown;
  const readyPct = clamp((elapsed / cooldown) * 100, 0, 100);
  specialCooldownBar.style.width = `${readyPct}%`;
}

/* -----------------------------
   Effects
----------------------------- */

function addEffect(type, x, y) {
  const effect = document.createElement("div");
  effect.className = `fx ${type}`;
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;

  effectsLayer.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 900);

  return effect;
}

function addDirectionalEffect(type, attacker, width, height) {
  const x = attacker.facing === 1
    ? centerX(attacker) + 28
    : centerX(attacker) - width - 28;

  const y = getEntityTop(attacker) + 54;

  const effect = addEffect(type, x, y);
  effect.style.width = `${width}px`;
  effect.style.height = `${height}px`;

  if (attacker.facing === -1) {
    effect.classList.add("flip");
  }

  return effect;
}

function shakeArena() {
  arena.classList.add("shake");
  setTimeout(() => arena.classList.remove("shake"), 190);
}

/* -----------------------------
   Geometry helpers
----------------------------- */

function centerX(entity) {
  return entity.x + entity.width / 2;
}

function centerY(entity) {
  return getEntityTop(entity) + entity.height / 2;
}

function getEntityTop(entity) {
  return state.floorY - entity.height - entity.z;
}

function distanceBetween(a, b) {
  return Math.abs(centerX(a) - centerX(b));
}

function isFacingTarget(attacker, target) {
  const diff = centerX(target) - centerX(attacker);
  return Math.sign(diff) === attacker.facing || Math.abs(diff) < 18;
}

function faceEachOther() {
  if (!state.player || !state.bot) return;

  state.player.facing = centerX(state.bot) > centerX(state.player) ? 1 : -1;
  state.bot.facing = centerX(state.player) > centerX(state.bot) ? 1 : -1;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* -----------------------------
   Resize handling
----------------------------- */

window.addEventListener("resize", () => {
  if (!state.roundActive) return;
  measureArena();

  if (state.player) {
    state.player.x = clamp(state.player.x, 10, state.arenaWidth - state.player.width - 10);
  }

  if (state.bot) {
    state.bot.x = clamp(state.bot.x, 10, state.arenaWidth - state.bot.width - 10);
  }
});
