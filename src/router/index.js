import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
//import Hello from '@/components/Hello'

const test = r => require.ensure([], () => r(require('@/views/test/test')), 'test'); // 测试页面K

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
// const choseShopTmp = r => require.ensure([], () => r(require('@/views/mycenter/choseShopTmp/choseShopTmp')), 'users'); // 我的-个人中心-店铺管理（没店铺）



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

const OrderList = r => require.ensure([], () => r(require('@/views/mycenter/order/orderList')), 'order'); // 我的-订单列表

const search = r => require.ensure([], () => r(require('@/views/home/search/search')), 'home'); // 首页--搜索跳转页面
const searchResult = r => require.ensure([], () => r(require('@/views/home/searchResult/searchResult')), 'home'); // 首页--搜索跳转页面
const service = r => require.ensure([], () => r(require('@/views/home/service/service')), 'home'); // 首页--服务
const shopdetail = r => require.ensure([], () => r(require('@/views/home/shopdetail/shopdetail')), 'home'); // 首页--店铺详情
// const picture = r => require.ensure([], () => r(require('@/views/home/shopdetail/picture')), 'home'); // 首页--店铺详情
// const productdetails = r => require.ensure([], () => r(require('@/views/home/productdetails/productdetails')), 'home'); // 首页--店铺详情
const myWallet = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myWallet')), 'users'); // 我的-个人中心-余额
const myBankCard = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/myBankCard')), 'users'); // 我的-个人中心-银行卡
const WalletDetails = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/walletDetails')), 'users'); // 我的-个人中心-钱包明细

const MyBankInfo = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/myBankInfo')), 'users'); // 我的-个人中心-银行卡详情
const BankCardDetail = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/bankCardDetail')), 'users'); // 我的-个人中心-银行卡详情
const addBankCard = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/addBankCard')), 'users'); // 我的-个人中心-添加银行卡
const withdrawDeposit = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/withdrawDeposit')), 'users'); // 我的-个人中心-提现
const walletRecharge = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/walletRecharge')), 'users'); // 我的-个人中心-提现


const inputConsumerCode = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/inputConsumerCode')), 'users'); // 我的-个人中心-店铺管理- 消费码
const marketingPromotion = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/marketingPromotion')), 'users'); // 我的-个人中心-店铺管理- 营销管理
const result = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/result')), 'users'); // 我的-个人中心-店铺管理- 消费码核销成功提示
const goodsManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/goodsManage')), 'users'); // 我的-个人中心-店铺管理- 商品管理
const orderManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/orderManage')), 'users'); // 我的-个人中心-店铺管理- 消订单管理
const servicePersonManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/servicePersonManage')), 'users'); // 我的-个人中心-店铺管理- 服务人员管理
const pictureManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/pictureManage')), 'users'); // 我的-个人中心-店铺管理- 图片管理
const adminAuthority = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/adminAuthority')), 'users'); // 我的-个人中心-店铺管理- 图片管理
const viewCheckError = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/viewCheckError')), 'users'); // 我的-个人中心-店铺管理- 查看投诉
const salesList = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/salesList')), 'users'); // 我的-个人中心-店铺管理-营销管理--限时折扣
const shopNotice = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopNotice')), 'users'); // 我的-个人中心-店铺管理-营销管理--店铺动态
const shopEditSetup = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetup')), 'users'); // 我的-个人中心-店铺管理--店铺设置
const shopEditSetupName = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupName')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺名称
const shopEditSetupPhone = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupPhone')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺电话
const shopEditSetupDesc = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupDesc')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺描述
const shopEditSetupPay = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupPay')), 'users'); // 我的-个人中心-店铺管理--店铺设置--支付方式
const shopEditSetupRange = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupRange')), 'users'); // 我的-个人中心-店铺管理--店铺设置--服务范围
const shopEditSetupAddress = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupAddress')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺地址
const shopEditSetupClassify = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupClassify')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺分类
const shopDetail = r => require.ensure([], () => r(require('@/views/mycenter/myCollect/shopDetail')), 'user'); // 我的-个人中心-店铺收藏页面
const refundReason = r => require.ensure([], () => r(require('@/views/mycenter/order/refundReason')), 'order'); // 我的-订单列表
const bankcardpage = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/bankcardpage')), 'users'); // 我的-个人中心-添加银行卡---银行卡协议
const register = r => require.ensure([], () => r(require('@/views/register/register')), 'users'); // 注册页面
const salesPromotion = r => require.ensure([], () => r(require('@/views/home/salesPromotion/salesPromotion')), 'home'); // 首页--限时抢购
const choosePayWay = r => require.ensure([], () => r(require('@/views/mycenter/order/choosePayWay')), 'order'); // 我的-订单列表--未付款
const nativeBenditong = r => require.ensure([], () => r(require('@/views/mycenter/nativeBenditong/nativeBenditong')), 'order'); // 我的-本地通
const shopQrcode = r => require.ensure([], () => r(require('@/views/mycenter/myCollect/shopQrcode')), 'user'); // 我的-个人中心-二维码页面
const shopComplain = r => require.ensure([], () => r(require('@/views/mycenter/myCollect/shopComplain')), 'user'); // 我的-个人中心-店铺投诉页面

const ChooseCity = r => require.ensure([], () => r(require('@/views/chooseCity/choose-city')), 'home'); // 选择地区

const addServicePerson = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/addServicePerson')), 'users'); // 我的-个人中心-店铺管理- 添加服务人员
const shopAllClass = r => require.ensure([], () => r(require('@/views/classify/shopAllClass')), 'navtab'); //  分类页面详情
const addAdmin = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/addAdmin')), 'users'); // 我的-个人中心-店铺管理- 图片管理
const shopEditSetupTime = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupTime')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺时间
const productDetail = r => require.ensure([], () => r(require('@/views/home/productDetail/productDetail')), 'home'); // 首页--商品详情页面
const myOrderDetail = r => require.ensure([], () => r(require('@/views/mycenter/order/myOrderDetail')), 'order'); // 我的-订单详情
const wsSetPrice = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/wsSetPrice')), 'users'); // 我的-个人中心-店铺管理-外卖设置
const logisticsManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/logisticsManage')), 'users'); // 我的-个人中心-店铺管理-物流设置
const addUpdateLogistics = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/addUpdateLogistics')), 'users'); // 我的-个人中心-店铺管理-添加物流
const orderComments = r => require.ensure([], () => r(require('@/views/mycenter/order/orderComments')), 'order'); // 我的-订单详情--订单评价



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
            path: '/productDetail',
            name: 'productDetail',
            component: productDetail
        },
        {
            path: '/refundReason',
            name: 'refundReason',
            component: refundReason
        },
        {
            path: '/orderComments',
            name: 'orderComments',
            component: orderComments
        },
        {

            path: '/salesPromotion',
            name: 'salesPromotion',
            component: salesPromotion
        },
        {

            path: '/chooseCity',
            name: 'chooseCity',
            component: ChooseCity
        },
        {
            path: '/service',
            name: 'service',
            component: service
        },
        {
            path: '/shopdetail',
            name: 'shopdetail',
            component: shopdetail
        },
        {
            path: '/choosePayWay',
            name: 'choosePayWay',
            component: choosePayWay
        },
        // {
        //     path: '/picture',
        //     name: 'picture',
        //     component: picture
        // },
        // {
        //     path: '/productdetails',
        //     name: 'productdetails',
        //     component: productdetails
        // },
        {
            path: '/searchResult',
            name: 'searchResult',
            component: searchResult
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/classify',
            name: 'classify',
            component: Classify
        },
        {
            path: '/shopAllClass',
            name: 'shopAllClass',
            component: shopAllClass
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
            path: '/nativeBenditong',
            name: 'nativeBenditong',
            component: nativeBenditong
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
            path: '/myOrderDetail',
            name: 'myOrderDetail',
            component: myOrderDetail
        },
        {
            path: '/mycenter',
            name: 'mycenter',
            component: Mycenter,
            meta: { requiresAuth: true },
            children: [{
                path: '',
                name: 'userCenter',
                meta: { requiresAuth: true },
                component: Usercenter,
            },
                {
                    path: 'order',
                    name: 'order',
                    component: OrderList,
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
                    },
                        // {
                        //     path: 'mycenterBindPhoneNum',
                        //     name: 'mycenterBindPhoneNum',
                        //     component: mycenterBindPhoneNum,
                        // },
                        {
                            path: 'changePassword',
                            name: 'changePassword',
                            component: changePassword,
                        }]
                },
                {

                    path: 'myCollect',
                    name: 'myCollect',
                    component: myCollect
                },
                {

                    path: 'shopDetail',
                    name: 'shopDetail',
                    component: shopDetail
                },
                {

                    path: 'shopQrcode',
                    name: 'shopQrcode',
                    component: shopQrcode
                },
                {

                    path: 'shopComplain',
                    name: 'shopComplain',
                    component: shopComplain
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
                    path: 'inputConsumerCode',
                    name: 'inputConsumerCode',
                    component: inputConsumerCode
                },
                {
                    path: 'marketingPromotion',
                    name: 'marketingPromotion',
                    component: marketingPromotion
                },
                {
                    path: 'result',
                    name: 'result',
                    component: result
                },
                {
                    path: 'goodsManage',
                    name: 'goodsManage',
                    component: goodsManage
                },
                {
                    path: 'orderManage',
                    name: 'orderManage',
                    component: orderManage
                },
                {
                    path: 'servicePersonManage',
                    name: 'servicePersonManage',
                    component: servicePersonManage
                },
                {
                    path: 'addServicePerson',
                    name: 'addServicePerson',
                    component: addServicePerson
                },
                {
                    path: 'pictureManage',
                    name: 'pictureManage',
                    component: pictureManage
                },
                {
                    path: 'adminAuthority',
                    name: 'adminAuthority',
                    component: adminAuthority
                },
                {
                    path: 'addAdmin',
                    name: 'addAdmin',
                    component: addAdmin
                },
                {
                    path: 'viewCheckError',
                    name: 'viewCheckError',
                    component: viewCheckError
                },
                {
                    path: 'shopEditSetup',
                    name: 'shopEditSetup',
                    component: shopEditSetup
                },
                {
                    path: 'shopEditSetupName',
                    name: 'shopEditSetupName',
                    component: shopEditSetupName
                },
                {
                    path: 'shopEditSetupPhone',
                    name: 'shopEditSetupPhone',
                    component: shopEditSetupPhone
                },
                {
                    path: 'shopEditSetupDesc',
                    name: 'shopEditSetupDesc',
                    component: shopEditSetupDesc
                },
                {
                    path: 'shopEditSetupPay',
                    name: 'shopEditSetupPay',
                    component: shopEditSetupPay
                },
                {
                    path: 'shopEditSetupRange',
                    name: 'shopEditSetupRange',
                    component: shopEditSetupRange
                },
                {
                    path: 'shopEditSetupAddress',
                    name: 'shopEditSetupAddress',
                    component: shopEditSetupAddress
                },
                {
                    path: 'shopEditSetupClassify',
                    name: 'shopEditSetupClassify',
                    component: shopEditSetupClassify
                },
                {
                    path: 'shopEditSetupTime',
                    name: 'shopEditSetupTime',
                    component: shopEditSetupTime
                },
                {
                    path: 'salesList',
                    name: 'salesList',
                    component: salesList
                },
                {
                    path: 'shopNotice',
                    name: 'shopNotice',
                    component: shopNotice
                },
                {
                    path: 'wsSetPrice',
                    name: 'wsSetPrice',
                    component: wsSetPrice
                },
                {
                    path: 'addUpdateLogistics',
                    name: 'addUpdateLogistics',
                    component: addUpdateLogistics
                },
                {
                    path: 'logisticsManage',
                    name: 'logisticsManage',
                    component: logisticsManage
                },
                {
                    path: '/myWallet',
                    name: 'myWallet',
                    component: myWallet,
                },
                {
                    path: 'myBankInfo',
                    name: 'myBankInfo',
                    component: MyBankInfo,
                    children: [{
                        path: '',
                        name: 'myBankCard',
                        component: myBankCard,
                    },
                        {
                            path: 'bankCardDetail',
                            name: 'bankCardDetail',
                            component: BankCardDetail
                        }
                    ]
                },

                {
                    path: '/addBankCard',
                    name: 'addBankCard',
                    component: addBankCard
                },
                {
                    path: '/bankcardpage',
                    name: 'bankcardpage',
                    component: bankcardpage
                },
                {
                    path: '/walletDetails',
                    name: 'walletDetails',
                    component: WalletDetails
                },
                {
                    path: '/withdrawDeposit',
                    name: 'withdrawDeposit',
                    component: withdrawDeposit
                },
                {
                    path: '/walletRecharge',
                    name: 'walletRecharge',
                    component: walletRecharge
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

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, form, next) => {

    store.commit('UPDATE_PAGE_LOADING', {pageLoading: true})

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

// 页面加载后
router.afterEach(route => {

    setTimeout( _ => {
        store.commit('UPDATE_PAGE_LOADING', {pageLoading: false})
    },  600)

})

export default router
