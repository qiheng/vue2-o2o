import * as types from '../mutation-types'
const state = {
    shopInfo: null
}
const mutations = {
    SAVE(state, shopInfo) {
        state.shopInfo = shopInfo
    }
}
const getters = {
    shopInfo: state => state.shopInfo
}
const actions = {
    saveShopInfo({ commit }, shopInfo) {
        commit('SAVE', shopInfo)
        if (window.sessionStorage && window.sessionStorage.shopInfo) {
            window.sessionStorage.shopInfo = JSON.stringify(shopInfo);
        }
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}