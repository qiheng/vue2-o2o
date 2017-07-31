/**
 * Created by Administrator on 2017/4/22.
 */

import * as types from '../mutation-types'

// state
const state = {
    userInfo: null, // 用户信息
};

// getters
const getters = {
    userInfo: state => state.userInfo,
};

// actions
const actions = {
    // 基本的记录用户信息
    recordUserInfo ({commit}, userInfo) {
        commit(types.RECORD_USEINFO, userInfo);
        // 用户信息同步更新
        if (window.sessionStorage && window.sessionStorage.userInfo) {
            window.sessionStorage.userInfo = JSON.stringify(userInfo);
        }
    },
    // 扩展用户信息
    extendUserInfo ({commit}, extendUserInfo) {
        commit(types.EXTEND_USEINFO, extendUserInfo)
    },
    // 修改昵称
    updateUserName ({commit}, username) {
        commit(types.UPDATE_USERNAME, username)
    }
};

// mutations
const mutations = {
    [types.RECORD_USEINFO] (state, userInfo) {
        state.userInfo = userInfo
    },
    [types.EXTEND_USEINFO] (state, extendUserInfo) {
        if (state.userInfo && extendUserInfo) {
            state.userInfo = Object.assign(state.userInfo, extendUserInfo || {})
        }
    },
    [types.UPDATE_USERNAME] (state, username) {
        if (state.userInfo) {
            state.userInfo.username = username
        }
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
}
