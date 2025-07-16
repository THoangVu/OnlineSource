import React from 'react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex justify-center mt-6 items-center space-x-2">
      {/* Prev */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded border ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        « Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={`px-3 py-2 rounded border ${
            currentPage === index + 1
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded border ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        Next »
      </button>
    </div>
  )
}

export default Pagination
