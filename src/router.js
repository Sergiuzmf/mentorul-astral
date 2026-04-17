export function getRoute() {
  const hash = window.location.hash || "#/dashboard";
  return hash.replace(/^#\//, "") || "dashboard";
}

export function ensureRoute(routeIds) {
  const current = getRoute();
  if (!routeIds.includes(current)) {
    window.location.hash = "#/dashboard";
  }
}
