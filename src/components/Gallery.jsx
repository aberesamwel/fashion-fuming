// src/components/Gallery.jsx
import React, { useState, useEffect } from 'react';
import Like from './Like';
import Comment from './Comment';
import Share from './Share';
import Upload from './Upload';

const API_KEY = 'dCGsKHuqgMf7JB0yEolUIJrFRb80ZEL4KoTMdgrilY1yx8K9ZMd2CQ4i';
const SERVER_URL = 'http://localhost:3001';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [category, setCategory] = useState('fashion');

  // Fetch from Pexels
  useEffect(() => {
    fetch(`https://api.pexels.com/v1/search?query=${category}&per_page=12`, {
      headers: { Authorization: API_KEY },
    })
      .then((res) => res.json())
      .then((data) => setImages(data.photos))
      .catch(console.error);
  }, [category]);

  // Fetch uploaded images
  useEffect(() => {
    fetch(`${SERVER_URL}/uploads`)
      .then((res) => res.json())
      .then(setUploadedImages)
      .catch(console.error);
  }, []);

  // Upload handler
  const handleUpload = (newImage) => {
    const formatted = {
      ...newImage,
      uploaded: true,
      category: category.toLowerCase(),
      // Don’t set id manually — json-server will assign it
      src: {
        medium: newImage.src,      // preview URL passed from Upload.jsx
        original: newImage.src,
      },
    };

    fetch(`${SERVER_URL}/uploads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatted),
    })
      .then((res) => res.json())
      .then((savedImage) =>
        setUploadedImages((prev) => [...prev, savedImage])
      )
      .catch(console.error);
  };

  // ✅ Delete handler
  const handleDelete = (id) => {
    fetch(`${SERVER_URL}/uploads/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setUploadedImages((prev) => prev.filter((img) => img.id !== id));
        }
      })
      .catch(console.error);
  };

  const categoryImages = [
    ...images,
    ...uploadedImages.filter((img) => img.category === category),
  ];

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">
        Gallery: {category}
      </h1>

      <div className="category-select mb-4 flex gap-2">
        {['Fashion', 'Vintage', 'Streetwear', 'Runway', 'Style'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat.toLowerCase())}
            className={`px-4 py-1 rounded border ${
              category === cat.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'bg-white text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Upload onUpload={handleUpload} category={category} />

      <div className="image-grid grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {categoryImages.map((img) => (
          <div
            key={`${img.id}-${img.src?.medium}`}
            className="image-card bg-white p-2 rounded shadow relative"
          >
            <img
              src={img.src?.medium}
              alt={img.alt || 'Fashion Image'}
              className="w-full h-48 object-cover rounded"
            />

            {img.uploaded && (
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>
            )}

            <div className="actions flex justify-between mt-2">
              <Like imageId={img.id} />
              <Share image={img.src?.original} />
            </div>

            <div className="comment-section mt-2">
              <Comment imageId={img.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
