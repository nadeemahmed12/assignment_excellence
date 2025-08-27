import { useEffect, useState } from "react";

function AdminDashboard(){
  const [users,setUsers] = useState([]);
  const [todos,setTodos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    async function fetchData(){
      const u = await fetch("http://localhost:3000/api/admin/users",{
        headers:{ "Authorization":`Bearer ${token}` }
      });
      setUsers(await u.json());

      const t = await fetch("http://localhost:3000/api/admin/todos",{
        headers:{ "Authorization":`Bearer ${token}` }
      });
      setTodos(await t.json());
    }
    fetchData();
  },[]);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map(u=><li key={u._id}>{u.name} - {u.role}</li>)}
      </ul>

      <h3>All Todos</h3>
      <ul>
        {todos.map(t=><li key={t._id}>{t.title} by {t.user?.name}</li>)}
      </ul>
    </div>
  );
}

export default AdminDashboard;
