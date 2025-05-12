'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { saveTodos, loadTodos } from '@/utils/localStorage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo();
  };

  const handleCompleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">TODO アプリ</h1>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          value={inputText}
          onChange={handleInputChange}
          placeholder="新しいTODOを入力"
          data-testid="todo-input"
          className="flex-grow"
        />
        <Button
          type="button"
          onClick={handleAddTodo}
          disabled={!inputText.trim()}
          data-testid="add-button"
          variant="default"
        >
          登録
        </Button>
      </form>
      
      <div className="space-y-3" data-testid="todo-list">
        {todos.map(todo => (
          <Card key={todo.id} className="shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <span className="text-base">{todo.text}</span>
              <Button
                onClick={() => handleCompleteTodo(todo.id)}
                data-testid="complete-button"
                variant="outline"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                完了
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
