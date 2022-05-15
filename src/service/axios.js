import axios from "axios";
import store from "@/store/index";

const pmAPI = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:3100/pm/",
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
const API = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:3100/api/",
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};

export default {
  pmAPI,
  API,
};
