import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // new state for role
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password, role }), // role bhi bhej rahe
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during registration");
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} /> {/* Role input */}
      <Button text="Register" onClick={handleRegister} />
    </div>
  );
}

export default Register;
