import axiosClient from "./axiosClient";

const merchantsService = {
  getAll: () => axiosClient.get("/merchants"),
  getById: (id) => axiosClient.get(`/merchants/${id}`),
  create: (data) => axiosClient.post("/merchants", data),
  update: (id, data) => axiosClient.put(`/merchants/${id}`, data),
  remove: (id) => axiosClient.delete(`/merchants/${id}`)
};

export default merchantsService;
