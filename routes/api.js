import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'User-Agent': 'AluroniAdmin', 'user_id': '2a33ab75-2c91-4627-87d0-de4f4a9c697c' }
});

export default api;