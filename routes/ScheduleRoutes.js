import api from './api.js';

export function createSchedule(payload) {
    api.post('/schedule', payload)
        .then(function (response) {
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function getSchedule(start_date, end_date) {
    const headers = {
        headers: {
            start_date: start_date,
            end_date: end_date
        }
    };

    api.get('/schedule', headers)
};

export function updateSchedule(payload, start_date, end_date) {
    const headers = {
        headers: {
            start_date: start_date,
            end_date: end_date
        }
    };

    api.put('/schedule', payload, headers)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};

export function deleteRegister(date) {
    const params = {
        params: {
            date: date
        }
    };

    api.delete('/schedule', params)
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            return error;
        });
};
