import api from './api.js';


export function createRegister(payload, user_id) {
    const headers = {
        user_id: user_id
    };

    return api.post('/register', payload, headers);
};

export function getRegister(date) {

    const params = {
        date: date
    };
    return api.get('/register', {}, params);
};

export function getRegisterById(register_id) {

    const registerUrl = `/register/${register_id}`;

    return api.get(registerUrl);
};

export function updateRegister(payload, register_id) {

    const registerUrl = `/register/${register_id}`

    return api.put(registerUrl, payload);
};

export function updateRegisterStatus(payload, register_id) {

    const registerUrl = `/register/${register_id}/status`;

    return api.put(registerUrl, payload);
};

export function deleteRegister(register_id) {

    const registerUrl = `/register/${register_id}`;

    return api.delete(registerUrl);
};
