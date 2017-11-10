/**
 * Created by Administrator on 2017/7/19.
 * http 配置
 */

import axios from 'axios'
import router from '@/router'
import store from '@/store'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.baseURL = 'http://192.168.10.163';
axios.defaults.baseURL = '/api';
/*axios.defaults.proxy = {
    host: 'http://wx.o2o.rhy.com',
    //port: 9000,
};*/

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        let result = response.data;
        let routeOpts = {
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        };

        console.log('===== api: ', response.config.url ,'=====');
        console.log('===== response success response =====',response);

        // 未登录
        if (result.status == -91) {
            store.dispatch('recordUserInfo', null);

            if (router.currentRoute.path === '/login') {
                routeOpts = {
                    path: router.currentRoute.fullPath
                };
            }

            router.push(routeOpts);

            return Promise.reject(result);
        }

        return result
        //return response.data
    },
    err => {
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    console.log('service 400');

                    router.replace({
                        path: '/home'
                    });

                    break;
                case 413:
                    break;
            }
        }
        console.log('===== response error =====', err.response);
        return Promise.reject(err.response.data);
    }
)

// 对外接口
export default axios;

