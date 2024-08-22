import React from 'react';
import PostItem from './PostItem';
import Pagination from './Pagination';
import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

const PostList = ({ posts, currentPage, totalPages, onPageChange }) => {
  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-8 text-center"
      >
        <FiInbox className="text-6xl text-indigo-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No posts found</h2>
        <p className="text-gray-400 mb-4">
          It seems there are no posts matching your criteria at the moment.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out text-lg font-semibold"
        >
          Refresh
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PostList;