import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-8">
      <div className="card-body">
        <h2 className="card-title">Todo List</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="input input-bordered flex-grow"
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="checkbox"
              />
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-ghost btn-xs">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;