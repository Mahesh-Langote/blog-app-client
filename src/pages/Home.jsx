import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiEdit, FiAlertCircle } from 'react-icons/fi';
import PostList from '../components/PostList';
import { API, ENDPOINTS } from '../utils/api';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import SortFilter from '../components/SortFilter';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('-createdAt');
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, sort, filter, search]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setNoResults(false);
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
      if (response.data.posts.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setNoResults(true);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Publish your passions, your way
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Create a unique and beautiful blog easily.
          </p>
          <Link to="/new-post">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center mx-auto"
            >
              <FiEdit className="mr-2" />
              Create your blog
            </motion.button>
          </Link>
        </motion.div>

        <SearchBar onSearch={handleSearch} />
        <SortFilter onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : noResults ? (
          <NoResultsMessage search={search} />
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
    <motion.form
      onSubmit={handleSubmit}
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="bg-gray-900 relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-12 pr-20 py-3 bg-gray-800 text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 text-lg"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out text-lg font-semibold"
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full"
    />
  </div>
);

const NoResultsMessage = ({ search }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center py-16"
  >
    <FiAlertCircle className="text-6xl text-indigo-500 mb-4 mx-auto" />
    <h2 className="text-2xl font-semibold text-white mb-2">No results found</h2>
    <p className="text-gray-400 mb-4">
      {search ? `We couldn't find any posts matching "${search}".` : "There are no posts available at the moment."}
    </p>
    <p className="text-gray-400">
      Try adjusting your search or filters, or check back later for new content.
    </p>
  </motion.div>
);

export default Home;