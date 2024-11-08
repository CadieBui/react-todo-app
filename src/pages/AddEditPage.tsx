import TodoForm from '../components/TodoForm';
import { TodoType } from '@/types/todo.type';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AddEditPageProps {
  todos: TodoType[];
  onAdd: (data: Omit<TodoType, 'id'>) => void;
  onEdit: (data: Omit<TodoType, 'id'>, id: string) => void;
}

const AddEditPage = ({ todos, onAdd, onEdit }: AddEditPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const editingTodo = id ? todos.find(todo => todo.id === id) : null;

  const handleSubmit = (data: Omit<TodoType, 'id'>) => {
    if (editingTodo) {
      onEdit(data, editingTodo.id);
    } else {
      onAdd(data);
    }
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        {editingTodo ? t('todo.actions.edit') : t('todo.actions.add')}{t('todo.todo')}
      </h1>
      <TodoForm
        onSubmit={handleSubmit}
        initialData={editingTodo}
      />
    </div>
  );
};

export default AddEditPage;
