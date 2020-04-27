import React from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'

const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    { todos.map((todo, index) => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
)

export default TodoList