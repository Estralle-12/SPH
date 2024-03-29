import { reqGoodsInfo, reqAddOrUpdataShopCart } from '@/api'
// 封装游客身份模块uuid ----> 生成一个随机字符串（不能再变了）
import { getUUID } from '@/utils/index'
const state = {
    goodInfo: {},
    uuid_token: getUUID()
}
const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
        // 获取产品信息的action     
        async getGoodsInfo({ commit }, skuId) {
            let result = await reqGoodsInfo(skuId)
            if (result.code == 200) {
                commit("GETGOODSINFO", result.data)
            }
        },
        async addOrUpdataShopCart({ commit }, { skuId, skuNum }) {
            // 加入购物车返回的结果
            // 加入购物车之后，前台将参数带给服务器
            // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
            // 因为服务器没有返回其余数据，因此不需要三连环存储数据
            let result = await reqAddOrUpdataShopCart(skuId, skuNum)
                // 当前函数如果执行返回的是Promise
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    }
    // 简化数据
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}