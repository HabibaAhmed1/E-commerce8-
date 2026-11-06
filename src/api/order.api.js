import api from "./axios";

export const getAllOrders = () =>
  api.get("/orders/admin");

export const getOrderById = (id) =>
  api.get(`/orders/admin/${id}`);

export const updateOrderStatus = (id, statusData) =>
  api.patch(`/orders/admin/${id}/status`, statusData);