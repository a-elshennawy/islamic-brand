import { getUserId } from "../../utils/helpers";
import apiClient from "../client";
import Toastify from "toastify-js";

export const addToCart = async (payload) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      const tempUserId = getUserId();
      headers["X-Temp-User-Id"] = tempUserId;
    }

    const { data, message } = await apiClient.post("/cart/add", payload, {
      headers,
    });

    Toastify({
      text: message,
      className: "toast-success",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    return data;
  } catch (error) {
    Toastify({
      text: error,
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    throw error;
  }
};

export const getCart = async () => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      const tempUserId = getUserId();
      headers["X-Temp-User-Id"] = tempUserId;
    }

    const response = await apiClient.get("/cart", {
      headers,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCartSummary = async () => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      const tempUserId = getUserId();
      headers["X-Temp-User-Id"] = tempUserId;
    }

    const response = await apiClient.get("/cart/summary", {
      headers,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeCartItem = async (id) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      const tempUserId = getUserId();
      headers["X-Temp-User-Id"] = tempUserId;
    }

    const response = await apiClient.delete("/cart/remove", {
      headers,
      data: {
        cart_item_id: id,
      },
    });
    Toastify({
      text: response?.message || "Success!",
      className: "toast-success",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    return response;
  } catch (error) {
    Toastify({
      text: error,
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    throw error;
  }
};

export const updateItemQuantity = async (id, quantity) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      const tempUserId = getUserId();
      headers["X-Temp-User-Id"] = tempUserId;
    }

    const { data, message } = await apiClient.put(
      "/cart/update-quantity",
      {
        cart_item_id: id,
        quantity: quantity,
      },
      { headers },
    );
    Toastify({
      text: message || "Success!",
      className: "toast-success",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    return data;
  } catch (error) {
    Toastify({
      text: error.message,
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    throw error;
  }
};
