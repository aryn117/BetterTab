import { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

import { TiDeleteOutline } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";

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
    <div className="card w-full bg-base-200 mt-2 text-base-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Tasks</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task"
            className="input input-bordered bg-base text-base-content outline-none flex-grow"
          />
          <button type="submit" className="btn btn-primary btn-circle shadow-lg  text-xl">


            <IoMdAdd />
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between  gap-2 mb-2">
              <span className='flex text-center'>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="checkbox mr-2 cursor-pointer bg-secondary-focus "
                />
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
                </span>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-ghost bg-error px-2 text-xl text-error-content hover:bg-error-content hover:text-error  btn-sm">
                <TiDeleteOutline />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;