import axiosClient from "./axiosClient";

const ordersService = {
  getAll: () => axiosClient.get("/orders"),
  getById: (id) => axiosClient.get(`/orders/${id}`),
  create: (data) => axiosClient.post("/orders", data),
  update: (id, data) => axiosClient.put(`/orders/${id}`, data),
  remove: (id) => axiosClient.delete(`/orders/${id}`)
};

export default ordersService;
