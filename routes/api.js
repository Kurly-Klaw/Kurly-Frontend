import Fetch from './fetch.js'

const fetchInstance = new Fetch();

const authorization = document.cookie;
if (!authorization){
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user_type')
}
const authorizationValue = authorization.split('=')[1];
console.log(authorizationValue)
const api = fetchInstance.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'User-Agent': 'AluroniAdmin', 'user_id': localStorage.getItem('user_id'), authorization: authorizationValue }
});
export default api;