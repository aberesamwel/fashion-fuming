import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
