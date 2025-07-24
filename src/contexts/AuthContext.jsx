import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const signup = (name) => setUser({ name });
  const guestLogin = () => setUser({ name: "Guest" });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
