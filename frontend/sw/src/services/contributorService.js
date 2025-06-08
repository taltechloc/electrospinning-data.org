// services/contributorService.js
import { endpoints } from '../api/endpoints';

export const fetchContributors = async () => {
    const response = await fetch(endpoints.ListContributors);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
};
