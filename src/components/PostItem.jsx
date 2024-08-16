import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMessageCircle, FiTag } from 'react-icons/fi';

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

const PostItem = ({ post }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <FiTag className="text-indigo-400" />
          <span className="text-sm text-indigo-400">{post.category}</span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-white">{post.title}</h2>
        <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <UserAvatar name={post.author.name} />
            <span className="text-sm text-gray-300">{post.author.name}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <FiMessageCircle className="mr-1" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>
        <Link 
          to={`/posts/${post._id}`} 
          className="inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostItem;