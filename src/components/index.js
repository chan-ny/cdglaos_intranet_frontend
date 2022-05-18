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
}

export { RednderComponent };
