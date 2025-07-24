import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AuthPage = () => {
  const { login, signup, guestLogin } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) login(username);
    else signup(username);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT SIDE: Home Info */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white p-8">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
          <p className="text-lg">
            Enjoy our platform! Sign up to unlock full features or continue as a guest.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-80">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              required
            />
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-center text-indigo-500 cursor-pointer"
          >
            {isLogin ? "No account? Sign Up" : "Have an account? Login"}
          </p>
          <button
            onClick={guestLogin}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
