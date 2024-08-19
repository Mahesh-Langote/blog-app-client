import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiMoreHorizontal } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = <FiMoreHorizontal className="text-gray-400" />;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      pageNumbers.push(renderPageButton(1));
      if (currentPage > 3) pageNumbers.push(ellipsis);

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (currentPage < totalPages - 2) pageNumbers.push(ellipsis);
      pageNumbers.push(renderPageButton(totalPages));
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-150 ease-in-out ${
        currentPage === pageNumber
          ? 'bg-indigo-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {pageNumber}
    </button>
  );

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          <FiChevronsLeft />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          <FiChevronLeft />
        </button>

        <div className="hidden md:flex space-x-2">
          {renderPageNumbers()}
        </div>

        <div className="md:hidden relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-20 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors duration-150 ease-in-out"
          >
            Page {currentPage}
          </button>
          {showDropdown && (
            <div className="absolute top-12 left-0 w-32 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    onPageChange(page);
                    setShowDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    currentPage === page ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Page {page}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          <FiChevronRight />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          <FiChevronsRight />
        </button>
      </div>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;