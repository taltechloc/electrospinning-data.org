// src/services/electrospinningService.js
import { endpoints } from '../api/endpoints';
import axios from "axios";

export async function downloadDatasetExcel() {
    try {
        const response = await fetch(endpoints.downloadExcel, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to download Excel: ${response.statusText}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            return await response.blob();
        } else {
            const text = await response.text();
            throw new Error(`Unexpected content: ${text}`);
        }

    } catch (error) {
        console.error(`[Download Excel] ${error.message}`);
        throw error;
    }
}

export async function fetchAllDatasetJson() {
    try {
        const response = await axios.get(endpoints.AllDatasetJson);
        return response.data || [];
    } catch (error) {
        console.error('[fetchDataset]', error);
        throw error;
    }
}