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

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.clientUrls.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true
  })
);
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

ensureSchema()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`ONAA backend listening on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize backend schema", error);
    process.exit(1);
  });
