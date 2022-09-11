import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "animate.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/assets/css/main.css";

createApp(App).use(store).use(router).mount("#app");
