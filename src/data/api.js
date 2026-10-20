import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL
});

// Add token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle expired/invalid token
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            error.response?.status === 403 &&
            error.response?.data?.message === "Invalid or expired token"
        ) {
            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
