const { query } = require("../db");

async function ensureSchema() {
  await query("CREATE EXTENSION IF NOT EXISTS pgcrypto");

  await query(`
    CREATE TABLE IF NOT EXISTS ai_learning_profile (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      concept_mastery JSONB DEFAULT '{}'::jsonb,
      learning_style VARCHAR(20) DEFAULT 'conceptual',
      common_mistakes JSONB DEFAULT '[]'::jsonb,
      preferred_pace VARCHAR(10) DEFAULT 'normal',
      conversation_context TEXT DEFAULT '',
      last_session_summary TEXT DEFAULT '',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS ai_conversations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      session_id VARCHAR(100) NOT NULL,
      role VARCHAR(20) NOT NULL,
      content TEXT NOT NULL,
      tokens_used INTEGER DEFAULT 0,
      topic_tag VARCHAR(50) DEFAULT 'general',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS ai_content_cache (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content_type VARCHAR(50) NOT NULL,
      topic VARCHAR(100) NOT NULL,
      difficulty VARCHAR(20) DEFAULT 'adaptive',
      content_hash VARCHAR(64) UNIQUE NOT NULL,
      generated_content JSONB NOT NULL,
      used_count INTEGER DEFAULT 1,
      last_used TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS user_goals (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      daily_minutes INTEGER DEFAULT 60,
      days_per_week INTEGER DEFAULT 5,
      intensity_mode VARCHAR(20) DEFAULT 'normal',
      preferred_time TIME,
      auto_adjust BOOLEAN DEFAULT true,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS saved_explanations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      source_topic VARCHAR(50) DEFAULT 'general',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS mock_test_attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      generated_test JSONB NOT NULL,
      submitted_answers JSONB DEFAULT '[]'::jsonb,
      analysis JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS user_progression (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      total_xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      rank_title VARCHAR(100) DEFAULT 'Observator Novice',
      total_minutes_completed INTEGER DEFAULT 0,
      sessions_completed INTEGER DEFAULT 0,
      mock_tests_completed INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS progression_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      event_type VARCHAR(50) NOT NULL,
      topic_tag VARCHAR(50) DEFAULT 'general',
      xp_awarded INTEGER DEFAULT 0,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS user_preferences (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      last_math_topic VARCHAR(100) DEFAULT 'Algebra de baza',
      selected_tracks JSONB DEFAULT '["astrophysics","astronomy"]'::jsonb,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

module.exports = {
  ensureSchema
};
