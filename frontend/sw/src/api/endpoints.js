// src/api/endpoints.js

const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/api'
        : '/api';

export const endpoints = {
    submitData: `${BASE_URL}/data/submit`,
    pendingSubmissions: `${BASE_URL}/moderation/pending_submissions`,
    moderation: (id, action) => `${BASE_URL}/moderation/${id}/${action}`,
    downloadExcel: `${BASE_URL}/cache/download/excel`,
    AllDatasetJson: `${BASE_URL}/cache/download/json`,
    AdminLogin: `${BASE_URL}/admin/login`,
    ListContributors: `${BASE_URL}/contributors/list`,
    RefreshContributorsCache: `${BASE_URL}/contributors/cache/refresh`,
    RefreshDatasetCache: `${BASE_URL}/export/cache/refresh-cache`,
    SubmitFeedback: `${BASE_URL}/feedback/submit`,
    GetAllFeedback: `${BASE_URL}/feedback/all`,
};
