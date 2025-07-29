// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (name) => setUser({ name, guest: false });
  const signup = (name) => setUser({ name, guest: false });
  const guestLogin = () => setUser({ name: "Guest", guest: true });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
