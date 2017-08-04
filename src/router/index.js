import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'

const test = r => require.ensure([], () => r(require('../views/test/test')), 'test'); // 测试页面K

const Login = r => require.ensure([], () => r(require('@/views/login/login')), 'users'); // 登录页面
const Home = r => require.ensure([], () => r(require('@/views/home/home')), 'navtab'); // 首页页面
const Classify = r => require.ensure([], () => r(require('@/views/classify/classify')), 'navtab'); //  分类页面
const Auslese = r => require.ensure([], () => r(require('@/views/auslese/auslese')), 'navtab'); // 精选页面
const Notice = r => require.ensure([], () => r(require('@/views/notice/notice')), 'notice'); // 公告页面
const NoticeDetail = r => require.ensure([], () => r(require('@/views/notice/noticeDetail/noticeDetail')), 'notice'); //公告详情页面
const Mycenter = r => require.ensure([], () => r(require('@/views/mycenter/mycenter')), 'users'); // 我的-个人中心页面
const SystemMessage = r => require.ensure([], () => r(require('@/views/mycenter/systemMessage/systemMessage')), 'users'); // 我的-个人中心-系统消息页面
const myCollect = r => require.ensure([], () => r(require('@/views/mycenter/myCollect/myCollect')), 'user'); // 我的-个人中心-店铺收藏页面
const mySetup = r => require.ensure([], () => r(require('@/views/mycenter/mySetup/mySetup')), 'users'); // 我的-个人中心-设置页面
const aboutUs = r => require.ensure([], () => r(require('@/views/mycenter/mySetup/aboutUs')), 'users'); // 我的-个人中心-关于我们页面
const userCoupleBack = r => require.ensure([], () => r(require('@/views/mycenter/mySetup/userCoupleBack')), 'users'); // 我的-个人中心-用户反
// 馈页面

const myScore = r => require.ensure([], () => r(require('@/views/mycenter/myScore/myScore')), 'users'); // 我的-个人中心-积分
const scoreRecord = r => require.ensure([], () => r(require('@/views/mycenter/myScore/scoreRecord')), 'users'); // 我的-个人中心-积分记录

const jifenShop = r => require.ensure([], () => r(require('@/views/mycenter/jifenShop/jifenShop')), 'users'); // 我的-个人中心-积分商城
const shopManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopManage')), 'users'); // 我的-个人中心-店铺管理（有店铺情况）
const choseShopTmp = r => require.ensure([], () => r(require('@/views/mycenter/choseShopTmp/choseShopTmp')), 'users'); // 我的-个人中心-店铺管理（没店铺）



const Coupons = r => require.ensure([], () => r(require('@/views/mycenter/couponsList/coupons')), 'users'); // 我的-个人中心-优惠卷页面

const CouponsInfo = r => require.ensure([], () => r(require('@/views/mycenter/couponsList/couponsInfo')), 'couponsList'); // 我的-个人中心-优惠卷列表页面
const CouponsAdd = r => require.ensure([], () => r(require('@/views/mycenter/couponsList/couponsAdd')), 'couponsList'); // 我的-个人中心-兑换优惠卷列表页面

const Address = r => require.ensure([], () => r(require('@/views/mycenter/selectAddress/address')), 'users'); // 我的-个人中心-优惠卷页面
const AddressInfo = r => require.ensure([], () => r(require('@/views/mycenter/selectAddress/addressInfo')), 'address'); // 我的-个人中心-优惠卷列表页面
const EditAddress = r => require.ensure([], () => r(require('@/views/mycenter/selectAddress/editAddress')), 'address'); // 我的-个人中心-兑换优惠卷列表页面

const Chests = r => require.ensure([], () => r(require('@/views/mycenter/chests/chests')), 'users'); //我的-个人中心-便民服务页面
const ChestsInfo = r => require.ensure([], () => r(require('@/views/mycenter/chests/chestsInfo')), 'chests'); // 我的-个人中心-便民服务页面
const HandilyPhone = r => require.ensure([], () => r(require('@/views/mycenter/chests/handilyPhone')), 'chests'); // 我的-个人中心-便民号码页面
const RechargePhone = r => require.ensure([], () => r(require('@/views/mycenter/chests/rechargePhone')), 'chests'); // 我的-个人中心-手机充值页面




const Usercenter = r => require.ensure([], () => r(require('@/views/mycenter/userCenter/userCenter')), 'users'); // 我的-个人中心页面
const UserInfo = r => require.ensure([], () => r(require('@/views/mycenter/userInfo/userInfo')), 'users'); // 我的-个人中心-个人信息页面
const SetUserName = r => require.ensure([], () => r(require('@/views/mycenter/setUserName/setUserName')), 'users'); // 我的-个人中心-设置用户名页面
const SetPhone = r => require.ensure([], () => r(require('@/views/mycenter/setPhone/setPhone')), 'users'); // 我的-个人中心-设置手机号码页面
const changePassword = r => require.ensure([], () => r(require('@/views/mycenter/changePassword/changePassword')), 'users'); // 我的-个人中心-修改密码页面

const search = r => require.ensure([], () => r(require('@/views/home/search/search')), 'home'); // 首页--搜索跳转页面
const searchResult = r => require.ensure([], () => r(require('@/views/home/searchResult/searchResult')), 'home'); // 首页--搜索跳转页面
const myWallet = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myWallet')), 'users'); // 我的-个人中心-余额
const myBankCard = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/myBankCard')), 'users'); // 我的-个人中心-银行卡




Vue.use(Router);

const router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/searchResult',
            name: 'searchResult',
            component: searchResult
        },
        {
            path: '/myWallet',
            name: 'myWallet',
            component: myWallet
        },
        {
            path: '/myBankCard',
            name: 'myBankCard',
            component: myBankCard
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
            path: '/notice',
            name: 'notice',
            component: Notice
        },
        {
            path: '/notice/:noticeId',
            name: 'noticeDetail',
            component: NoticeDetail
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/mycenter',
            name: 'mycenter',
            component: Mycenter,
            //meta: { requiresAuth: true },
            children: [{

                path: '',
                name: 'userCenter',
                //meta: { requiresAuth: true },
                component: Usercenter,
                },
                {
                    path: '',
                    name: 'userCenter',
                    //meta: { requiresAuth: true },
                    component: Usercenter
                },

                {
                    path: 'userInfo',
                    name: 'userInfo',
                    component: UserInfo,
                    children: [{
                        path: 'setUserName',
                        name: 'setUserName',
                        component: SetUserName,
                    }, {
                        path: 'setPhone',
                        name: 'setPhone',
                        component: SetPhone,
                    }, {
                            path: 'changePassword',
                            name: 'changePassword',
                            component: changePassword,
                        }
                    ]
                },
                {

                    path: 'myCollect',
                    name: 'myCollect',
                    component: myCollect
                },
                {
                    path: 'mySetup',
                    name: 'mySetup',
                    component: mySetup
                },
                {
                    path: 'myScore',
                    name: 'myScore',
                    component: myScore
                },
                {
                    path: 'scoreRecord',
                    name: 'scoreRecord',
                    component: scoreRecord
                },
                {
                    path: 'jifenShop',
                    name: 'jifenShop',
                    component: jifenShop
                },
                {
                    path: 'shopManage',
                    name: 'shopManage',
                    component: shopManage
                },
                {
                    path: 'choseShopTmp',
                    name: 'choseShopTmp',
                    component: choseShopTmp
                },

                {
                    path: 'aboutUs',
                    name: 'aboutUs',
                    component: aboutUs
                },
                {
                    path: 'userCoupleBack',
                    name: 'userCoupleBack',
                    component: userCoupleBack
                },
                {
                    path: 'systemMessage',
                    name: 'systemMessage',
                    component: SystemMessage,
                },
                {
                    path: 'coupons',
                    name: 'coupons',
                    component: Coupons,
                    children: [{
                            path: '',
                            name: 'couponsInfo',
                            component: CouponsInfo
                        },
                        {
                            path: 'couponsAdd',
                            name: 'couponsAdd',
                            component: CouponsAdd
                        }
                    ]
                },
                {
                    path: 'address',
                    name: 'address',
                    component: Address,
                    children: [{
                            path: '',
                            name: 'addressInfo',
                            component: AddressInfo
                        },
                        {
                            path: 'editAddress',
                            name: 'editAddress',
                            component: EditAddress
                        }
                    ]
                },
                {
                    path: 'chests',
                    name: 'chests',
                    component: Chests,
                    children: [{
                            path: '',
                            name: 'chestsInfo',
                            component: ChestsInfo,
                        },
                        {
                            path: 'handilyPhone',
                            name: 'handilyPhone',
                            component: HandilyPhone,
                        },
                        {
                            path: 'rechargePhone',
                            name: 'rechargePhone',
                            component: RechargePhone,
                        }
                    ]
                },
            ]
        },
        {
            path: '*',
            redirect: { name: 'home' }
        },

    ],
    //mode:'history'
});




export default router