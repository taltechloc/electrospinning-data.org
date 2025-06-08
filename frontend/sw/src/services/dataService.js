// src/services/dataService.js
import { apiRequest } from '../api/client';
import { endpoints } from '../api/endpoints';

export function sendDataToBackend(payload) {
    return apiRequest(endpoints.submitData, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
}
