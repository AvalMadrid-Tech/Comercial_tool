import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f5f5f5" }}>
      <Link to="/" style={{ marginRight: "15px" }}>
        Inicio
      </Link>

      {user ? (
        <button onClick={handleLogout} style={{ padding: "5px 10px" }}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ padding: "5px 10px" }}>
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
