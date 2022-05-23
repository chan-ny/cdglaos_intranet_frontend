import axios from "./axios";

export default {
  createCEO(value) {
    return axios.API().post("ceo/", value);
  },
  display() {
    return axios.API().get("ceo/");
  },
  changeImage(Id, value) {
    return axios.API().put("ceo/upimg/" + Id, value);
  },
  remove(Id) {
    return axios.API().delete("ceo/" + Id);
  },
  update(Id, value) {
    return axios.API().put("ceo/uptxt/" + Id, value);
  },
};
