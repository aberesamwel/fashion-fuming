import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import About from "./components/About/About";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Footer from "./components/Footer";

import "./App.css";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.guest) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gray-100">
            <Navbar />

            <header className="bg-white shadow p-4 mb-6">
              <h1 className="text-3xl font-bold text-center text-purple-600">
                Fashion Fuming Gallery
              </h1>
            </header>

            <main className="container mx-auto px-4">
              <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/events" element={<Events />} />
              </Routes>

              <Gallery />
              <About />
            </main>

            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
