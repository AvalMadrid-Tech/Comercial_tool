import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

// Registro (usuario + email + password)
export const register = async (usuario, email, password) => {
  return await axios.post(API_URL + "register", { usuario, email, password });
};

// Login (usuario + password)
export const login = async (usuario, password) => {
  const res = await axios.post(API_URL + "login", { usuario, password });

  if (res.data.token) {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        token: res.data.token,
        usuario: res.data.usuario,
      })
    );
  }

  return res.data;
};

// Obtener usuario actual desde sessionStorage
export function getCurrentUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Logout
export function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "/login"; // redirigir tras logout
}
