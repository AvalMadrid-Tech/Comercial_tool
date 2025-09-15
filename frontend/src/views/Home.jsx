import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Selecciona</h2>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{ marginRight: "10px", padding: "10px 20px" }}
          onClick={() => navigate("/sociedad")}
        >
          Sociedad
        </button>

        <button
          style={{ padding: "10px 20px" }}
          onClick={() => navigate("/autonomos")}
        >
          Autonomo
        </button>
      </div>
    </div>
  );
}

export default Home;
