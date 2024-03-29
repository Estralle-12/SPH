import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
// 第一个参数：全局组件的名字，第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
    // 全局注册组件
Vue.component(Button.name, Button)
    // elementUI注册组件的时候，挂在原型上
Vue.prototype.$magbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false
    // 引入MockServe.js------mock数据
import '@/mock/mockServe'
// 引入路由
import router from '@/router'
import store from '@/store'
import 'swiper/css/swiper.css'
// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
import gal from '@/assets/1.gif';
// 引入插件
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload, {
    loading: gal
}); //实际是调用了插件的install
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    // 注册路由：底下写法KV一致省略V【router小写的】
    router,
    // 注册仓库，组件实例身上会多一个$store属性
    store,
}).$mount('#app')