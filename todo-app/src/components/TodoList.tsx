'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { saveTodos, loadTodos } from '../utils/localStorage';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  
  // Load todos from localStorage on component mount
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputText.trim()
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  // Handle form submission (for when user presses Enter)
  // Note: For Japanese IME, we need to be careful with Enter key handling
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo();
  };

  const handleCompleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">TODO アプリ</h1>
      
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
          placeholder="新しいTODOを入力"
          data-testid="todo-input"
        />
        <button
          type="button"
          onClick={handleAddTodo}
          disabled={!inputText.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-r disabled:bg-gray-300"
          data-testid="add-button"
        >
          登録
        </button>
      </form>
      
      <ul className="space-y-2" data-testid="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center p-3 border rounded">
            <span>{todo.text}</span>
            <button
              onClick={() => handleCompleteTodo(todo.id)}
              className="px-3 py-1 bg-green-500 text-white rounded"
              data-testid="complete-button"
            >
              完了
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
