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
export const getRingLocation = async () => {
  try {
    const response = await api().get("/iyte-ring/location");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
