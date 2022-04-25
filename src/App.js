import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header'
import AddTodo from './components/AddTodo'

function App() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (todo) => {
    fetch('http://localhost:5000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(data => setTodos([data, ...todos]))
      .catch(err => console.log({ message: err.message }));
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/todo/${id}`, {
      method: 'DELETE'
    })
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.log({ message: err.message }));
  }

  const handleClick = (e) => {
    console.log(e);
  }

  useEffect(() => {
    fetch('http://localhost:5000/todo')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log({ message: err.message }));
  }, [])

  return (
    <div className="app">
      <Header />
      <AddTodo addTodo={handleAdd} />
      <ul className='todolist'>
        {todos.map((todo, index) => (
          <li key={index}>
            <label className='flex'>
              <input type='checkbox' checked={todo.completed} onChange={(e) => handleClick(e.target.checked)} />
              <span>{todo.title}</span>
            </label>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
