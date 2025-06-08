// src/services/moderationService.js
import { apiRequest } from '../api/client';
import { endpoints } from '../api/endpoints';

export function fetchPendingExperiments() {
    return apiRequest(endpoints.pendingSubmissions);
}

export function moderateExperiment(id, action) {
    return apiRequest(endpoints.moderation(id, action), {
        method: 'POST',
    });
}
