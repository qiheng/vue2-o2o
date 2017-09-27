/**
 * Created by Administrator on 2017/4/22.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'
import shop from './modules/shop'
import config from '../config'

Vue.use(Vuex);

const state = {
    config,
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        user,
        shop
    }
})