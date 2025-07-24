import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username, guest: false });
  const signup = (username) => setUser({ name: username, guest: false });
  const guestLogin = () => setUser({ name: "Guest", guest: true });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
