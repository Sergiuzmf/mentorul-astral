export const TOKEN_STORAGE_KEY = "onaa.auth.token";

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.port === "5173" ? "http://localhost:4000" : "");

function buildUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", token, body } = options;
  const headers = {
    Accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError(payload?.message || "A aparut o eroare.", response.status, payload);
  }

  return payload;
}

export async function streamSseJson({ path, token, body, onMessage }) {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    credentials: "include",
    body: JSON.stringify(body)
  });

  if (!response.ok || !response.body) {
    throw new ApiError("Nu am putut contacta AI-ul. Verifica backendul local.", response.status, null);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      const dataLine = event
        .split("\n")
        .find((line) => line.startsWith("data:"));
      if (!dataLine) continue;

      const payload = JSON.parse(dataLine.replace("data:", "").trim());
      if (payload.type === "error") {
        throw new ApiError(payload.message || "AI tutor error.", 500, payload);
      }
      onMessage(payload);
    }
  }
}
