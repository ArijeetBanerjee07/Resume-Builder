import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://resume-builder-backend-7k73.onrender.com"
});

export default api;