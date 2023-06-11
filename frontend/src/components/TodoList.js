import React from 'react';
import Todo from './Todo';


export default function TodoList({ todos, toggleTodo, classNames }) {

  return (
      <div>
        {todos.map(todo => {
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} classNames={classNames} />
        })}
      </div>
        
  )
}
