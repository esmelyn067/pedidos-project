import axiosClient from "../../api/axiosClient";

const almacenesService = {
  getAll: () => axiosClient.get("/almacenes"),
  getById: (id) => axiosClient.get(`/almacenes/${id}`),
  create: (data) => axiosClient.post("/almacenes", data),
  update: (id, data) => axiosClient.put(`/almacenes/${id}`, data),
  delete: (id) => axiosClient.delete(`/almacenes/${id}`)
};

export default almacenesService;
