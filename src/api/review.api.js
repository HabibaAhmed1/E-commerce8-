import api from "./axios";

export const getProductReviews = (productId) =>
  api.get(`/products/${productId}/reviews`);

export const deleteProductReview = (productId, reviewId) =>
  api.delete(`/products/${productId}/reviews/${reviewId}`);