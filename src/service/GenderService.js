import axios from "./axios";

export default {
  display() {
    return axios.API().get("gender/");
  },
};
