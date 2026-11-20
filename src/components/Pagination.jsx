import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  itemLabel = 'items',
}) => {
  if (totalItems === 0 || totalPages <= 0) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers range
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-2 text-xs text-gray-600 dark:text-gray-300">
      {/* Items range counter */}
      <div className="font-semibold text-gray-500 dark:text-gray-400">
        Showing <span className="font-bold text-gray-900 dark:text-white">{startItem}</span>–
        <span className="font-bold text-gray-900 dark:text-white">{endItem}</span> of{' '}
        <span className="font-bold text-gray-900 dark:text-white">{totalItems}</span> {itemLabel}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          {/* Previous Button */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 border transition-all ${
              currentPage === 1
                ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Previous</span>
          </button>

          {/* Page Number Buttons */}
          <div className="flex items-center gap-1">
            {pageNumbers[0] > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onPageChange(1)}
                  className="w-8 h-8 rounded-xl font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  1
                </button>
                {pageNumbers[0] > 2 && <span className="px-1 text-gray-400">…</span>}
              </>
            )}

            {pageNumbers.map((num) => {
              const isActive = num === currentPage;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onPageChange(num)}
                  className={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all shadow-sm ${
                    isActive
                      ? 'bg-amber-500 text-gray-950 border border-amber-400 shadow-amber-500/20'
                      : 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E2026] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {num}
                </button>
              );
            })}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="px-1 text-gray-400">…</span>
                )}
                <button
                  type="button"
                  onClick={() => onPageChange(totalPages)}
                  className="w-8 h-8 rounded-xl font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 border transition-all ${
              currentPage === totalPages
                ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm'
            }`}
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
