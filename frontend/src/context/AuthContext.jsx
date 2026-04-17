import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest, TOKEN_STORAGE_KEY } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function bootstrap() {
      try {
        const response = await apiRequest("/api/auth/me", { token: localStorage.getItem(TOKEN_STORAGE_KEY) || undefined });
        if (!ignore) {
          setUser(response.user);
        }
      } catch {
        if (!ignore) {
          setUser(null);
          setToken(null);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      ignore = true;
    };
  }, []);

  async function login(credentials) {
    const response = await apiRequest("/api/auth/login", {
      method: "POST",
      body: credentials
    });

    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }

  async function register(payload) {
    const response = await apiRequest("/api/auth/register", {
      method: "POST",
      body: payload
    });

    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }

  async function logout() {
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
        token: token || undefined
      });
    } catch {
      // Local logout still proceeds for private development.
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  async function refreshUser() {
    if (!token) return null;
    const response = await apiRequest("/api/auth/me", { token });
    setUser(response.user);
    return response.user;
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth trebuie folosit in AuthProvider.");
  }
  return context;
}
