// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import '../../node_modules/nprogress/nprogress.css'
// start：进度条开始  done:进度条结束 


// 利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径出现/api
    baseURL: "/mock",
    // 代表请求超时的时间为5s
    timeout: 5000
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
        // config:配置对象，对象里面有一个headers请求头
        // 进度条开始
        nprogress.start();
        return config;
    })
    //响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数，度武器响应数据回来后，响应拦截器可以检测到，做些事情
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error('false'))
})

// 对外暴露
export default requests;