import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    // 获取search模块的数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo函数在调用获取服务器数据时候，至少传一个参数（空对象）
        // params形参是当用户派发action时，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
// 计算属性，在项目中为了简化数据
const getters = {
    // 当前形参是当前仓库中的state
    goodsList(state) {
        // 加入网络不给力，返回underfined，underfined不能遍历，但如果是[]就不会遍历
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}