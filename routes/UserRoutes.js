import api from './api.js';

export function createUser(payload) {
    return api.post('/users', payload);
}

export function getUser(user_id) {
    const userUrl = `/users/${user_id}`;

    return api.get(userUrl);
}

export function updateUser(payload, user_id) {
    const headers = {
        user_id: user_id
    };
    return api.put('/users', payload, headers);  
}

export function deleteUser(payload, user_id) {
    const headers = {
        user_id: user_id
    };

    return api.delete('/users', payload, headers);
}
