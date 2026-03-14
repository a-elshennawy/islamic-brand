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
    const { data, message } = await apiClient.post(
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
    Toastify({
      text: message,
      className: "toast-success",
      duration: 2000,
      gravity: "top",
      position: "center",
    }).showToast();
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding product to wishlist.",
    );
  }
};

export const getWishlist = async () => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }

    const response = await apiClient.get("/wishlist", {
      headers,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching wishlist.",
    );
  }
};

export const getReviews = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}/reviews`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching product reviews.",
    );
  }
};

export const addReview = async (id, rating, review) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }

    const response = await apiClient.post(
      "/products/reviews",
      {
        product_id: id,
        rating: rating,
        review: review,
      },
      {
        headers,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateReview = async (id, rating, review) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }

    const response = await apiClient.put(
      `/products/reviews/${id}`,
      {
        rating: rating,
        review: review,
      },
      {
        headers,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }

    const response = await apiClient.delete(`/products/reviews/${id}`, {
      headers,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
