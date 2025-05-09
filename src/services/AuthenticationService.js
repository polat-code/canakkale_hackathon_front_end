import axios from "axios";
import { baseURL } from "./ApiConstants";
import Cookies from "js-cookie";
import { setCookie } from "./CookieService";

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
    console.log(email, password);
    const response = await api().post("/auth/login", {
      email,
      password,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const isValidAccessToken = async () => {
  const accessToken = Cookies.get("access_token");
  if (!accessToken) {
    return false;
  }
  const headers = {};
  headers["Authorization"] = `Bearer ${accessToken}`;

  let validationResponse = await api().get(`/auth/validate-access-token`, {
    headers,
  });
  console.log(validationResponse);
  const statusCode = validationResponse.data.statusCode;
  if (statusCode === 200) {
    return true;
  } else {
    // Unauthorized
    Cookies.remove("access_token");
    return false;
  }
};
