import { createContext, useState, useEffect } from "react";
import { getCurrentUser, isAuthenticated as checkAuth } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUser = getCurrentUser();
        const authStatus = checkAuth();

        setUser(currentUser);
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const clearUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    updateUser,
    clearUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
