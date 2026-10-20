import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Career Intelligence Platform</h1>

      <h2>Dashboard</h2>

      <p>Welcome, {user?.name}</p>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}