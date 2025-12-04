import axiosClient from "./axiosClient";

const almacenesService = {
  getAll: () => axiosClient.get("/warehouses"),
  getById: (id) => axiosClient.get(`/warehouses/${id}`),
  create: (data) => axiosClient.post("/warehouses", data),
  update: (id, data) => axiosClient.put(`/warehouses/${id}`, data),
  remove: (id) => axiosClient.delete(`/warehouses/${id}`)
};

export default almacenesService;
