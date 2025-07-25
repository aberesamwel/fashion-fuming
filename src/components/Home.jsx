import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      
      <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-screen px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          FASHION FUMING
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-200">
          Explore the world of fashion trends and style.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/gallery"
            className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 shadow-lg"
          >
            View Gallery
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 bg-transparent border border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-black shadow-lg"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
