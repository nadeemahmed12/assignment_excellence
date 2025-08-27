import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchTodos(){
      const res = await fetch("http://localhost:3000/api/todos", {
        headers:{ "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setTodos(data);
    }
    fetchTodos();
  },[]);

  async function handleDelete(id){
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method:"DELETE",
      headers:{ "Authorization": `Bearer ${token}` }
    });
    setTodos(todos.filter(t=>t._id!==id));
  }

  return (
    <div className="container">
      <h2>Welcome {user.name} ({user.role})</h2>
      <button onClick={()=>navigate("/add-todo")}>Add Todo</button>
      {user.role==="admin" && <button onClick={()=>navigate("/admin")}>Admin Dashboard</button>}
      <div className="todo-list">
        {todos.map(t=>(
          <TodoCard key={t._id} todo={t} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
