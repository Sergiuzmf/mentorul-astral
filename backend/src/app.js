const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const aiRoutes = require("./routes/ai");
const config = require("./config");
const authRoutes = require("./routes/auth");
const goalsRoutes = require("./routes/goals");
const profileRoutes = require("./routes/profile");
const progressionRoutes = require("./routes/progression");
const preferencesRoutes = require("./routes/preferences");
const { ensureSchema } = require("./services/schema");

const app = express();
const schemaReady = ensureSchema().catch((error) => {
  console.error("Failed to initialize backend schema", error);
  throw error;
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.clientUrls.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true
  })
);

app.use(async (request, response, next) => {
  try {
    await schemaReady;
    next();
  } catch (error) {
    next(error);
  }
});

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/progression", progressionRoutes);
app.use("/api/preferences", preferencesRoutes);

app.use((request, response) => {
  response.status(404).json({ message: "Ruta nu exista." });
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ message: "Server function has crashed." });
});

module.exports = {
  app,
  schemaReady
};

