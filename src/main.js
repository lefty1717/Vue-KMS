import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// primevue
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";


import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
  ripple: true,
  inputStyle: "outlined"
});

app.mount("#app");
