// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import router from './router'
import axios from './http'
import api from './api'

Vue.config.productionTip = false;
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

// 移除移动端点击延迟
FastClick.attach(document.body);

// 组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

//import Loadmore from 'mint-loadmore';
//import 'mint-ui/lib/style.css'
//import { Loadmore } from 'mint-ui';
//Vue.component('loadmore', Loadmore);

// 自定义指令
import './directives';

// 自定义过滤器
import filters from './filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 自定义组件
import * as components from './components'
console.log(components.Empty)
Object.keys(components).forEach(k => Vue.component(k, components[k]));

import Notiejs from '@/components/notiejs';
Vue.use(Notiejs);

// 防止刷新用户信息丢失
if (window.sessionStorage && window.sessionStorage.userInfo) {
    store.dispatch('recordUserInfo', JSON.parse(window.sessionStorage.userInfo))
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, form, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
        //console.log('======main======',store.state.user.userInfo)
        if (store.state.user.userInfo) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app-box',
    router,
    store,
    render: h => h(App)
        //template: '<App/>',
        //components: { App }
})
