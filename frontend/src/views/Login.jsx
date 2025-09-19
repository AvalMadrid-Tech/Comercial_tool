import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // 👈 importar Link

function Login() {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 inicializar

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", formData);

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          token: res.data.token,
          usuario: res.data.usuario,
        })
      );

      setMessage("Login exitoso ✅");
      navigate("/alta"); // redirige
    } catch (err) {
      setMessage(err.response?.data?.error || "Error en el login ❌");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>

      {/* 👇 aquí el link correcto */}
      <div style={{ marginTop: "10px" }}>
        <p>
          ¿No tienes cuenta?{" "}
          <Link to="/register">Registrate</Link>
        </p>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
