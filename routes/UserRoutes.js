import api from '../services/api'


export function createUser(payload) {
    api.post('/users', payload)
        .then(function (response) {
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function getUser(user_id) {
    const userUrl = `/users/${user_id}`

    api.get(userUrl, payload)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function updateUser(payload, user_id) {
    const headers = {
        headers: {
            user_id: user_id
        }
    };

    api.put('/users', payload, headers)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function deleteUser(payload, user_id) {
    const headers = {
        headers: {
            user_id: user_id
        }
    };

    api.delete('/users', payload, headers)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

