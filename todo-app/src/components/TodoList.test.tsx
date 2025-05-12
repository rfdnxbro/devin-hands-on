import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '@/components/TodoList';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('TodoList', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('should not allow adding empty todos', () => {
    render(<TodoList />);
    
    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeDisabled();
  });

  test('should add a new todo when text is entered and add button is clicked', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('should remove a todo when complete button is clicked', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    
    const completeButton = screen.getByTestId('complete-button');
    fireEvent.click(completeButton);
    
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });

  test('should restore todos from localStorage on mount', () => {
    // Set up localStorage with a todo
    localStorageMock.setItem('todos', JSON.stringify([{ id: '1', text: 'Saved Todo' }]));
    
    render(<TodoList />);
    
    expect(screen.getByText('Saved Todo')).toBeInTheDocument();
  });
});
