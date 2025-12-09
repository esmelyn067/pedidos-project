import axiosClient from "../../api/axiosClient";

const providerService = {
  getAll: () => axiosClient.get("/providers"),
  getById: (id) => axiosClient.get(`/providers/${id}`),
  create: (data) => axiosClient.post("/providers", data),
  update: (id, data) => axiosClient.put(`/providers/${id}`, data),
  delete: (id) => axiosClient.delete(`/providers/${id}`)
};

export default providerService;
