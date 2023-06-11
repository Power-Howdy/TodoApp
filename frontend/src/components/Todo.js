import React from 'react'
import {StyledTodo} from './styled/Todo.styled';

export default function Todo({todo, toggleTodo, classNames}) {

    function handleToggle() {
        toggleTodo(todo.id);
    }

    const labelClasses = classNames('todo-name', {
        'complete-todo': todo.complete === true
    })

    return (
        <StyledTodo>
            <label className={labelClasses}>
                <input className="todo-checkbox" type="checkbox" checked={todo.completed} onChange={handleToggle}/>
                <span className="custom-checkbox"></span>
                {todo.content}
            </label>
        </StyledTodo>
    )
}
