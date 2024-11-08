import { useState } from 'react';
import TodoList from '@components/TodoList';
import SearchSort from '@/components/SearchSort';
import { TodoType } from '@/types/todo.type';
import Pagination from '@/components/Pagination';
import { useTranslation } from 'react-i18next';
const ITEMS_PER_PAGE = 5;

interface HomePageProps {
  todos: TodoType[];
  onEdit: (todo: TodoType) => void;
  onDelete: (id: string) => void;
}

const HomePage = ({ todos, onEdit, onDelete }: HomePageProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter todos based on search
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        comparison = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
        break;
      }
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }

    return sortDirection === 'asc' ? comparison : - comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedTodos.length / ITEMS_PER_PAGE);
  const currentTodos = sortedTodos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: 'dueDate' | 'priority' | 'title') => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <SearchSort
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        onSortDirectionChange={handleSortDirectionChange}
      />
      
      <TodoList
        todos={currentTodos}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {totalPages > 1 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {t('pagination.showing')} {currentPage - 1 * ITEMS_PER_PAGE + 1} {t('pagination.to')}{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, sortedTodos.length)} {t('pagination.of')}{' '}
          {sortedTodos.length}
          </div>
      )}
    </div>
  );
};

export default HomePage;
