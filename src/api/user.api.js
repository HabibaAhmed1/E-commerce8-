import api from "./axios";

export const getAllUsers = () =>
  api.get("/users/all");

export const getUserById = (id) =>
  api.get(`/users/${id}`);

export const addUser = (userData) =>
  api.post("/users/add", userData);

export const updateUser = (id, userData) =>
  api.patch(`/users/${id}`, userData);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);