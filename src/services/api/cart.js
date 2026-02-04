import apiClient from "../client";

export const cartApi = {
  addToCart: () => apiClient.post("/cart/add"),
  getCart: () => apiClient.get("/cart"),
  getCartSummary: () => apiClient.get("/cart/summary"),
  removeFromCart: () => apiClient.delete("/cart/remove"),
  updateCartQuantity: () => apiClient.put("/cart/update-quantity"),
  applyCoupon: () => apiClient.post("/cart/apply-coupon"),
  applyRefCode: () => apiClient.post("/cart/apply-referral-code"),
};
