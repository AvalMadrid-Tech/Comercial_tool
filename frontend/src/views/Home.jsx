import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function Home() {
  const user = getCurrentUser();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido a la App</h1>

      {user ? (
        <p>Estás logueado ✅</p>
      ) : (
        <div>
          <p>No has iniciado sesión</p>
          <Link to="/login">
            <button style={{ padding: "8px 16px", marginTop: "10px" }}>
              Ir a Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
