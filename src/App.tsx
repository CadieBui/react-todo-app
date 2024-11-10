import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useDarkMode } from '@hooks/useDarkMode';
import { TodoType } from '@/types';
import { config } from '@/config';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AddEditPage from '@pages/AddEditPage';
import ViewTodoPage from '@pages/ViewTodoPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.BASE_URL || '/';

  const [todos, setTodos] = useLocalStorage<TodoType[]>(config.storage.key, []);
  const [darkMode, setDarkMode] = useDarkMode();

  const handleAddTodo = (data: Omit<TodoType, 'id'>) => {
    const newTodo = {
      ...data,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (data: Omit<TodoType, 'id'>, id: string) => {
    setTodos(todos.map((todo: TodoType) => 
      todo.id === id 
        ? { ...data, id }
        : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo: TodoType) => todo.id !== id));
    toast.success(t('todo.success.delete'));
  };

  return (
    <BrowserRouter basename={baseUrl}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true}/>
      <Routes>
        <Route
          path="/" 
          element={
            <Layout 
              darkMode={darkMode} 
              onToggleDarkMode={() => setDarkMode(!darkMode)} 
            />
          }
        >
          <Route 
            index 
            element={
              <HomePage
                todos={todos}
                onDelete={handleDeleteTodo}
              />
            }
          />
          <Route 
            path="add" 
            element={
              <AddEditPage
                todos={todos}
                onAdd={handleAddTodo}
                onEdit={handleEditTodo}
              />
            }
          />
          <Route 
            path="edit/:id" 
            element={
              <AddEditPage
                todos={todos}
                onAdd={handleAddTodo}
                onEdit={handleEditTodo}
              />
            }
          />
          <Route 
            path=":id" 
            element={
              <ViewTodoPage
                todos={todos}
                onDelete={handleDeleteTodo}
              />
            }
          />
        </Route>
      </Routes>
      

    </BrowserRouter>
  );
}

export default App;
