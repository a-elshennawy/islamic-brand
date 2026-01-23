import { useQuery } from "@tanstack/react-query";
import { generalApi } from "../services/api/general";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => generalApi.getSettings(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useSliders = () => {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: () => generalApi.getSliders(),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => generalApi.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useChooseUs = () => {
  return useQuery({
    queryKey: ["choose-us"],
    queryFn: () => generalApi.getChooseUs(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useReviews = (limit) => {
  return useQuery({
    queryKey: ["reviews", limit],
    queryFn: () => generalApi.getReviews(),
    staleTime: 10 * 60 * 1000,
  });
};
