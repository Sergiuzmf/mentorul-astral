export function buildProgressBar(value) {
  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width:${Math.max(0, Math.min(100, value))}%"></div>
    </div>
  `;
}

export function percent(value) {
  return `${Math.round(value)}%`;
}

export function formatMinutes(value) {
  return `${value} min`;
}

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
