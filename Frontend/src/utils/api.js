import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: `${baseURL}/api`,
});

export const imgBaseURL = baseURL;

export default api;
