import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-lg">
      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        MyApp
      </div>

      <div className="flex items-center gap-4">
        <Link to="/home" className="hover:text-indigo-500">Home</Link>
        {user && !user.guest && (
          <Link to="/dashboard" className="hover:text-indigo-500">Dashboard</Link>
        )}

        {/* ✅ Display Hello message */}
        {user && (
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Hello, {user.name} 👋
          </span>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
        >
          {darkMode ? "Light" : "Dark"}
        </button>

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
