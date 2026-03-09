import { t } from "i18next";
import apiClient from "../client";
import Toastify from "toastify-js";

export const productsApi = {
  getHomeProducts: () => apiClient.get("/home/products"),

  getProducts: (params) => apiClient.get("/products", { params }),

  getProductBySlug: (slug) => apiClient.get(`/products/${slug}`),

  searchProducts: (params) => apiClient.get("/products/search", { params }),

  getRelatedProducts: (slug) => apiClient.get(`/products/${slug}/related`),
};

export const toggleWishlist = async (id, combinationId) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    Toastify({
      text: t("User is unauthenticated"),
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();

    return;
  }

  try {
    await apiClient.post(
      "/wishlist/toggle",
      {
        product_id: id,
        product_combination_id: combinationId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding product to wishlist.",
    );
  }
};
