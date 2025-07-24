import React from "react";

const Gallery = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Gallery</h1>
      <p>Welcome to the gallery! Only logged-in users can access this page.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <img src="https://via.placeholder.com/150" alt="Gallery item" className="rounded-lg shadow-md" />
        <img src="https://via.placeholder.com/150" alt="Gallery item" className="rounded-lg shadow-md" />
        <img src="https://via.placeholder.com/150" alt="Gallery item" className="rounded-lg shadow-md" />
        <img src="https://via.placeholder.com/150" alt="Gallery item" className="rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default Gallery;
