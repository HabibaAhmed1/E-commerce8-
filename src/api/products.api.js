import api from "./axios";

export const getAllProducts = (params) =>
  api.get("/products", { params });

export const searchProducts = (params) =>
  api.get("/products/search", { params });

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const createProduct = (productData) =>
  api.post("/products", productData);

export const updateProduct = (id, productData) =>
  api.patch(`/products/update/${id}`, productData);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);