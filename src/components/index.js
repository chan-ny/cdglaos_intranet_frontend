import Navigation from "./layout/navigationComponent.vue";
import FormatPassword from "./dialogs/formatPassword.vue";
import Cancel from "./btn/btnCancel.vue";
import Toolbar from "./layout/toolbar.vue";
import Add from "./btn/btnAdd.vue";
import Pagination from "./layout/pagination.vue";

function RednderComponent(App) {
  App.component("Navigation-Drawer", Navigation);
  App.component("FormatPassword", FormatPassword);
  App.component("Cancel", Cancel);
  App.component("Toolbar", Toolbar);
  App.component("btnAdd", Add);
  App.component("pagination", Pagination);
}

export { RednderComponent };
