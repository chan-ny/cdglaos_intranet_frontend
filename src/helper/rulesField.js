import i18n from "../i18n";

const Rules = {
  require: (v) => !!v || i18n.t("validation.require"),
  phone: (v) => (v && v.length == 13) || i18n.t("validation.phone"),
  tell: (v) => (v && v.length >= 7) || i18n.t("validation.phone"),
  number: (v) => !isNaN(v) || i18n.t("validation.number"),
  charactor: (v) => !/\d/.test(v) || i18n.t("validation.charactor"),
  space: (v) => !/\s/g.test(v) > 0 || i18n.t("validation.space"),
  specialCharactor: (v) =>
    !/[_~`@!#$%^&*()=/*+-.,:;"']/gim.test(v) ||
    i18n.t("validation.specialcharactor"),
};

export default { Rules };
