// CommentForm.js
import React, { useState } from 'react';
import { API, ENDPOINTS } from '../utils/api';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
  
    setIsSubmitting(true);
    try {
      const response = await API.post(`${ENDPOINTS.POSTS}/${postId}/comments`, { content });
      onCommentAdded(response.data);  // This now receives only the new comment
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
        rows="3"
        placeholder="Write a comment..."
      ></textarea>
      <button 
        type="submit" 
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding Comment...' : 'Add Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
