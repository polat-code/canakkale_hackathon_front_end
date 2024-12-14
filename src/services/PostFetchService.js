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

export const getPosts = async (pageNo, pageSize) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    let postResponse = await api().get(`/post/all/${pageNo}/${pageSize}`, {
      headers,
    });

    //JSON.parse(postResponse);
    //console.log("postResponse in postfetchservice : " + postResponse);
    //console.log("postResponse in postfetchservice : " + JSON.stringify(postResponse.data));

    if (postResponse.data.statusCode === 200) {
      return postResponse.data;
    } else if (postResponse.data.statusCode === 498) {
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
          let postResponse = await api().get(
            `/post/all/${pageNo}/${pageSize}`,
            {
              Authorization: `Bearer ${refreshTokenresponse.data.accessToken}`,
            }
          );
          return postResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 411) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          postResponse = await api().get(`/post/all/${pageNo}/${pageSize}`);
          return postResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 404) {
          console.log("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (postResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      postResponse = await api().get(`/post/all/${pageNo}/${pageSize}`);
      return postResponse.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (post) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      window.location.assign("/");
    }

    const postResponse = await api().post("/post/create", post, {
      headers,
    });

    if (
      postResponse.data.statusCode === 200 ||
      postResponse.data.statusCode === 451
    ) {
      return postResponse.data;
    } else if (postResponse.data.statusCode === 498) {
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
          let permissionResponse = await api().post("/post/create", post, {
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
    } else if (postResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.assign("/");
    }
  } catch (err) {
    console.log("Create Post Error");
  }
};

export const getPostPermission = async () => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      window.location.assign("/");
    }

    const permissionResponse = await api().get("/post/permission", {
      headers,
    });

    if (
      permissionResponse.data.statusCode === 200 ||
      permissionResponse.data.statusCode === 451
    ) {
      return permissionResponse.data;
    } else if (permissionResponse.data.statusCode === 498) {
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
          let permissionResponse = await api().get(`/post/permission`, {
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
    } else if (permissionResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.assign("/");
    }
  } catch (err) {
    console.log("Post Permission Error");
  }
};

export const likePostAPI = async (postId) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      window.location.assign("/");
    }

    const likeResponse = await api().post(
      `/post/like/${postId}`,
      {},
      {
        headers,
      }
    );

    if (likeResponse.data.statusCode === 200) {
      return likeResponse.data;
    } else if (likeResponse.data.statusCode === 498) {
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
            `/post/like/${postId}`,
            {},
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
    } else if (likeResponse.data.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.assign("/");
    }
  } catch (err) {
    console.log("Post Permission Error");
  }
};

export const getPostDetailAPI = async (postId) => {
  try {
    const accessToken = Cookies.get("access_token");
    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    let postResponse = await api().get(`/post/post-detail/${postId}`, {
      headers,
    });

    //JSON.parse(postResponse);
    //console.log("postResponse in postfetchservice : " + postResponse);
    //console.log("postResponse in postfetchservice : " + JSON.stringify(postResponse.data));
    const postResponseData = postResponse.data;

    if (postResponseData.statusCode === 200) {
      return postResponse.data;
    } else if (postResponseData.statusCode === 498) {
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
          let postResponse = await api().get(`/post/post-detail/${postId}`, {
            Authorization: `Bearer ${refreshTokenresponse.data.accessToken}`,
          });
          return postResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 411) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          postResponse = await api().get(`/post/post-detail/${postId}`);
          return postResponse.data;
        } else if (refreshTokenresponse.data.statusCode === 404) {
          console.log("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (postResponseData.statusCode === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      postResponse = await api().get(`/post/post-detail/${postId}`);
      return postResponse.data;
    } else if (postResponseData.statusCode === 404) {
      window.location.assign("/error?message=Post Bulunamadı!");
    }
  } catch (err) {
    console.log(err);
  }
};
