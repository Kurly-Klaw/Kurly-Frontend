import Fetch from './fetch.js'

const fetchInstance = new Fetch();

const api = fetchInstance.create({
    baseURL: 'http://localhost:1337/api',
    headers: { 'User-Agent': 'AluroniAdmin' }
});

export default api;