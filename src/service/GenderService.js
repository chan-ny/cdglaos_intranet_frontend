import axios from "./axios";

export default {
  display() {
    return axios.API().get("gender/");
  },
  create(value) {
    return axios.API().post("gender/", value);
  },
  update(Id, value) {
    return axios.API().put("gender/" + Id, value);
  },
  delete(Id) {
    return axios.API().delete("gender/" + Id);
  },
  disable(Id, value) {
    return axios.API().put("gender/dis/" + Id, value);
  },
};
