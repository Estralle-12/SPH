import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import routes from "@/router/routes";
import store from "@/store";
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;

// 告诉原来的push，跳转的目标位置和传递了哪些参数
(VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location, resolve, reject);
  } else {
    orginPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
}),
  (VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
      orginReplace.call(this, location, resolve, reject);
    } else {
      orginReplace.call(
        this,
        location,
        () => {},
        () => {}
      );
    }
  });
// 对外暴露VueRouter类的实例
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) {
    return { y: 0 };
  },
});
// 前置守卫
router.beforeEach(async (to, from, next) => {
  // next()
  let token = store.state.user.token;
  // 用户已经登录还想往login去 不可
  let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path == "/login") {
      next("/home");
    } else {
      if (name) {
        next();
      } else {
        // 没有用户信息,派发action让仓库存储用户信息再跳转
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token失效了
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 未登录,不能去交易相关页面，不能去支付相关，不能去个人中心
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") !== -1 ||
      toPath.indexOf("/pay") !== -1 ||
      toPath.indexOf("/center") !== -1
    ) {
      //    把未登录想去而没有去成的信息，存储与地址栏中【路由】
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
