import React from 'react';
import PostItem from './PostItem';
import Pagination from './Pagination';
const PostList = ({ posts, currentPage, totalPages, onPageChange }) => {
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