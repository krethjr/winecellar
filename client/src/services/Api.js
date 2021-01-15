import axios from "axios";
import store from "@/store";
import config from "@/config/config";

export default () => {
  return axios.create({
    baseURL: config.backendURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${store.state.token}`
    }
  });
};
