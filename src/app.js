import { navigation, originalProblems } from "./content.js";
import { getRoute, ensureRoute } from "./router.js";
import { completeDailySession, loadState, markProblemSolved, resetState, saveState } from "./state.js";
import {
  bindToolForms,
  communityView,
  curriculumView,
  dailyView,
  dashboardView,
  problemsView,
  renderNav,
  renderProblemCards,
  resourcesView,
  simulatorView,
  syncSidebar,
  toolsView
} from "./views.js";

let state = loadState();

function render() {
  const routes = navigation.map((item) => item.id);
  ensureRoute(routes);
  const route = getRoute();

  document.getElementById("nav-links").innerHTML = renderNav(route);
  document.getElementById("page-title").textContent = navigation.find((item) => item.id === route)?.label || "ONAA Prep Hub";
  syncSidebar(state);

  const app = document.getElementById("app");
  const views = {
    dashboard: dashboardView(state),
    curriculum: curriculumView(state),
    daily: dailyView(state),
    problems: problemsView(state),
    simulator: simulatorView(state),
    resources: resourcesView(state),
    tools: toolsView(state),
    community: communityView(state)
  };
  app.innerHTML = views[route] || dashboardView(state);
  attachInteractions();
  bindToolForms();
  saveState(state);
}

function attachInteractions() {
  document.querySelectorAll("[data-action='complete-session']").forEach((button) => {
    button.addEventListener("click", () => {
      state = completeDailySession(state);
      render();
    });
  });

  document.querySelectorAll("[data-action='solve-problem']").forEach((button) => {
    button.addEventListener("click", () => {
      const problem = originalProblems.find((item) => item.id === button.dataset.problemId);
      if (!problem) return;
      state = markProblemSolved(state, problem);
      render();
    });
  });

  const levelFilter = document.getElementById("problem-level-filter");
  const topicFilter = document.getElementById("problem-topic-filter");
  if (levelFilter && topicFilter) {
    const applyFilters = () => {
      const level = levelFilter.value;
      const topic = topicFilter.value;
      const filtered = originalProblems.filter((problem) => {
        const levelMatch = level === "all" || problem.level === level;
        const topicMatch = topic === "all" || problem.topic === topic;
        return levelMatch && topicMatch;
      });
      document.getElementById("problem-list").innerHTML = renderProblemCards(filtered, new Set(state.completedProblemIds));
      attachInteractions();
    };
    levelFilter.addEventListener("change", applyFilters);
    topicFilter.addEventListener("change", applyFilters);
  }

  document.querySelectorAll("[data-action='start-simulator']").forEach((button) => {
    button.addEventListener("click", () => {
      const score = Math.min(97, state.readinessScore + 4);
      state.simulatorAttempts.unshift({
        date: new Date().toISOString().slice(0, 10),
        score,
        comment: "Simulare generata local. Continua cu analiza de date pentru un scor si mai bun."
      });
      render();
    });
  });
}

window.addEventListener("hashchange", render);
document.getElementById("reset-progress").addEventListener("click", () => {
  state = resetState();
  render();
});
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => undefined);
}

render();
