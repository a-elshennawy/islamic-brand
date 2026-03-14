import apiClient from "../client";

export const getUser = async () => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};
    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }
    const response = await apiClient.get("/user", { headers });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating your review.",
    );
  }
};

export const getAllOrders = async () => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = {};
    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }
    const response = await apiClient.get("/orders", { headers });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating your review.",
    );
  }
};
