import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TodoType } from '@/types';
import { useFormatDate } from '@/hooks/useTranslation';
import { priorityColors } from '@/utils/todoUtils';

interface TodoItemProps {
  todo: TodoType;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const { t } = useTranslation();
  const { formatDate } = useFormatDate();
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      data-testid="todo-item"
      className="bg-white dark:bg-gray-700 rounded-lg shadow p-4"
    >
      <div className="space-y-2">
        {/* Title và Priority */}
        <div className="flex items-center justify-between">
          <Link 
            to={`/todo/${todo.id}`}
            data-testid="todo-title"
            className="text-lg font-medium text-gray-900 line-clamp-2 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {todo.title}
          </Link>
          <span data-testid="todo-priority" className={`px-2.5 py-1.5 rounded-md text-xs font-medium ${priorityColors[todo.priority]}`}>
          <span>{t(`todo.priorities.${todo.priority}`)}</span>
          </span>
        </div>
        
        {/* Due Date và Actions */}
        <div className="flex md:flex-row flex-col gap-y-2 items-center justify-between">
          <p data-testid="todo-due-date" className="text-sm text-gray-500 dark:text-gray-400">
            {t('todo.dueDate')}: {formatDate(new Date(todo.dueDate))}
          </p>
          
          <div className="flex md:justify-end justify-between gap-2 space-x-2">
            <Link
              to={`/${todo.id}`}
              data-testid="todo-view-item"
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t('todo.actions.view')}
            </Link>
            <Link
              to={`/edit/${todo.id}`}
              data-testid="todo-edit-item"
              className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {t('todo.actions.edit')}
            </Link>
            <button
              onClick={() => onDelete(todo.id)}
              data-testid="todo-delete-item"
              className="px-3 py-1 text-sm text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
            >
              {t('todo.actions.delete')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;