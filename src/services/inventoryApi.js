import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const inventoryApi = {
    getAll: (config) => api.get("/inventory", config),
    getById: (id, config) => api.get(`/inventory/${id}`, config),
    create: (data, config) => api.post("/register", data, config),
    updateDetails: (id, data, config) => api.put(`/inventory/${id}`, data, config),
    updatePhoto: (id, data, config) => api.put(`/inventory/${id}/photo`, data, config),
    remove: (id, config) => api.delete(`/inventory/${id}`, config),
};
