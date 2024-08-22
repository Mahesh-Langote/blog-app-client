import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

const SearchBar = ({ onSearch, noResultsFound }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="mb-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-12 pr-32 py-3 bg-gray-800 text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 text-lg"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out text-lg font-semibold"
            style={{ height: 'calc(100% - 0.5rem)', marginTop: '0.25rem' }}
          >
            Search
          </motion.button>
        </div>
      </motion.form>

      {noResultsFound && query && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 text-center text-red-400 bg-gray-800 border border-red-500 rounded-lg p-3 max-w-2xl mx-auto"
        >
          <FiAlertCircle className="inline-block mr-2 text-xl" />
          <span>No results found for "{query}". Please try a different search term.</span>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;