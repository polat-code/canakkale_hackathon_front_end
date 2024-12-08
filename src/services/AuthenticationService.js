import axios from "axios";
import { baseURL } from "./ApiConstants";

const api = () => {
  return axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const register = async (user) => {
  try {
    const response = await api().post("/auth/register", user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const validateEmail = async (validationData) => {
  try {
    const response = await api().post("/auth/validate-otp", validationData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email, password) => {
  try {
    const response = await api().post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
