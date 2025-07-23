// src/components/Upload.jsx
import React, { useState, useEffect } from 'react';

const Upload = ({ onUpload, category }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !category) {
      alert('Please select a valid image and category before uploading.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      const newImage = {
        id: Date.now(),
        src: base64Image, 
        alt: file.name,
        likes: 0,
        comments: [],
        uploaded: true,
        category: category.toLowerCase(),
      };

      onUpload(newImage);

      setPreview(null);
      setFile(null);
    };

    reader.readAsDataURL(file); 
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit} className="comment-box">
      <h3 className="comment-title">Upload Image to: {category}</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="comment-input"
      />

      {preview && (
        <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              height: '160px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      )}

      <button type="submit" className="comment-post-button" disabled={!file}>
        Upload to {category}
      </button>
    </form>
  );
};

export default Upload;
