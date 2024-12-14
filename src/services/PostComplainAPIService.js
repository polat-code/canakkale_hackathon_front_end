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

export const complainPost = async (complain) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      window.location.assign("/");
    }

    const complainResponse = await api().post(
      `/post-complain/complain`,
      complain,
      {
        headers,
      }
    );

    if (complainResponse.data.statusCode === 200) {
      return complainResponse.data;
    } else if (complainResponse.data.statusCode === 498) {
      // Expired JWT
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
          let likeResponseAfterRefresh = await api().post(
            `/post-complain/complain`,
            complain,
            {
              Authorization: `Bearer ${refreshTokenresponse.data.accessToken}`,
            }
          );
          return likeResponseAfterRefresh.data;
        } else if (refreshTokenresponse.data.statusCode === 411) {
          // Invalid Refresh Token
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.assign("/");
        } else if (refreshTokenresponse.data.statusCode === 404) {
          console.log("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (complainResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.assign("/");
    }
  } catch (err) {
    console.log("Post Permission Error");
  }
};
