import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PostList from '../components/PostList';
import { API, ENDPOINTS } from '../utils/api';
import Header from '../components/Header';
import SortFilter from '../components/SortFilter';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('-createdAt');
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, sort, filter, search]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(ENDPOINTS.POSTS, {
        params: {
          page: currentPage,
          limit: 10,
          sort,
          category: filter,
          search,
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setIsLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearch(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Header /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <h1 className="text-3xl font-bold text-white mb-6">Latest Blog Posts</h1> */}
        <SearchBar onSearch={handleSearch} />
        <SortFilter onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full"
            />
          </div>
        ) : (
          <PostList
            posts={posts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Home;