import axios from "./axios";

export default {
  display() {
    return axios.API().get("district/");
  },
  create(value) {
    return axios.API().post("district/", value);
  },
  update(Id, value) {
    return axios.API().put("district/" + Id, value);
  },
  delete(Id) {
    return axios.API().delete("district/" + Id);
  },
};
