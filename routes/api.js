import Fetch from './fetch.js'

const fetchInstance = new Fetch();

const api = fetchInstance.create({
    baseURL: 'http://localhost:1337/api',
    headers: { 'User-Agent': 'AluroniAdmin', 'user_id': '2a33ab75-2c91-4627-87d0-de4f4a9c697c' }
});

export default api;