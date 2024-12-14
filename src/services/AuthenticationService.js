import axios from "axios";
import { baseURL } from "./ApiConstants";
import Cookies from "js-cookie";

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
  const statusCode = validationResponse.data.statusCode;
  if (statusCode === 200) {
    return true;
  } else if (statusCode === 401) {
    // Unauthorized
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    return false;
  } else if (statusCode === 498) {
    try {
      const refreshTokenresponse = await api().post("/auth/refresh-token", {
        refreshToken: Cookies.get("refresh_token"),
        accessToken: accessToken,
      });
      if (refreshTokenresponse.data.statusCode === 200) {
        Cookies.set(
          "access_token",
          refreshTokenresponse.data.data.access_token,
          {
            expires: 30,
            secure: true,
            sameSite: "strict",
          }
        );
        Cookies.set(
          "refresh_token",
          refreshTokenresponse.data.data.refresh_token,
          {
            expires: 30,
            secure: true,
            sameSite: "strict",
          }
        );
        return true;
      } else if (refreshTokenresponse.data.statusCode === 411) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        return false;
      } else if (refreshTokenresponse.data.statusCode === 404) {
        console.log("User not found");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};
