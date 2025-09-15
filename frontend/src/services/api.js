import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export const getHello = async () => {
  const res = await API.get("/hello");
  return res.data;
};
