import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoType } from '@/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoType[];
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onDelete }: TodoListProps) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="space-y-4"
      initial={false}
      data-testid="todo-list"
    >
      <AnimatePresence mode="popLayout">
        {todos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            data-testid="no-todos"
            className="text-center text-gray-500 py-8"
          >
            {t('todo.notFound')}
          </motion.div>
        ) : (
          todos.map((todo) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: { duration: 0.2 }
              }}
            >
              <TodoItem
                todo={todo}
                onDelete={onDelete}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;