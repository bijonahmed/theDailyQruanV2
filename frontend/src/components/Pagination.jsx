import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const pageNeighbours = 3; // Number of page neighbours on each side

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const getPages = () => {
    const totalNumbers = pageNeighbours * 2 + 3; // Total buttons (neighbours + current + edges)
    const totalBlocks = totalNumbers + 2; // With ellipsis

    if (totalPages > totalBlocks) {
      let startPage = Math.max(2, currentPage - pageNeighbours);
      let endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = ['...', ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, '...'];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = ['...', ...pages, '...'];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  // Handle next and previous page change
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPages().map((page, index) => (
        <button
          key={`page-${index}`} // Ensure this key is unique
          onClick={() => page !== '...' && handlePageChange(page)}
          className={`pagination-button ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
