import axiosClient from "./axiosClient";

const invoicesService = {
  getAll: () => axiosClient.get("/invoices"),
  getById: (id) => axiosClient.get(`/invoices/${id}`),
  create: (data) => axiosClient.post("/invoices", data),
  update: (id, data) => axiosClient.put(`/invoices/${id}`, data),
  remove: (id) => axiosClient.delete(`/invoices/${id}`)
};

export default invoicesService;
