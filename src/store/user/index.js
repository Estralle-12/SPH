import { reqGetCode, reqUserInfo, reqUserLogin, reqUserRegister, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
const state = {
    code: "",
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        // 本地存储清空
        removeToken()
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
            // console.log(result);
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogout({ commit }) {
        // 只是向服务器发一次请求，通知服务器清除token
        let result = await reqLogout()
            // action里面不能操作state
        if (result.code == 200) {
            commit("CLEAR")
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}