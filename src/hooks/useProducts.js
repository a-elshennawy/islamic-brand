import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../services/api/products";

export const useHomeProducts = () => {
  return useQuery({
    queryKey: ["products", "home"],
    queryFn: () => productsApi.getHomeProducts(),
  });
};

export const useProducts = (params) => {
  return useQuery({
    queryKey: ["products", "list", params],
    queryFn: () => productsApi.getProducts(params),
  });
};

export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["products", "detail", slug],
    queryFn: () => productsApi.getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useSearchProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params) => productsApi.searchProducts(params),
    onSuccess: (data) => {
      queryClient.setQueryData(["products", "search"], data);
    },
  });
};
