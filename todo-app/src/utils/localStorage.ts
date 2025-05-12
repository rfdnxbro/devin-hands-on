import { Todo } from '../types/todo';

const TODO_STORAGE_KEY = 'todos';

export const saveTodos = (todos: Todo[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }
};

export const loadTodos = (): Todo[] => {
  if (typeof window !== 'undefined') {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos);
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
      }
    }
  }
  return [];
};
