import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("hackTrackerUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("hackTrackerToken"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("hackTrackerToken")));
  const [error, setError] = useState("");

  const saveSession = (data) => {
    localStorage.setItem("hackTrackerToken", data.token);
    localStorage.setItem("hackTrackerUser", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const clearSession = () => {
    localStorage.removeItem("hackTrackerToken");
    localStorage.removeItem("hackTrackerUser");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        localStorage.setItem("hackTrackerUser", JSON.stringify(data.user));
      } catch (profileError) {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const login = async (formData) => {
    setError("");
    const { data } = await api.post("/auth/login", formData);
    saveSession(data);
    return data.user;
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      setError,
      login,
      logout,
      isAuthenticated: Boolean(token && user)
    }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
