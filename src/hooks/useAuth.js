import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register, login, logout } from "../services/api/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartSummary"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();

      console.log("Logout successful");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
