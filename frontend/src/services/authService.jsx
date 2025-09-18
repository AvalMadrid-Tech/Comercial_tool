import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const register = async (email, password) => {
  return await axios.post(API_URL + "register", { email, password });
};

export const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", { email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
