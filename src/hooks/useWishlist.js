import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWishlist } from "../services/api/products";
import Toastify from "toastify-js";

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, combinationId }) =>
      toggleWishlist(productId, combinationId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },

    onError: (error) => {
      Toastify({
        text: error.message,
        className: "toast-error",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
    },
  });
};
