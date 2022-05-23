import axios from "./axios";

export default {
  dispaly() {
    return axios.API().get("province/");
  },
  create(value) {
    return axios.API().post("province/", value);
  },
  delete(Id) {
    return axios.API().delete("province/" + Id);
  },
  update(value) {
    return axios.API().put("province/" + value.pv_Id, value);
  },
};
