import { createApp } from "vue";
import App from "./App.vue";
import SideBarApp from "./SideBarApp.vue";
import TopBarApp from "./TopBarApp.vue";
import router from "./router";
import store from "./store";

import "animate.css";
import "@mdi/font/css/materialdesignicons.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/assets/css/main.css";

createApp(App).use(store).use(router).mount("#app");
createApp(SideBarApp).use(store).use(router).mount("#sidebar");
createApp(TopBarApp).use(store).use(router).mount("#topbar");
