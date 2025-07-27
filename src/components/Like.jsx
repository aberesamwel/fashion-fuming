// src/components/Like.jsx
import React, { useState } from 'react';
import './Like.css'; 
import { FaHeart } from 'react-icons/fa'; 

const Like = ({ imageId, initialLikes = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const toggleLike = () => {
    if (liked) {
      setLikesCount(prev => Math.max(prev - 1, 0));
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <button
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={toggleLike}
      title={liked ? 'Unlike' : 'Like'}
    >
      <FaHeart className={`heart-icon ${liked ? 'liked' : ''}`} />
      <span className="like-count">{likesCount}</span>
    </button>
  );
};

export default Like;
