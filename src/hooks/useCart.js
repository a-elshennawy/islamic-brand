import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getCart,
  getCartSummary,
  removeCartItem,
} from "../services/api/cart";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, combinationId }) =>
      addToCart({ productId, combinationId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartSummary"] });
    },

    onError: (error) => {
      console.error("Add to cart error:", error);
    },
  });
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
};

export const useGetCartSummary = () => {
  return useQuery({
    queryKey: ["cartSummary"],
    queryFn: () => getCartSummary(),
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => removeCartItem(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartSummary"] });
    },

    onError: (error) => {
      console.error("Remove cart item error:", error);
    },
  });
};
