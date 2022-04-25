import React, { useState } from 'react'

function AddTodo({ addTodo }) {
  const [title, setTitle] = useState('')
  const handleSubmit = (e) => {
    const id = Math.floor(Math.random() * 100)

    addTodo({ id, title })

    setTitle('')
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} >
      <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='type your plan here...' />
    </form>
  )
}

export default AddTodo