import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { TodoType } from '@/types/todo.type';
import { getToday } from '@/utils/todoUtils';
import { SortOption } from '@/types/todo.type';

interface TodoFormProps {
  onSubmit: (data: Omit<TodoType, 'id'>) => void;
  initialData?: TodoType;
}

interface FormInputs {
  title: string;
  dueDate: string;
  priority: SortOption;
}

const TodoForm = ({ onSubmit, initialData }: TodoFormProps) => {
  const { t } = useTranslation();

  const [dueDate, setDueDate] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      dueDate: initialData?.dueDate 
      ? new Date(initialData.dueDate).toISOString().split('T')[0]
      : '',
      priority: initialData?.priority || 'medium'
    }
  });

  const onSubmitForm = (data: FormInputs) => {
    onSubmit({
      ...data,
      dueDate: new Date(data.dueDate),
    });
    toast.success(initialData ? t('todo.success.update') : t('todo.success.add'));
  };

  useEffect(() => {
    if (initialData) {
      setDueDate(new Date(initialData.dueDate).toISOString().split('T')[0]);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('todo.title')}
        </label>
        <input
          id="title"
          type="text"
          data-testid="todo-title"
          {...register('title', { required: t('todo.validation.required.title') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm"
          placeholder={t('todo.placeholder.title')}
        />
        {errors.title && (
          <p data-testid="todo-title-error" className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Due Date Input */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('todo.dueDate')}
        </label>
        <input
          id="dueDate"
          type="date"
          data-testid="todo-due-date"
          value={dueDate || ''}
          min={getToday()}
          {...register('dueDate', { 
            required: t('todo.validation.required.dueDate'),
            validate: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              return selectedDate >= today || t('todo.dueDateCannotBeInThePast');
            },
            onChange: (e) => {
              setDueDate(e.target.value);
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm"
        />
        {errors.dueDate && (
          <p data-testid="todo-due-date-error" className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
        )}
      </div>

      {/* Priority Select */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('todo.priority')}
        </label>
        <select
          id="priority"
          data-testid="todo-priority"
          {...register('priority', { required: 'Priority is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm"
        >
          <option value="high">{t('todo.priorities.high')}</option>
          <option value="medium">{t('todo.priorities.medium')}</option>
          <option value="low">{t('todo.priorities.low')}</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        data-testid="submit-button"
        className="w-full flex justify-center py-2 px-4 border border-transparent 
                   rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? t('todo.actions.update') : t('todo.actions.add')}
      </button>
    </form>
  );
};

export default TodoForm;