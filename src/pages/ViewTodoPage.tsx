import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TodoType } from '@/types';
import { useFormatDate } from '@/hooks/useTranslation';
import { priorityColors } from '@/utils/todoUtils';
import { useTranslation } from 'react-i18next';

interface ViewTodoPageProps {
  todos: TodoType[];
  onDelete: (id: string) => void;
}

const priorityIcons = {
  high: (
    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
      />
    </svg>
  ),
  medium: (
    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  ),
  low: (
    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  ),
};

const ViewTodoPage = ({ todos, onDelete }: ViewTodoPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatDate } = useFormatDate();
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return (
      <motion.div 
        animate={{ x: [0, -10, 10, -10, 10, 0] }}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 }
        }}
        className="text-center py-12"
      >
        <h1 className="md:text-2xl text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          {t('todo.notFound')}
        </h1>
        <Link 
          to="/"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          {t('todo.backToHome')}
        </Link>
      </motion.div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(t('todo.actions.deleteConfirm'))) {
      onDelete(todo.id);
      navigate('/');
    }
  };

  const dueDate = new Date(todo.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
              {t('layout.home')}
            </Link>
          </li>
          <li>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="text-gray-700 dark:text-gray-300">{todo?.title}</li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="md:text-2xl text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {todo.title}
            </h1>
            <div className={`flex items-center gap-x-2 px-3 py-1 rounded-md text-sm font-medium ${priorityColors[todo.priority]}`}>
              {priorityIcons[todo.priority as keyof typeof priorityIcons]}
              {t(`todo.priorities.${todo.priority}`)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="space-y-6">
            {/* Due Date */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('todo.dueDate')}
              </h2>
              <p className={`text-lg ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                {formatDate(dueDate)}
                {isOverdue && (
                  <span className="ml-2 text-sm text-red-600 dark:text-red-400">
                    ({t('todo.overdue')})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex md:flex-row flex-col md:gap-x-2 gap-y-2 md:justify-end justify-center px-6 py-4 bg-gray-50 dark:bg-gray-700">
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 text-center
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('todo.backToHome')}
          </Link>
          <Link
            to={`/edit/${todo.id}`}
            className="px-4 py-2 rounded-md text-white bg-indigo-600 text-center
                     hover:bg-indigo-700 transition-colors"
          >
            {t('todo.actions.edit')}
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-white bg-red-600 
                     hover:bg-red-700 transition-colors"
          >
            {t('todo.actions.delete')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewTodoPage;