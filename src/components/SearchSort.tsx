import { useTranslation } from 'react-i18next';
import { SortOption } from '@/types/todo.type';

interface SearchSortProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  sortDirection: 'asc' | 'desc';
  onSortChange: (value: SortOption) => void;
  onSortDirectionChange: () => void;
}

const SearchSort = ({
  searchTerm,
  onSearchChange,
  sortBy,
  sortDirection,
  onSortChange,
  onSortDirectionChange
}: SearchSortProps) => {
  const { t } = useTranslation();

  const getSortIcon = () => {
    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
      </svg>
    );
  };


  return (
    <div className="flex md:flex-row flex-col md:gap-4 gap-2 mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
      {/* Search Input */}
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search.title')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex md:justify-end justify-between gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'dueDate' | 'priority' | 'title')}
          className="pr-8 pl-4 py-2 md:w-auto w-full rounded-lg border border-gray-300 dark:border-gray-600 
                   dark:bg-gray-700 dark:text-white bg-white
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="dueDate">{t('searchSort.options.dueDate')}</option>
          <option value="priority">{t('searchSort.options.priority')}</option>
          <option value="title">{t('searchSort.options.title')}</option>
        </select>

        <button
          onClick={onSortDirectionChange}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
                   bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
          aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
        >
          {getSortIcon()}
        </button>
      </div>
    </div>
  );
};

export default SearchSort;
