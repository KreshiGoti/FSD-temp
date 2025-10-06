import { getUserFromStorage, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user on mount
  useEffect(() => {
    const userData = getUserFromStorage();
    if (!userData) {
      navigate("/login"); // If not logged in, redirect
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // Show nothing until user is loaded

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, <strong>{user.username}</strong> 👋</p>
      <p className="mt-1 text-gray-500">Role: {user.role}</p>
      <button onClick={handleLogout} className="btn mt-6">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
