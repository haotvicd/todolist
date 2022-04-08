import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header'
import AddTodo from './components/AddTodo'

function App() {
  const [todos, setTodos] = useState(() => {
    return localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'))
  })

  const handleAdd = (todo) => {
    setTodos([...todos, todo])
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  })

  return (
    <div className="app">
      <Header />
      <AddTodo addTodo={handleAdd} />
      <ul className='todolist'>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
