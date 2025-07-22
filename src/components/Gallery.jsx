import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('fashion');
  const [loading, setLoading] = useState(true);

  const API_KEY = 'dCGsKHuqgMf7JB0yEolUIJrFRb80ZEL4KoTMdgrilY1yx8K9ZMd2CQ4i'; // Replace with your actual Pexels API key

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.pexels.com/v1/search?query=${category}&per_page=12`, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setImages(data.photos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching fashion images:', error);
        setLoading(false);
      });
  }, [category]);

  const handleLike = (id) => {
    setImages(images.map(img => img.id === id ? { ...img, likes: (img.likes || 0) + 1 } : img));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Fashion Trends - {category.charAt(0).toUpperCase() + category.slice(1)}</h2>

      <div className="mb-4">
        <label className="mr-2">Category:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="fashion">Fashion</option>
          <option value="streetwear">Streetwear</option>
          <option value="runway">Runway</option>
          <option value="vintage">Vintage</option>
          <option value="style">Style</option>
        </select>
      </div>

      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map(image => (
            <div key={image.id} className="border p-2 rounded shadow">
              <img
                src={image.src.medium}
                alt={image.alt || 'Fashion image'}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2 flex justify-between items-center">
                <button
                  onClick={() => handleLike(image.id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  ❤️ {image.likes || 0} Like{(image.likes || 0) !== 1 ? 's' : ''}
                </button>
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-500 hover:underline"
                >
                  View on Pexels
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
