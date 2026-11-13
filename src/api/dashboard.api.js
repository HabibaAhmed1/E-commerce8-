import api from "./axios";

export const getDashboardStats = () =>
  api.get("/orders/admin/dashboard");

export const getAllOrders = () =>
  api.get("/orders/admin");