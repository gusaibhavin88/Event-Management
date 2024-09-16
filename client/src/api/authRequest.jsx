import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

const baseURL = `${apiUrl}/api/v1/`;

const api = axios.create({
  baseURL,
});

export const logInUser = (formData) => api.post("/auth/login", formData);
export const registerUser = (formData, config) =>
  api.post("/auth/signup", formData, config);
