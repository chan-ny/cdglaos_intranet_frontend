import api from "./axios";
export default {
  login(users) {
    return api.pmAPI().post("user/login", users);
  },
};
