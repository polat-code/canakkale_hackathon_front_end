import Cookies from "js-cookie";
export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: 30,
    secure: false, // Not secure, only for development if HTTPS is not available
    sameSite: "lax", // Allows some cross-site usage
  });
};
