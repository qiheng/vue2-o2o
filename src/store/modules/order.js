/**
 * Created by Administrator on 2017/4/22.
 */

import * as types from '../mutation-types'

// 默认提交订单参数
let defaultOrderParam = {
    payType: 2,
    mark: '',
    addressId: '',
    logisticsId: '',
    logisticsName: '',
    score: '',
    orderType: 0, // 默认0（配送），3（自提）
    billInfo: '不开发票',
    comeTime: '尽快到达'
};

// state
const state = {
    orderParam: {...defaultOrderParam}, // 提交订单参数
};

// getters
const getters = {
    // 获取订单参数
    orderParam: state => {
        return state.orderParam
    }
};

// actions
const actions = {

};

// mutations
const mutations = {

    // 初始化订单参数
    [types.INIT_ORDER_PARAM] (state) {
        state.orderParam = {...defaultOrderParam};
    },

    // 更新订单参数
    [types.UPDATE_ORDER_PARAM] (state, orderParam) {
        state.orderParam = Object.assign(state.orderParam, orderParam);
    }

};

export default {
    state,
    getters,
    mutations,
    actions,
}
