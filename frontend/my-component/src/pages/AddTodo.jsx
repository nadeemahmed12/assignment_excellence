import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function handleAdd(){
    const res = await fetch("http://localhost:3000/api/todos", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });

    const data = await res.json();
    if(data._id){
      navigate("/dashboard");
    } else {
      alert("Failed to add todo");
    }
  }

  return (
    <div className="container">
      <h2>Add Todo</h2>
      <Input label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <Input label="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <Button text="Add" onClick={handleAdd} />
    </div>
  );
}

export default AddTodo;
