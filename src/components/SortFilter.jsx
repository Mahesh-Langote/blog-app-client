import React, { useState, useEffect } from 'react';
import { API, ENDPOINTS } from '../utils/api';
import { FiChevronDown, FiFilter } from 'react-icons/fi';

const SortFilter = ({ onSortChange, onFilterChange }) => {
  const [sortOptions, setSortOptions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await API.get(ENDPOINTS.POSTS);
        setSortOptions(response.data.sortOptions);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching sort and filter options:', error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="relative flex-1">
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <FiChevronDown className="h-5 w-5" />
        </div>
      </div>
      <div className="relative flex-1">
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="appearance-none w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <FiFilter className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default SortFilter;