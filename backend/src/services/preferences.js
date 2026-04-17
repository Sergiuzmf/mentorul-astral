const { query } = require("../db");
const { mathTopics, studyTracks } = require("../data/learningCatalog");

async function ensureUserPreferences(userId) {
  await query(
    `
      INSERT INTO user_preferences (user_id)
      VALUES ($1)
      ON CONFLICT (user_id) DO NOTHING
    `,
    [userId]
  );

  const result = await query("SELECT * FROM user_preferences WHERE user_id = $1", [userId]);
  return result.rows[0];
}

function mapPreferences(row) {
  return {
    lastMathTopic: row.last_math_topic,
    selectedTracks: row.selected_tracks || ["astrophysics", "astronomy"]
  };
}

async function getUserPreferences(userId) {
  const row = await ensureUserPreferences(userId);
  return mapPreferences(row);
}

async function updateUserPreferences(userId, payload) {
  const lastMathTopic = mathTopics.includes(payload.lastMathTopic) ? payload.lastMathTopic : "Algebra de baza";
  const selectedTracks = Array.isArray(payload.selectedTracks) && payload.selectedTracks.length
    ? payload.selectedTracks.filter((item) => studyTracks.some((track) => track.id === item))
    : ["astrophysics", "astronomy"];

  const result = await query(
    `
      INSERT INTO user_preferences (user_id, last_math_topic, selected_tracks, updated_at)
      VALUES ($1, $2, $3::jsonb, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET
        last_math_topic = EXCLUDED.last_math_topic,
        selected_tracks = EXCLUDED.selected_tracks,
        updated_at = NOW()
      RETURNING *
    `,
    [userId, lastMathTopic, JSON.stringify(selectedTracks)]
  );

  return mapPreferences(result.rows[0]);
}

module.exports = {
  getUserPreferences,
  mathTopics,
  studyTracks,
  updateUserPreferences
};

