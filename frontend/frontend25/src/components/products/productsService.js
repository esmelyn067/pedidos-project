import axiosClient from "./axiosClient";

const productsService = {
  getAll: () => axiosClient.get("/products"),
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (data) => axiosClient.post("/products", data),
  update: (id, data) => axiosClient.put(`/products/${id}`, data),
  remove: (id) => axiosClient.delete(`/products/${id}`)
};

export default productsService;
