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

export const getPlaces = async () => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    let placeResponse = await api().get(`/place/all`, {
      headers,
    });

    if (placeResponse.data.statusCode === 200) {
      return placeResponse.data;
    } else if (placeResponse.data.statusCode === 498) {
      try {
        const refreshTokenresponse = await api().post("/auth/refresh-token", {
          refreshToken: Cookies.get("refresh_token"),
          accessToken: accessToken,
        });
        if (refreshTokenresponse.data.statusCode === 200) {
          setCookie(
            "access_token",
            refreshTokenresponse.data.data.access_token
          );
          setCookie(
            "refresh_token",
            refreshTokenresponse.data.data.refresh_token
          );

          let placeResponse = await api().get(`/place/all`, {
            Authorization: `Bearer ${refreshTokenresponse.data.accessToken}`,
          });
          return placeResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 411) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          placeResponse = await api().get(`/place/all`);
          return placeResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 404) {
          console.log("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (placeResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      placeResponse = await api().get(`/place/all`);
      return placeResponse.data;
    }
  } catch (err) {
    console.log(err);
  }
};
