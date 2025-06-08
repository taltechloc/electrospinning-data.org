// src/api/endpoints.js

const BASE_URL = '/api';

export const endpoints = {
    submitData: `${BASE_URL}/data/submit`,
    pendingSubmissions: `${BASE_URL}/moderation/pending_submissions`,
    moderate: (id, action) => `${BASE_URL}/moderation/${id}/${action}`,
    downloadExcel: `${BASE_URL}/cache/download/excel`,
    AllDatasetJson: `${BASE_URL}/cache/download/json`,
    AdminLogin: `${BASE_URL}/admin/login`,
    ListContributors: `${BASE_URL}/contributors/list`
};
