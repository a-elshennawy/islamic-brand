import apiClient from "../client";

export const generalApi = {
  getSettings: () => apiClient.get("/settings"),

  getSliders: () => apiClient.get("/sliders"),

  getCategories: () => apiClient.get("/categories"),

  getChooseUs: () => apiClient.get("/choose-us"),

  getReviews: () => apiClient.get("/reviews"),
};
