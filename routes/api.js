import Fetch from './fetch.js'

const fetchInstance = new Fetch();

const api = fetchInstance.create({
    baseURL: 'http://192.168.18.191:1337/api',
    headers: { 'User-Agent': 'AluroniAdmin' }
});

export default api;