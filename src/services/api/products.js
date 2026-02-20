import apiClient from "../client";

export const productsApi = {
  getHomeProducts: () => apiClient.get("/home/products"),

  getProducts: (params) => apiClient.get("/products", { params }),

  getProductBySlug: (slug) => apiClient.get(`/products/${slug}`),

  searchProducts: (params) => apiClient.get("/products/search", { params }),

  getRelatedProducts: (slug) => apiClient.get(`/products/${slug}/related`),
};
