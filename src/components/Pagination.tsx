import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                 border border-gray-300 dark:border-gray-600 disabled:opacity-50
                 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:hover:bg-white 
                 dark:disabled:hover:bg-gray-700 transition-colors"
      >
        {t('pagination.previous')}
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors
            ${currentPage === page
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                 border border-gray-300 dark:border-gray-600 disabled:opacity-50
                 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:hover:bg-white 
                 dark:disabled:hover:bg-gray-700 transition-colors"
      >
        {t('pagination.next')}
      </button>
    </div>
  );
};

export default Pagination;