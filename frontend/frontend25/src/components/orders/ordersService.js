import axiosClient from "../../api/axiosClient";

const ordersService = {
  getAll: () => axiosClient.get("/orders"),
  getById: (id) => axiosClient.get(`/orders/${id}`),
  create: (data) => axiosClient.post("/orders", data),
  update: (id, data) => axiosClient.put(`/orders/${id}`, data),
  delete: (id) => axiosClient.delete(`/orders/${id}`)
};

export default ordersService;
