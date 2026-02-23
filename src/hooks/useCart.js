import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../services/api/cart";

export const useAddToCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.addToCart,
  });
};
