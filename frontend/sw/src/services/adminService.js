// src/services/contributorService.js
import { apiRequest } from '../api/client';
import { endpoints } from '../api/endpoints';

export function refreshContributorsCache() {
    return apiRequest(endpoints.RefreshContributorsCache, {
        method: 'POST',
    });
}

export function refreshDatasetCache() {
    return apiRequest(endpoints.RefreshDatasetCache, {
        method: 'POST',
    });
}
