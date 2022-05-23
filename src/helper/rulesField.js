import i18n from "../i18n";

const Rules = {
  require: (v) => !!v || i18n.t("validation.require"),
  phone: (v) => (v && v.length == 13) || i18n.t("validation.phone"),
  tell: (v) => (v && v.length >= 9) || i18n.t("validation.phone"),
  number: (v) => !isNaN(v) || i18n.t("validation.number"),
  charactor: (v) => !/\d/.test(v) || i18n.t("validation.charactor"),
  space: (v) => !/\s/g.test(v) > 0 || i18n.t("validation.space"),
  specialCharactor: (v) =>
    !/[_~`@!#$%^&*()=/*+-.,:;"']/gim.test(v) ||
    i18n.t("validation.specialcharactor"),
  email: (v) => /.+@.+\..+/.test(v) || i18n.t("validate.email"),
  password: (v) => (v && v.length <= 30) || i18n.$t("validate.password"),
  english: (v) => /[a-zA-Z]/g.test(v) || i18n.t("validation.english"),
  laos: (v) => /[\u0E80-\u0EAE]/g.test(v) || i18n.t("validation.laos"),
};

export default { Rules };
