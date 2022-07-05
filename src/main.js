import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
Vue.config.productionTip = false;
// 注册vant
import Vant from "vant";
Vue.use(Vant);
// 引入vant样式
import "vant/lib/index.less";
// 引入组件
import ToutianIcon from "@/components/ToutianIcon";
Vue.component("ToutianIcon", ToutianIcon);

// 测试接口是否有用
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});

// request({
//   method: "GET",
//   params:{}
// })
// request({
//   method: "POST",
//   data: {},
// });

import "amfe-flexible";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
