import { apiRequest } from "../api/client";
import { endpoints } from "../api/endpoints";

export function submitFeedback(feedback) {
    return apiRequest(endpoints.SubmitFeedback, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
    });
}

export function getAllFeedback() {
    return apiRequest(endpoints.GetAllFeedback, {
        method: 'GET',
    });
}
