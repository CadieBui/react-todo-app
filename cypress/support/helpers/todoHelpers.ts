import { PriorityType } from '@/types';

export const generateDate = (daysToAdd: number = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + daysToAdd)
  return date.toISOString().split('T')[0]
}

export const generateTodos = (count: number = 3) => {
  return Array.from({ length: count }, (_, index) => ({
    title: `Todo ${index + 1}`,
    priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as PriorityType,
    dueDate: generateDate(count)
  }))
}