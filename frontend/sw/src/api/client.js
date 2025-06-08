// src/api/client.js
export async function apiRequest(url, options = {}) {
    try {
        console.log(`[API] Request to ${url}`, options);
        const response = await fetch(url, options);
        const text = await response.text();
        console.log(`[API] Response from ${url}`, response.status, text);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} - ${text}`);
        }

        try {
            return JSON.parse(text);
        } catch {
            return text;
        }

    } catch (error) {
        console.error(`[API] Error: ${error.message}`);
        throw error;
    }
}
