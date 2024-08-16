
// CommentList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiClock } from 'react-icons/fi';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-white">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
          <p className="text-gray-300">{comment.content}</p>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
            <div className="flex items-center">
              <FiUser className="mr-2 text-indigo-400" />
              <Link
                to={`/users/${comment.author._id}`}
                className="text-indigo-400 hover:underline"
              >
                {comment.author.name}
              </Link>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {new Date(comment.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;