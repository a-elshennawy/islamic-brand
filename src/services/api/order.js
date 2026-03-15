import { getUserId } from "../../utils/helpers";
import apiClient from "../client";
import Toastify from "toastify-js";

export const placeOrder = async (payload) => {
  const userToken = localStorage.getItem("userToken");
  const headers = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  } else {
    const tempUserId = getUserId();
    headers["X-Temp-User-Id"] = tempUserId;
  }

  try {
    const response = await apiClient.post("/orders", payload, {
      headers,
    });
    Toastify({
      text: response.message,
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

export const getOrderDetails = async (id) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};

    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    } else {
      const tempUserId = getUserId();
      headers["X-Temp-User-Id"] = tempUserId;
    }

    const response = await apiClient.get(`/orders/${id}`, { headers });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
