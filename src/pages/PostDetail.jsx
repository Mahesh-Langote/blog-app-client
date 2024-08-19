import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiTag, FiMessageCircle } from 'react-icons/fi';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { API, ENDPOINTS } from '../utils/api';
import { isAuthenticated } from '../utils/auth';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

const UserAvatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
      {initials}
    </div>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await API.get(`${ENDPOINTS.POSTS}/${id}`);
      setPost(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load the post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setPost({
      ...post,
      comments: [...post.comments, newComment],
    });
    toast.success('Comment added successfully!');
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center bg-gray-900 text-white">
        <p className="text-red-400 text-xl">{error}</p>
        <button
          onClick={fetchPost}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8 text-center bg-gray-900 text-white text-xl">Post not found.</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-400 mb-4">
              <div className="flex items-center mr-4 mb-2">
                <UserAvatar name={post.author.name} />
                <Link 
                  to={`/users/${post.author._id}`} 
                  className="ml-2 hover:text-indigo-400 transition duration-300 ease-in-out"
                >
                  {post.author.name}
                </Link>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <FiCalendar className="mr-1" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center mb-2">
                <FiTag className="mr-1 text-indigo-400" />
                <span className="text-indigo-400">{post.category}</span>
              </div>
            </div>
            <div 
              className="prose prose-invert max-w-none mb-6"
              dangerouslySetInnerHTML={createMarkup(post.content)}
            />
          </div>
        </motion.article>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <FiMessageCircle className="mr-2" />
            Comments
          </h2>
          <CommentList comments={post.comments} />

          {isAuthenticated() ? (
            <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
          ) : (
            <div className="bg-gray-800 shadow-md rounded-lg p-6 mt-4">
              <p className="text-gray-300">
                Please{' '}
                <Link to="/login" className="text-indigo-400 hover:underline">
                  log in
                </Link>{' '}
                to add a comment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;