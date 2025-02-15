import api from './api.js';

export function createSchedule(payload) {
    
    return api.post('/schedule', payload);
};

export function getSchedule(start_date, end_date) {
    const headers = {
        start_date: start_date,
        end_date: end_date
    };
    return api.get('/schedule', headers)
};

export function updateSchedule(payload, start_date, end_date) {
    const headers = {
        start_date: start_date,
        end_date: end_date
    };

    return api.put('/schedule', payload, headers);
};

export function deleteRegister(date) {
    const params = {
        date: date
    };

    return api.delete('/schedule', {}, params);
};
