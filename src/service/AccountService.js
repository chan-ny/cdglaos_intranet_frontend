import axios from "./axios";

export default {
  display(value) {
    return axios.API().get("company", value);
  },
};
