import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
Vue.config.productionTip = false;
import Vant from "vant";
import "vant/lib/index.css";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(Vant);
