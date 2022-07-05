import Vue from "vue";
import VueRouter from "vue-router";

//路由懒加载
// 第一种
/* 1000个界面有可能第一次加载文件的时候就会很慢
用户并且一次只能看一个界面————只把用户当前访问的界面
第一次直接引入登录组件 同步加载路由(按需)

直接import('路径')路由的懒加载
访问到某一个路由的时候再去加载当前的文件
*/
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
