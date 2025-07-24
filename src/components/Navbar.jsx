import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { login, signup, guestLogin, user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) login(username);
    else signup(username);
    setShowModal(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      
      <div className="text-2xl font-bold text-indigo-500">MyApp</div>

      
      <nav className="flex gap-6 text-lg text-gray-700 dark:text-gray-200 items-center">
        <Link to="/home" className="hover:text-indigo-500"> Home</Link>
        <Link to="/event" className="hover:text-indigo-500"> Event</Link>
        <Link to="/gallery" className="hover:text-indigo-500"> Gallery</Link>

        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          {darkMode ? " Light" : " Dark"}
        </button>

        
        {!user ? (
          <button
            onClick={() => setShowModal(true)}
            className="text-indigo-500 font-semibold hover:underline"
          >
            Login
          </button>
        ) : (
          <>
            <span className="text-gray-600 dark:text-gray-300">
              Hello, {user.name}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
                required
              />
              <button className="bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p
              onClick={() => setIsLogin(!isLogin)}
              className="mt-3 text-center text-indigo-500 cursor-pointer"
            >
              {isLogin ? "No account? Sign Up" : "Have an account? Login"}
            </p>
            <button
              onClick={guestLogin}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Continue as Guest
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
