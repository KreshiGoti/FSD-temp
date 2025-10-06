import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserToStorage } from "../utils/auth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem(form.username);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.password === form.password) {
        saveUserToStorage(parsed, form.remember);
        navigate("/dashboard");
      } else {
        alert("Wrong credentials");
      }
    } else {
      alert("User not found");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="input" required placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className="input" required placeholder="Password" type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <label className="block mt-2">
        <input type="checkbox" onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
        Remember Me
      </label>
      <button className="btn mt-4">Login</button>
    </form>
  );
};

export default Login;
