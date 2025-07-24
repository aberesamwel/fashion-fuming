import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import About from "./components/About/About";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Events from "./components/Events";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.guest) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>

      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4 mb-6">
          <h1 className="text-3xl font-bold text-center text-purple-600">
            Fashion Fuming Gallery
          </h1>
        </header>
        <main className="container mx-auto px-4">
          <Gallery />
          <About />
           <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
