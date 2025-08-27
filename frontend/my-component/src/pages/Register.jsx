import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ name,email,password })
    });

    const data = await res.json();
    if(data.success){
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <Input label="Name" value={name} onChange={(e)=>setName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <Button text="Register" onClick={handleRegister} />
    </div>
  );
}

export default Register;
