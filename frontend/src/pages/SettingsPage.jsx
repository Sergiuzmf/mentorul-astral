import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export function SettingsPage() {
  const { token } = useAuth();
  const [goals, setGoals] = useState({
    dailyMinutes: 45,
    daysPerWeek: 5,
    intensityMode: "normal",
    preferredTime: "",
    autoAdjust: true
  });
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    async function load() {
      const response = await apiRequest("/api/goals", { token });
      setGoals({
        ...response.goals,
        preferredTime: response.goals.preferredTime || ""
      });
    }

    load().catch(console.error);
  }, [token]);

  async function saveGoals() {
    const response = await apiRequest("/api/goals", {
      method: "PUT",
      token,
      body: goals
    });
    setPlan(response.plan);
  }

  return (
    <div className="page-stack">
      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Goals & AI</p>
            <h1>Cat timp poti studia zilnic?</h1>
          </div>
        </div>

        <div className="settings-grid">
          <label>
            Minute pe zi: {goals.dailyMinutes}
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={goals.dailyMinutes}
              onChange={(event) => setGoals((current) => ({ ...current, dailyMinutes: Number(event.target.value) }))}
            />
          </label>

          <label>
            Zile pe saptamana
            <input
              type="number"
              min="1"
              max="7"
              value={goals.daysPerWeek}
              onChange={(event) => setGoals((current) => ({ ...current, daysPerWeek: Number(event.target.value) }))}
            />
          </label>

          <label>
            Intensitate
            <select
              value={goals.intensityMode}
              onChange={(event) => setGoals((current) => ({ ...current, intensityMode: event.target.value }))}
            >
              <option value="relaxed">Relaxed</option>
              <option value="normal">Normal</option>
              <option value="intensive">Intensive</option>
            </select>
          </label>

          <label>
            Ora preferata
            <input
              type="time"
              value={goals.preferredTime}
              onChange={(event) => setGoals((current) => ({ ...current, preferredTime: event.target.value }))}
            />
          </label>
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={goals.autoAdjust}
            onChange={(event) => setGoals((current) => ({ ...current, autoAdjust: event.target.checked }))}
          />
          Permite AI-ului sa ajusteze sarcina atunci cand termini prea repede sau prea greu.
        </label>

        <button className="primary-button" type="button" onClick={saveGoals}>
          Salveaza si regenereaza planul
        </button>
      </section>

      {plan ? (
        <section className="content-card">
          <h2>Plan AI actualizat</h2>
          <p>{plan.coachMessage}</p>
          <ul className="clean-list">
            {plan.sections.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
