// src/components/Comment.jsx
import React, { useState, useEffect } from 'react';

const Comment = ({ imageId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const toggleComments = () => setShowComments(!showComments);

  useEffect(() => {
    if (!imageId) return;
    fetch(`http://localhost:3001/comments?imageId=${imageId}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error('Failed to load comments:', err));
  }, [imageId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newObj = {
      imageId,
      text: newComment.trim(),
      replies: []
    };

    fetch(`http://localhost:3001/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObj)
    })
      .then(res => res.json())
      .then(added => {
        setComments(prev => [...prev, added]);
        setNewComment('');
      })
      .catch(err => console.error('Error adding comment:', err));
  };

  const handleReply = (index, replyText) => {
    const target = comments[index];
    const updatedReplies = [...(target.replies || []), replyText];

    fetch(`http://localhost:3001/comments/${target.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ replies: updatedReplies })
    })
      .then(res => res.json())
      .then(updatedComment => {
        const newComments = [...comments];
        newComments[index] = updatedComment;
        setComments(newComments);
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

          {comments.map((comment, i) => (
            <div key={comment.id || i} className="comment-item">
              <p className="comment-text">{comment.text}</p>
              {(comment.replies || []).map((reply, r) => (
                <p key={r} className="comment-reply">↪ {reply}</p>
              ))}
              <ReplyInput onReply={(replyText) => handleReply(i, replyText)} />
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
      onReply(reply);
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
