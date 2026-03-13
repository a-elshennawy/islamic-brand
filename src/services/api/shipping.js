import apiClient from "../client";
import { getUserId } from "../../utils/helpers";

export const getCarriers = async () => {
  try {
    const response = await apiClient.get("/shipping/carriers");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await apiClient.get("/shipping/countries");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStates = async (CountryId) => {
  try {
    const response = await apiClient.get(`/shipping/states/${CountryId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCities = async (stateId) => {
  try {
    const response = await apiClient.get(`/shipping/cities/${stateId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getShippingRates = async ({ carrierId, stateId, cityId }) => {
  const userToken = localStorage.getItem("userToken");
  const headers = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  } else {
    const tempUserId = getUserId();
    headers["X-Temp-User-Id"] = tempUserId;
  }

  try {
    const response = await apiClient.post(
      "/shipping/calculate",
      {
        carrier_id: carrierId,
        state_id: stateId,
        city_id: cityId,
      },
      {
        headers,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
