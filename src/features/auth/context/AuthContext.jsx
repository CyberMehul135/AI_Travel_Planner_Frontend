import { authAxios } from "@/services/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

// convert hook into normal-function
let logoutHandler = null;

export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

export const triggerLogout = () => {
  if (logoutHandler) logoutHandler();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const res = await authAxios.get("/api/v1/auth/session");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
