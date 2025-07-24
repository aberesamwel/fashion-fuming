import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Footer from "./components/Footer";

import "./App.css";

// ✅ Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  if (!user || user.guest) return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Navbar />

            <header className="bg-white dark:bg-gray-800 shadow p-4 mb-6">
              <h1 className="text-3xl font-bold text-center text-purple-600 dark:text-purple-300">
                Fashion Fuming Gallery
              </h1>
            </header>

            <main className="container mx-auto px-4">
              <Routes>
                {/* Redirect root to /home */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />

                {/* Protected gallery route */}
                <Route
                  path="/gallery"
                  element={
                    <ProtectedRoute>
                      <Gallery />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
