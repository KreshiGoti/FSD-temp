import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(form.username, JSON.stringify(form));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Sign Up</h2>
      <input className="input" required placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className="input" required placeholder="Password" type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="input" onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn mt-4">Register</button>
    </form>
  );
};

export default Signup;
