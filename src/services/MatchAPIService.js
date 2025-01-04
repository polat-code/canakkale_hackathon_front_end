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

export const getMatches = async (
  pageNo,
  pageSize,
  filterLevel,
  filterGender,
  filterSport
) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    let matchResponse = await api().get(
      `/match/all/${pageNo}/${pageSize}/${filterSport}/${filterLevel}/${filterGender}`,
      {
        headers,
      }
    );

    //JSON.parse(postResponse);
    //console.log("postResponse in postfetchservice : " + postResponse);
    //console.log("postResponse in postfetchservice : " + JSON.stringify(postResponse.data));

    if (matchResponse.data.statusCode === 200) {
      return matchResponse.data;
    } else if (matchResponse.data.statusCode === 498) {
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

          let matchResponse = await api().get(
            `/match/all/${pageNo}/${pageSize}`,
            {
              Authorization: `Bearer ${refreshTokenresponse.data.accessToken}`,
            }
          );
          return matchResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 411) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          matchResponse = await api().get(
            `/match/all/${pageNo}/${pageSize}/${filterSport}/${filterLevel}/${filterGender}`
          );
          return matchResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 404) {
          console.log("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (matchResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      matchResponse = await api().get(`/match/all/${pageNo}/${pageSize}`);
      return matchResponse.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createMatch = async (match) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      window.location.assign("/");
    }

    const matchResponse = await api().post("/match/create", match, {
      headers,
    });

    if (
      matchResponse.data.statusCode === 200 ||
      matchResponse.data.statusCode === 451
    ) {
      return matchResponse.data;
    } else if (matchResponse.data.statusCode === 498) {
      // Expired JWT
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

          let permissionResponse = await api().post("/match/create", match, {
            Authorization: `Bearer ${refreshTokenresponse.data.accessToken}`,
          });
          return permissionResponse.data;
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
    } else if (matchResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.assign("/");
    }
  } catch (err) {
    console.log("Create Post Error");
  }
};
