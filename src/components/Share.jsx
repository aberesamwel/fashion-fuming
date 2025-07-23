// src/components/Share.jsx
import React from 'react';

const Share = ({ image }) => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(image);
      alert('Image link copied!');
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  return (
    <button onClick={handleShare} className="icon-button" title="Copy image link">
      🔗 Share
    </button>
  );
};

export default Share;

