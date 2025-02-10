import api from './api.js';


export function createRegister(payload, user_id) {
    const headers = {
        headers: {
            user_id: user_id
        }
    };

    api.post('/register', payload, headers)
        .then(function (response) {
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function getRegister(date) {

    const params = {
        params:{
            date: date
        }
    };

    api.get('/register', params)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function getRegisterById(register_id) {

    const registerUrl = `/register/${register_id}`

    api.get(registerUrl)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function updateRegister(payload, register_id) {

    const registerUrl = `/register/${register_id}`

    api.put(registerUrl, payload)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function updateRegisterStatus(payload, register_id) {

    const registerUrl = `/register/${register_id}/status`;

    api.put(registerUrl, payload)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function deleteRegister(register_id) {

    const registerUrl = `/register/${register_id}`;

    api.delete(registerUrl)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};
