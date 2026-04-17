const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

function requireEnv(name, fallback) {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

module.exports = {
  port: Number(process.env.PORT || 4000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  clientUrls: (process.env.CLIENT_URLS || `${process.env.CLIENT_URL || "http://localhost:5173"},http://127.0.0.1:5173`)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  databaseUrl: requireEnv("DATABASE_URL", null),
  jwtSecret: requireEnv("JWT_SECRET", null),
  jwtExpiresIn: "7d",
  jwtCookieName: "onaa_token",
  openAiApiKey: process.env.OPENAI_API_KEY || "",
  openAiBaseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  openAiModel: process.env.OPENAI_MODEL || "gpt-4o",
  aiDailyMessageLimit: Number(process.env.AI_DAILY_MESSAGE_LIMIT || 50)
};
