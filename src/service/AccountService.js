import axios from "./axios";

export default {
  display(value) {
    return axios.API().get("company", value);
  },
  create(value) {
    return axios.API().post("company/", value);
  },
  update(value) {
    return axios.API().put("company/" + value.cpn_Id, value);
  },
  delete(Id) {
    return axios.API().delete("company/" + Id);
  },
  changeIMG(Id, state) {
    return axios.API().put("company/upimg/" + Id, state);
  },
  swithState(Id, value) {
    return axios.API().put("company/dis/" + Id, value);
  },
  renew(value) {
    return axios.API().put("company/renew/" + value.Id, value);
  },
};
