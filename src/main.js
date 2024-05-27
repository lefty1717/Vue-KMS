import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// primevue
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
// firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./_firebase/firebase_setting";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
  ripple: true,
  inputStyle: "outlined"
});

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth()
  ]
});

app.mount("#app");
