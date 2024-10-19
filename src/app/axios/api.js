import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json',
    },
});

export const setAuthHeader = (token) => {
    if (token) {
        API.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers['Authorization'];
    }
};

export default API