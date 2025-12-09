import axiosClient from "../../api/axiosClient";

const invoicesService = {
  getAll: () => axiosClient.get("/invoices"),
  getById: (id) => axiosClient.get(`/invoices/${id}`),
  create: (data) => axiosClient.post("/invoices", data),
  update: (id, data) => axiosClient.put(`/invoices/${id}`, data),
  delete: (id) => axiosClient.delete(`/invoices/${id}`)
};

export default invoicesService;
