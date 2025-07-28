// src/components/Comment.jsx
import React, { useState, useEffect } from 'react';

const Comment = ({ imageId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const toggleComments = () => setShowComments(!showComments);

  useEffect(() => {
    if (!imageId) return;

    fetch(`https://fashion-fuming.vercel.app/?imageId=${imageId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setComments(data))
      .catch(err => {
        console.error('Failed to load comments:', err);
      });
  }, [imageId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newObj = {
      imageId,
      text: newComment.trim(),
      replies: []
    };

    fetch(`https://fashion-fuming.vercel.app/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to add comment: ${res.status}`);
        return res.json();
      })
      .then(added => {
        setComments(prev => [...prev, added]);
        setNewComment('');
      })
      .catch(err => {
        console.error('Error adding comment:', err);
      });
  };

  const handleReply = (index, replyText) => {
    const target = comments[index];
    const updatedReplies = [...(target.replies || []), replyText];

    fetch(`https://fashion-fuming.vercel.app/${target.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ replies: updatedReplies })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to update reply: ${res.status}`);
        return res.json();
      })
      .then(updatedComment => {
        const updatedList = [...comments];
        updatedList[index] = updatedComment;
        setComments(updatedList);
      })
      .catch(err => console.error('Failed to save reply:', err));
  };

  return (
    <div className="mt-2">
      <button onClick={toggleComments} className="icon-button comment-button">
        💬 Comment
      </button>

      {showComments && (
        <div className="comment-box">
          <h4 className="comment-title">Comments</h4>

          {comments.length === 0 && <p>No comments yet.</p>}

          {comments.map((comment, i) => (
            <div key={comment.id || i} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              {(comment.replies || []).map((reply, rIndex) => (
                <p key={rIndex} className="comment-reply">↪ {reply}</p>
              ))}
              <ReplyInput onReply={(text) => handleReply(i, text)} />
            </div>
          ))}

          <div className="comment-input-row">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button onClick={handleAddComment} className="comment-post-button">
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
    <div className="reply-container">
      {!showInput ? (
        <button onClick={() => setShowInput(true)} className="reply-button">Reply</button>
      ) : (
        <div className="reply-input-group">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="reply-input"
          />
          <button onClick={submitReply} className="reply-send-button">Send</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
