import requests from "./request";
import mockRequests from './mockAjax'
// 三级联动接口
// /apo/product/getBaseCategoryList get 无参数
// 发请求：axios发请求返回结构Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
    //获取banner（Home首页轮播图接口） 
export const reqGetBannerList = () => mockRequests.get('/banner')
    // 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据 地址：/api/list  请求的方式：post  请求需要带参数
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })

// 获取产品详情信息的接口  URL:/api/item/{skuId} 请求方式：get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
// 将产品添加到购物车中（获取更新某一产品的个数）
export const reqAddOrUpdataShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post", })
    // 获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
    // 删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
    // 修改商品的选择状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
    // 获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
    // 注册接口
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })
    // 登录接口
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
    // 获取用户的信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
    // 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
    // 获取用户地址信息接口
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: 'get' })
    // 获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
    // 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
    // 获取订单信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
    // 获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
    // 获取个人中心的数据（我的订单）
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })