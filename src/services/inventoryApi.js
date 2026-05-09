import axios from "axios";

const api = axios.create({
    baseURL: "/inventory",
});

export const inventoryApi = {
    getById: (id, config) => api.get(`/${id}`, config),
    getAll: (config) => api.get("/", config),
    create: (data, config) => api.post("/", data, config),
    update: (id, data, config) => api.put(`/${id}`, data, config),
    updateDetails: (id, data, config) => api.put(`/${id}`, data, config),
    updatePhoto: (id, data, config) => api.put(`/${id}/photo`, data, config),
    remove: (id, config) => api.delete(`/${id}`, config),
};
