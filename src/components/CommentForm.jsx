import React, { useState, useEffect } from 'react';
import { API, ENDPOINTS } from '../utils/api';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');

  const MAX_CHARS = 500;

  useEffect(() => {
    setCharCount(content.length);
    setError(content.length > MAX_CHARS ? 'Comment exceeds 500 characters' : '');
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.length > MAX_CHARS) return;
  
    setIsSubmitting(true);
    try {
      const response = await API.post(`${ENDPOINTS.POSTS}/${postId}/comments`, { content });
      onCommentAdded(response.data);
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
          rows="3"
          placeholder="Write a comment..."
        ></textarea>
        <div className={`absolute bottom-2 right-2 text-sm ${charCount > MAX_CHARS ? 'text-red-500' : 'text-gray-400'}`}>
          {charCount}/{MAX_CHARS}
        </div>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      <button 
        type="submit" 
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out disabled:opacity-50"
        disabled={isSubmitting || charCount > MAX_CHARS}
      >
        {isSubmitting ? 'Adding Comment...' : 'Add Comment'}
      </button>
    </form>
  );
};

export default CommentForm;