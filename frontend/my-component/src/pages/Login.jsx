import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <Button text="Login" onClick={handleLogin} />
    </div>
  );
}

export default Login;
