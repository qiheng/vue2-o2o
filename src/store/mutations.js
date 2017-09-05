/**
 * Created by qiheng on 2017/5/1.
 */
import * as types from './mutation-types'

export default {
    [types.UPDATE_PAGE_LOADING] (state, payload) {
        state.config.pageLoading = payload.pageLoading
    }
}
