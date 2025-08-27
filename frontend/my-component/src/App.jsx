import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTodo from "./pages/AddTodo";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
