import { achievements, modules } from "./content.js";

const STORAGE_KEY = "onaa-prep-hub-state";

const defaultState = {
  streak: 5,
  xp: 340,
  completedSessions: 8,
  readinessScore: 67,
  benchmarkPercentile: 71,
  moduleProgress: Object.fromEntries(modules.map((module, index) => [module.id, index < 3 ? 65 + index * 8 : 12 + index * 3])),
  weakAreas: {
    mechanics: 58,
    stellar: 72,
    observation: 61,
    data: 49
  },
  achievementsUnlocked: ["a1"],
  completedProblemIds: ["p1", "p2", "p4", "p9"],
  flashcardsReviewed: 18,
  studyCalendar: [1, 2, 3, 5, 6, 8, 9, 10],
  sessionHistory: [
    { date: "2026-04-09", score: 72, focus: "Legile lui Kepler" },
    { date: "2026-04-10", score: 64, focus: "Fotometrie" },
    { date: "2026-04-11", score: 81, focus: "Diagrama HR" },
    { date: "2026-04-13", score: 56, focus: "Transfer Hohmann" }
  ],
  simulatorAttempts: [
    { date: "2026-03-26", score: 61, comment: "Ai ratat analiza de date." },
    { date: "2026-04-07", score: 68, comment: "Mai multa viteza la Subiectul II." }
  ]
};

export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultState);
  try {
    return { ...structuredClone(defaultState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return structuredClone(defaultState);
}

export function getRank(xp) {
  if (xp >= 1200) return "Cosmic Mentor";
  if (xp >= 800) return "Astrophysicist";
  if (xp >= 400) return "Astronom";
  return "Observer";
}

export function getNextRankThreshold(xp) {
  if (xp >= 1200) return 1200;
  if (xp >= 800) return 1200;
  if (xp >= 400) return 800;
  return 400;
}

export function completeDailySession(state) {
  const today = new Date().getDate();
  if (state.studyCalendar.includes(today)) return state;
  state.studyCalendar.push(today);
  state.studyCalendar.sort((a, b) => a - b);
  state.completedSessions += 1;
  state.streak += 1;
  state.flashcardsReviewed += 8;
  state.xp += 60;
  state.readinessScore = Math.min(99, state.readinessScore + 2);
  state.weakAreas.data = Math.min(100, state.weakAreas.data + 4);
  state.sessionHistory.unshift({
    date: new Date().toISOString().slice(0, 10),
    score: 78,
    focus: "Ora de Astrofizica completata"
  });

  const unlocked = new Set(state.achievementsUnlocked);
  if (state.completedSessions >= 1) unlocked.add("a1");
  if (state.streak >= 7) unlocked.add("a2");
  if (state.readinessScore >= 82) unlocked.add("a5");
  state.achievementsUnlocked = [...unlocked];
  return state;
}

export function markProblemSolved(state, problem) {
  if (!state.completedProblemIds.includes(problem.id)) {
    state.completedProblemIds.push(problem.id);
    state.xp += problem.level === "Master" ? 45 : problem.level === "Advanced" ? 30 : 20;
  }

  if (problem.topic === "orbits") state.weakAreas.mechanics = Math.min(100, state.weakAreas.mechanics + 3);
  if (problem.topic === "stellar") state.weakAreas.stellar = Math.min(100, state.weakAreas.stellar + 3);
  if (problem.topic === "observation" || problem.topic === "navigation") state.weakAreas.observation = Math.min(100, state.weakAreas.observation + 3);
  if (problem.topic === "data") state.weakAreas.data = Math.min(100, state.weakAreas.data + 4);

  const moduleId = problem.topic === "orbits" ? "m4" : problem.topic === "stellar" ? "m6" : problem.topic === "data" ? "m10" : "m2";
  state.moduleProgress[moduleId] = Math.min(100, (state.moduleProgress[moduleId] || 0) + 6);
  state.readinessScore = computeReadinessScore(state);

  const unlocked = new Set(state.achievementsUnlocked);
  if (state.completedProblemIds.length >= 5) unlocked.add("a3");
  if (state.readinessScore >= 82) unlocked.add("a5");
  state.achievementsUnlocked = [...unlocked];
  return state;
}

export function computeReadinessScore(state) {
  const weightedModules =
    modules.reduce((sum, module) => sum + (state.moduleProgress[module.id] || 0) * module.readinessWeight, 0) /
    modules.reduce((sum, module) => sum + module.readinessWeight, 0);
  const weaknessAverage =
    (state.weakAreas.mechanics + state.weakAreas.stellar + state.weakAreas.observation + state.weakAreas.data) / 4;
  const simulatorAverage =
    state.simulatorAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / state.simulatorAttempts.length;
  return Math.round(weightedModules * 0.45 + weaknessAverage * 0.3 + simulatorAverage * 0.25);
}

export function getUnlockedAchievements(state) {
  return achievements.filter((achievement) => state.achievementsUnlocked.includes(achievement.id));
}
