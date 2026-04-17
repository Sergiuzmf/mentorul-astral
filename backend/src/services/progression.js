const { query } = require("../db");

const LEVEL_TITLES = [
  "Observator Novice",
  "Cadet Astronomic",
  "Navigator Stelar",
  "Analist Cosmic",
  "Solver Orbital",
  "Cartograf Ceresc",
  "Astrofizician Junior",
  "Strateg ONAA",
  "Comandor de Traiectorii",
  "Maestru al Cerului",
  "Arhitect de Misiuni",
  "Legenda ONAA"
];

function xpForLevel(level) {
  return Math.max(0, 120 * (level - 1) * level);
}

function levelFromXp(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

function titleForLevel(level) {
  return LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, Math.floor((level - 1) / 2))];
}

function maskEmail(email) {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const maskedName =
    name.length <= 2 ? `${name[0] || "*"}*` : `${name.slice(0, 2)}${"*".repeat(Math.max(2, name.length - 2))}`;
  return `${maskedName}@${domain}`;
}

function mapProgression(row) {
  const level = row.level || levelFromXp(Number(row.total_xp || 0));
  return {
    totalXp: Number(row.total_xp || 0),
    level,
    title: row.rank_title || titleForLevel(level),
    totalMinutesCompleted: Number(row.total_minutes_completed || 0),
    sessionsCompleted: Number(row.sessions_completed || 0),
    mockTestsCompleted: Number(row.mock_tests_completed || 0),
    nextLevelXp: xpForLevel(level + 1),
    currentLevelBaseXp: xpForLevel(level)
  };
}

async function ensureUserProgression(userId) {
  await query(
    `
      INSERT INTO user_progression (user_id)
      VALUES ($1)
      ON CONFLICT (user_id) DO NOTHING
    `,
    [userId]
  );

  const result = await query("SELECT * FROM user_progression WHERE user_id = $1", [userId]);
  return result.rows[0];
}

async function awardStudyXp({ userId, minutes, topic }) {
  const safeMinutes = Math.max(15, Math.min(180, Number(minutes || 0)));
  const xpAwarded = 20 + Math.round(safeMinutes * 1.5);
  await ensureUserProgression(userId);

  const result = await query(
    `
      UPDATE user_progression
      SET total_xp = total_xp + $2,
          total_minutes_completed = total_minutes_completed + $3,
          sessions_completed = sessions_completed + 1,
          updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `,
    [userId, xpAwarded, safeMinutes]
  );

  await query(
    "INSERT INTO progression_events (user_id, event_type, topic_tag, xp_awarded, metadata) VALUES ($1, $2, $3, $4, $5::jsonb)",
    [userId, "study_session_completed", topic || "general", xpAwarded, JSON.stringify({ minutes: safeMinutes })]
  );

  const progression = mapProgression(result.rows[0]);
  await syncProgressionLevel(userId, progression);
  return { xpAwarded, progression: await getUserProgression(userId) };
}

async function awardMockTestXp({ userId, difficulty, answerCount }) {
  const difficultyBonus = {
    intermediate: 35,
    advanced: 55,
    expert: 85
  };
  const xpAwarded = (difficultyBonus[difficulty] || 50) + Math.max(0, Number(answerCount || 0) * 4);
  await ensureUserProgression(userId);

  const result = await query(
    `
      UPDATE user_progression
      SET total_xp = total_xp + $2,
          mock_tests_completed = mock_tests_completed + 1,
          updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `,
    [userId, xpAwarded]
  );

  await query(
    "INSERT INTO progression_events (user_id, event_type, topic_tag, xp_awarded, metadata) VALUES ($1, $2, $3, $4, $5::jsonb)",
    [userId, "mock_test_completed", "mock_tests", xpAwarded, JSON.stringify({ difficulty, answerCount })]
  );

  const progression = mapProgression(result.rows[0]);
  await syncProgressionLevel(userId, progression);
  return { xpAwarded, progression: await getUserProgression(userId) };
}

async function syncProgressionLevel(userId, progression) {
  await query(
    `
      UPDATE user_progression
      SET level = $2,
          rank_title = $3,
          updated_at = NOW()
      WHERE user_id = $1
    `,
    [userId, progression.level, progression.title]
  );
}

async function getUserProgression(userId) {
  const row = await ensureUserProgression(userId);
  const progression = mapProgression(row);
  await syncProgressionLevel(userId, progression);
  return progression;
}

async function getLeaderboard(limit = 10) {
  const result = await query(
    `
      SELECT u.email, up.total_xp, up.level, up.rank_title, up.total_minutes_completed, up.sessions_completed, up.mock_tests_completed
      FROM user_progression up
      JOIN users u ON u.id = up.user_id
      ORDER BY up.total_xp DESC, up.total_minutes_completed DESC, up.mock_tests_completed DESC
      LIMIT $1
    `,
    [limit]
  );

  return result.rows.map((row, index) => ({
    rank: index + 1,
    user: maskEmail(row.email),
    ...mapProgression(row)
  }));
}

module.exports = {
  awardMockTestXp,
  awardStudyXp,
  getLeaderboard,
  getUserProgression
};

