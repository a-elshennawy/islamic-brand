import apiClient from "../client";
import Toastify from "toastify-js";

export const register = async (userData) => {
  try {
    const { data } = await apiClient.post(
      "/auth/register",
      {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        whatsapp: userData.whatsapp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    Toastify({
      text: data?.message || "Success!",
      className: "toast-success",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
    return data;
  } catch (error) {
    Toastify({
      text:
        error.response?.data?.message || error.message || "An error occurred",
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
  }
};

export const login = async (creds) => {
  try {
    const result = await apiClient.post("/auth/login", {
      phone: creds.phone,
      password: creds.password,
    });

    Toastify({
      text: "Login Successful",
      className: "toast-success",
      duration: 3000,
      gravity: "top",
      position: "center",
    }).showToast();

    return result;
  } catch (error) {
    Toastify({
      text: error.message || "Login failed",
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
    }).showToast();
    throw error;
  }
};

export const logout = async () => {
  const token = localStorage.getItem("userToken");

  try {
    const { data } = await apiClient.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    Toastify({
      text: data?.message || "Success!",
      className: "toast-success",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();

    return data;
  } catch (error) {
    Toastify({
      text:
        error.response?.data?.message || error.message || "An error occurred",
      className: "toast-error",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
    }).showToast();
  }
};

export const getGoogleAuthUrl = async () => {
  try {
    const result = await apiClient.get("/auth/google");
    return result.redirect_url;
  } catch (error) {
    console.error("Error getting Google auth URL:", error);
    throw error;
  }
};

export const getAppleAuthUrl = async () => {
  try {
    const result = await apiClient.get("/auth/apple");
    return result.redirect_url;
  } catch (error) {
    console.error("Error getting Apple auth URL:", error);
    throw error;
  }
};

// helpers
export const getCurrentUser = () => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

export const getAuthToken = () => {
  return localStorage.getItem("userToken");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  return !!(token && userId && !userId.startsWith("tempUser_id_"));
};
