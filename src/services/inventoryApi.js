import axios from "axios";

const api = axios.create({
    baseURL: "/inventory",
});

export const inventoryApi = {
    getAll: (config) => api.get("/", config),
    create: (data, config) => api.post("/", data, config),
    update: (id, data, config) => api.put(`/${id}`, data, config),
    remove: (id, config) => api.delete(`/${id}`, config),
};
