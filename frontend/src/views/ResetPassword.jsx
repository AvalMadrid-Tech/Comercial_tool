import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [formData, setFormData] = useState({
    usuario: "",
    new_password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/reset-password", formData);
      setMessage(res.data.message || "Contraseña actualizada ✅");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error al actualizar ❌");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Resetear Contraseña</h2>
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
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
