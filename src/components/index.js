import Navigation from "./layout/navigationComponent.vue";
import FormatPassword from "./dialogs/formatPassword.vue";
import Cancel from "./btn/btnCancel.vue";
import Toolbar from "./layout/toolbar.vue";
import Add from "./btn/btnAdd.vue";
import Pagination from "./layout/pagination.vue";
import Accept from "./btn/btnAccept.vue";
import Submit from "./btn/btnSubmit.vue";
import LoadLiner from "./progress/progressliner.vue";
import Speedlial from "./btnTable/speed-dialcompny.vue";
import Edit from "./btn/btnEdit.vue";
import ChangeImage from "./btnTable/changeImage.vue";
import formatDate from "./btnTable/datetime.vue";
import Loader from "./progress/loader.vue";
import SwithSatet from "./btnTable/swithState.vue";
import TextShort from "./btnTable/textShort.vue";
import PhoneNumber from "./textField/phoneNumber.vue";
import DateimeExpried from "./btnTable/datetimeExpired.vue";
import Delete from "./btnTable/delete.vue";
import Update from "./btnTable/update.vue";
import View from "./btnTable/view.vue";

function RednderComponent(App) {
  App.component("Navigation-Drawer", Navigation);
  App.component("FormatPassword", FormatPassword);
  App.component("btnCancel", Cancel);
  App.component("Toolbar", Toolbar);
  App.component("btnAdd", Add);
  App.component("pagination", Pagination);
  App.component("btnAccept", Accept);
  App.component("btnSubmit", Submit);
  App.component("progressLiner", LoadLiner);
  App.component("speedlial", Speedlial);
  App.component("btnEdit", Edit);
  App.component("changeImage", ChangeImage);
  App.component("formatDate", formatDate);
  App.component("loader", Loader);
  App.component("swithstate", SwithSatet);
  App.component("textshort", TextShort);
  App.component("fieldphoner", PhoneNumber);
  App.component("datetimeexpried", DateimeExpried);
  App.component("btndelete", Delete);
  App.component("btnupdate", Update);
  App.component("btnview", View);
}

export { RednderComponent };
