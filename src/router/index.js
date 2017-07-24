import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'

const Login = r => require.ensure([], () => r(require('@/views/login/login')), 'users');
const Home = r => require.ensure([], () => r(require('@/views/home/home')), 'navtab');
const Classify = r => require.ensure([], () => r(require('../views/classify/classify')), 'navtab');
const Auslese = r => require.ensure([], () => r(require('../views/auslese/auslese')), 'navtab');

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/classify',
            name: 'classify',
            component: Classify
        },
        {
            path: '/auslese',
            name: 'auslese',
            component: Auslese
        },
        {
            path: '*',
            redirect: {name: 'home'}
        }
    ],
    mode:'history'
});


// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, form, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (true) {
            next()
        } else {
            next({
                path:'/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
})

export default router
