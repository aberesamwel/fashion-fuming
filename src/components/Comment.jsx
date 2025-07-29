import React, { useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Comment = ({ imageId, userId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const toggleComments = () => setShowComments(!showComments);

  useEffect(() => {
    if (!imageId) return;

    fetch(`${API_BASE_URL}/comments?imageId=${imageId}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error('Failed to load comments:', err));

    fetch(`${API_BASE_URL}/likes?imageId=${imageId}`)
      .then(res => res.json())
      .then(data => {
        setLikes(data.count);
        setHasLiked(data.userLikes.includes(userId));
      })
      .catch(err => console.error('Failed to load likes:', err));
  }, [imageId, userId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newObj = {
      imageId,
      text: newComment.trim(),
      replies: []
    };

    fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
    })
      .then(res => res.json())
      .then(added => {
        setComments(prev => [...prev, added]);
        setNewComment('');
        setShowEmojiPicker(false);
      })
      .catch(err => console.error('Error adding comment:', err));
  };

  const handleLike = () => {
    if (hasLiked) return;

    fetch(`${API_BASE_URL}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageId, userId })
    })
      .then(res => res.json())
      .then(() => {
        setLikes(prev => prev + 1);
        setHasLiked(true);
      })
      .catch(err => console.error('Failed to like image:', err));
  };

  const handleReply = (index, replyText) => {
    const target = comments[index];
    const updatedReplies = [...(target.replies || []), replyText];

    fetch(`${API_BASE_URL}/comments/${target.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ replies: updatedReplies })
    })
      .then(res => res.json())
      .then(updatedComment => {
        const updatedList = [...comments];
        updatedList[index] = updatedComment;
        setComments(updatedList);
      })
      .catch(err => console.error('Failed to save reply:', err));
  };

  const addEmoji = (emoji) => {
    setNewComment(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 mb-4">
        <button 
          onClick={handleLike} 
          className={`icon-button ${hasLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors duration-200`}
          disabled={hasLiked}
        >
          ❤️ {likes}
        </button>
        <button onClick={toggleComments} className="icon-button comment-button">
          💬 Comment
        </button>
      </div>

      {showComments && (
        <div className="comment-box p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Comments</h4>

          {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}

          {comments.map((comment, i) => (
            <div key={comment.id || i} className="mb-4 p-3 bg-white rounded shadow-sm">
              <p className="text-base">{comment.text}</p>
              {(comment.replies || []).map((reply, rIndex) => (
                <p key={rIndex} className="ml-4 mt-2 text-sm text-gray-600">↪ {reply}</p>
              ))}
              <ReplyInput onReply={(text) => handleReply(i, text)} />
            </div>
          ))}

          <div className="flex items-center space-x-2 mt-4 relative">
            <div className="flex-grow relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full mb-2 right-0 z-10 bg-white rounded shadow-lg">
                  <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </div>
            <button 
              onClick={handleAddComment} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ReplyInput = ({ onReply }) => {
  const [reply, setReply] = useState('');
  const [showInput, setShowInput] = useState(false);

  const submitReply = () => {
    if (reply.trim()) {
      onReply(reply.trim());
      setReply('');
      setShowInput(false);
    }
  };

  return (
    <div className="mt-2">
      {!showInput ? (
        <button 
          onClick={() => setShowInput(true)} 
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Reply
        </button>
      ) : (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={submitReply} 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
