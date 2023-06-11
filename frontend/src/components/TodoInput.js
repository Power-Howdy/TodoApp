import { StyledTodoInput } from "./styled/TodoInput.styled";

export default function TodoInput({ newTodoInput, handleAddTodo }) {
  return (
    <StyledTodoInput>
        <input className="todo-input" ref={newTodoInput} type="text" placeholder="Create a new todo..." />
        <button className="todo-submit" onClick={handleAddTodo}>+</button>
    </StyledTodoInput>
  )
}
