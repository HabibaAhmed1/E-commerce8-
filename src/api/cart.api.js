
import api from "./axios";

// Get My Cart
export const getMyCart = () => {
  return api.get("/carts");
};

// Add Item to Cart
export const addCartItem = (itemData) => {
  return api.post("/carts/items", itemData);
};

// Update Item Quantity
export const updateCartItem = (itemData) => {
  return api.patch("/carts/items", itemData);
};

// Remove Item from Cart
export const removeCartItem = (productId) => {
  return api.delete(`/carts/items/${productId}`);
};

// Apply Coupon
export const applyCoupon = (couponData) => {
  return api.post("/carts/coupon", couponData);
};

// Remove Coupon
export const removeCoupon = () => {
  return api.delete("/carts/coupon");
};

// Clear Cart
export const clearCart = () => {
  return api.delete("/carts/clear");
};
