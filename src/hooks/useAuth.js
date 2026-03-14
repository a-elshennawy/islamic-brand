import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register, login, logout } from "../services/api/auth";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { useTranslation } from "react-i18next";

export const useRegister = () => {
  const [t] = useTranslation();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      Toastify({
        text: data?.message || t("account created successfully"),
        className: "toast-success",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
      }).showToast();
      return data;
    },
    onError: (error) => {
      Toastify({
        text:
          error.response?.data?.message ||
          error.message ||
          t("registration failed"),
        className: "toast-error",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
      console.error("Register failed:", error);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const [t] = useTranslation();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartSummary"] });
      Toastify({
        text: t("login successful"),
        className: "toast-success",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
    },
    onError: (error) => {
      Toastify({
        text:
          error.response?.data?.message || error.message || t("login failed"),
        className: "toast-error",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [t] = useTranslation();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      Toastify({
        text: t("logout successful"),
        className: "toast-success",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
      navigate("/auth");
    },
    onError: (error) => {
      Toastify({
        text:
          error.response?.data?.message || error.message || t("logout failed"),
        className: "toast-error",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
      console.error("Logout failed:", error);
    },
  });
};
