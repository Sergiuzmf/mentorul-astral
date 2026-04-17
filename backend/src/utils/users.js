function mapUser(row) {
  return {
    id: row.id,
    email: row.email,
    grade: row.grade,
    targetYear: row.target_year,
    skillLevel: row.skill_level,
    onboardingCompleted: row.onboarding_completed,
    currentStreak: row.current_streak,
    createdAt: row.created_at
  };
}

const userSelectColumns = `
  id,
  email,
  grade,
  target_year,
  skill_level,
  onboarding_completed,
  current_streak,
  created_at
`;

module.exports = {
  mapUser,
  userSelectColumns
};
