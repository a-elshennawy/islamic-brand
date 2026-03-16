import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getCart,
  getCartSummary,
  removeCartItem,
  updateItemQuantity,
} from "../services/api/cart";
import { trackMetaPixelEvent } from "../utils/MetaPixel/metaPixel";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, combinationId }) => {
      const payload = combinationId
        ? { product_id: productId, product_combination_id: combinationId }
        : { product_id: productId };

      return addToCart(payload);
    },

    onSuccess: (data, variables) => {
      const { product, quantity = 1 } = variables;

      if (product) {
        const priceValue = product?.final_price || product?.price;

        const metaEventData = {
          event_name: "AddToCart",
          content_type: "product",
          content_name: product?.name,
          content_ids: [product?.id.toString()],
          value: priceValue * quantity,
          currency: "EGP",
        };
        trackMetaPixelEvent("AddToCart", metaEventData);
        console.log("add to cart tracked", metaEventData);
      }

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

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }) => updateItemQuantity(id, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartSummary"] });
    },

    onError: (error) => {
      console.error("Update item quantity error:", error);
    },
  });
};
