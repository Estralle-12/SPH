import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    // 获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async updataCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let promise = []
        getters.cartList.cartInfoList.forEach(item => {
                let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
                promise.push(result)
            })
            // 只要全部的p1|p2……都成功，返回结果即为成功
            // 如果有一个失败，返回即为失败结果
        return Promise.all(promise)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updataCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
};


export default {
    state,
    mutations,
    actions,
    getters
}