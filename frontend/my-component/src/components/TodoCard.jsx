function TodoCard({ todo, onDelete }) {
  return (
    <div className="todo-card">
      <p><b>{todo.title}</b></p>
      <p>{todo.description}</p>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
}

export default TodoCard;
