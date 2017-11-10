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
const SystemMessage = r => require.ensure([], () => r(require('@/views/mycenter/systemMessage/systemMessage')), 'notice'); // 我的-个人中心-系统消息页面
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

const Coupons = r => require.ensure([], () => r(require('@/views/mycenter/couponsList/coupons')), 'coupon'); // 我的-个人中心-优惠卷页面

const CouponsInfo = r => require.ensure([], () => r(require('@/views/mycenter/couponsList/couponsInfo')), 'coupon'); // 我的-个人中心-优惠卷列表页面
const CouponsAdd = r => require.ensure([], () => r(require('@/views/mycenter/couponsList/couponsAdd')), 'coupon'); // 我的-个人中心-兑换优惠卷列表页面

const Address = r => require.ensure([], () => r(require('@/views/mycenter/selectAddress/address')), 'address'); // 我的-个人中心-地址列表
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

const myWallet = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myWallet')), 'wallet'); // 我的-个人中心-余额
const myBankCard = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/myBankCard')), 'wallet'); // 我的-个人中心-银行卡
const WalletDetails = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/walletDetails')), 'wallet'); // 我的-个人中心-钱包明细

const MyBankInfo = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/myBankInfo')), 'wallet'); // 我的-个人中心-银行卡详情
const BankCardDetail = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/bankCardDetail')), 'wallet'); // 我的-个人中心-银行卡详情
const addBankCard = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/addBankCard')), 'wallet'); // 我的-个人中心-添加银行卡
const withdrawDeposit = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/withdrawDeposit')), 'wallet'); // 我的-个人中心-提现
const walletRecharge = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/walletRecharge')), 'wallet'); // 我的-个人中心-提现

const inputConsumerCode = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/inputConsumerCode')), 'users'); // 我的-个人中心-店铺管理- 消费码
const marketingPromotion = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/marketingPromotion')), 'users'); // 我的-个人中心-店铺管理- 营销管理
const result = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/result')), 'users'); // 我的-个人中心-店铺管理- 消费码核销成功提示
const goodsManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/goodsManage')), 'users'); // 我的-个人中心-店铺管理- 商品管理
const classifyManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/classifyManage')), 'users'); // 我的-个人中心-店铺管理- 商品管理-商品分组
const goodsEdit = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/goodsEdit')), 'users'); // 我的-个人中心-店铺管理- 商品管理-商品编辑
const goodsStore = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/goodsStore')), 'users'); // 我的-个人中心-店铺管理- 商品管理-商品库

const orderManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/orderManage')), 'users'); // 我的-个人中心-店铺管理- 消订单管理
const servicePersonManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/servicePersonManage')), 'users'); // 我的-个人中心-店铺管理- 服务人员管理
const pictureManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/pictureManage')), 'users'); // 我的-个人中心-店铺管理- 图片管理
const adminAuthority = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/adminAuthority')), 'users'); // 我的-个人中心-店铺管理- 图片管理
const viewCheckError = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/viewCheckError')), 'users'); // 我的-个人中心-店铺管理- 查看投诉
const salesList = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/salesList')), 'users'); // 我的-个人中心-店铺管理-营销管理--活动列表

const goodSales = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/goodSales')), 'users'); // 我的-个人中心-店铺管理-营销管理--活动编辑
const salesGoods = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/salesGoods')), 'users'); // 我的-个人中心-店铺管理-营销管理--活动商品
const newSalesGood = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/newSalesGood')), 'users'); // 我的-个人中心-店铺管理-营销管理--添加活动商品

const shopNotice = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopNotice')), 'users'); // 我的-个人中心-店铺管理-营销管理--店铺动态
const shopNoticeDetail = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopNoticeDetail')), 'users'); // 我的-个人中心-店铺管理-营销管理--店铺动态详情
const shopNoticeInfo = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopNoticeInfo')), 'users'); // 我的-个人中心-店铺管理-营销管理--店铺动态详情

const shopEditSetup = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetup')), 'users'); // 我的-个人中心-店铺管理--店铺设置
const shopEditSetupName = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupName')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺名称
const shopEditSetupPhone = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupPhone')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺电话
const shopEditSetupDesc = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupDesc')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺描述
const shopEditSetupPay = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupPay')), 'users'); // 我的-个人中心-店铺管理--店铺设置--支付方式
const shopEditSetupRange = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupRange')), 'users'); // 我的-个人中心-店铺管理--店铺设置--服务范围
const shopEditSetupAddress = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupAddress')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺地址
const shopEditSetupClassify = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupClassify')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺分类

//新建店铺
const chooseShopType = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/chooseShopType')), 'openshop'); // 我的-个人中心-选择开店分类
const chooseShopClass = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/chooseShopClass')), 'openshop'); // 我的-个人中心-选择开店分组
const chooseShopAddress = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/chooseShopAddress')), 'openshop'); // 我的-个人中心-选择开店位置




// 店铺详情
const shopDetail = r => require.ensure([], () => r(require('@/views/shopDetail/shopDetail')), 'shop');

// 确认订单
const orderVerify = r => require.ensure([], () => r(require('@/views/orderVerify/orderVerify')), 'order');

const refundReason = r => require.ensure([], () => r(require('@/views/mycenter/order/refundReason')), 'order'); // 我的-订单列表
const bankcardpage = r => require.ensure([], () => r(require('@/views/mycenter/myWallet/myBankCard/bankcardpage')), 'users'); // 我的-个人中心-添加银行卡---银行卡协议
const register = r => require.ensure([], () => r(require('@/views/register/register')), 'users'); // 注册页面
const registerProtocol = r => require.ensure([], () => r(require('@/views/registerProtocol/registerProtocol')), 'users'); // 注册协议
const findPassword = r => require.ensure([], () => r(require('@/views/findPassword/findPassword')), 'users'); // 注册页面
const restPassword = r => require.ensure([], () => r(require('@/views/restPassword/restPassword')), 'users'); // 找回密码

const salesPromotion = r => require.ensure([], () => r(require('@/views/home/salesPromotion/salesPromotion')), 'home'); // 首页--限时抢购
const choosePayWay = r => require.ensure([], () => r(require('@/views/mycenter/order/choosePayWay')), 'order'); // 我的-订单列表--未付款
const nativeBenditong = r => require.ensure([], () => r(require('@/views/mycenter/nativeBenditong/nativeBenditong')), 'native'); // 我的-本地通
const shopQrcode = r => require.ensure([], () => r(require('@/views/mycenter/myCollect/shopQrcode')), 'user'); // 我的-个人中心-二维码页面
const shopComplain = r => require.ensure([], () => r(require('@/views/mycenter/myCollect/shopComplain')), 'user'); // 我的-个人中心-店铺投诉页面

// 地区选择
const ChooseCity = r => require.ensure([], () => r(require('@/views/chooseCity/choose-city')), 'home'); // 选择地区

const addServicePerson = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/addServicePerson')), 'users'); // 我的-个人中心-店铺管理- 添加服务人员
const shopAllClass = r => require.ensure([], () => r(require('@/views/classify/shopAllClass')), 'navtab'); //  分类页面详情
const addAdmin = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/addAdmin')), 'users'); // 我的-个人中心-店铺管理- 图片管理
const shopEditSetupTime = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/shopEditSetupTime')), 'users'); // 我的-个人中心-店铺管理--店铺设置--店铺时间

// 商品详情
const productDetail = r => require.ensure([], () => r(require('@/views/productDetail/productDetail')), 'home');

const myOrderDetail = r => require.ensure([], () => r(require('@/views/mycenter/order/myOrderDetail')), 'order'); // 我的-订单详情
const wsSetPrice = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/wsSetPrice')), 'users'); // 我的-个人中心-店铺管理-外卖设置
const logisticsManage = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/logisticsManage')), 'users'); // 我的-个人中心-店铺管理-物流设置
const addUpdateLogistics = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/addUpdateLogistics')), 'users'); // 我的-个人中心-店铺管理-添加物流
const orderComments = r => require.ensure([], () => r(require('@/views/mycenter/order/orderComments')), 'order'); // 我的-订单详情--订单评价
const nactiveDetail = r => require.ensure([], () => r(require('@/views/mycenter/nativeBenditong/nactiveDetail')), 'order'); // 我的-本地通详情
const logisticsSelect = r => require.ensure([], () => r(require('@/views/logisticsSelect/logisticsSelect')), 'order'); // 物流方式
const arrivalTime = r => require.ensure([], () => r(require('@/views/arrivalTime/arrivalTime')), 'order'); // 到店时间
const comments = r => require.ensure([], () => r(require('@/views/comments/comments')), 'order'); // 更多评价
const deliveryStaff = r => require.ensure([], () => r(require('@/views/mycenter/shopManage/deliveryStaff')), 'users'); // 我的-个人中心-店铺管理- 服务人员


Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            showPageHeader: false,
        }
    },
    // 搜索
    {
        path: '/search',
        name: 'search',
        component: search
    },
    // 商品详情
    {
        path: '/productDetail',
        name: 'productDetail',
        component: productDetail
    },
    // 确认订单
    {
        path: '/orderVerify',
        name: 'orderVerify',
        component: orderVerify,
        meta: { requiresAuth: true }
    },
    // 物流方式
    {
        path: '/logisticsSelect',
        name: 'logisticsSelect',
        component: logisticsSelect
    },
    // 到店时间
    {
        path: '/arrivalTime',
        name: 'arrivalTime',
        component: arrivalTime
    },
    // 更多评价
    {
        path: '/comments',
        name: 'comments',
        component: comments
    },
    // 服务人员
    {
        path: '/deliveryStaff',
        name: 'deliveryStaff',
        component: deliveryStaff
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
        component: ChooseCity,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/service',
        name: 'service',
        component: service
    },
    // 店铺详情
    {
        path: '/shopDetail',
        name: 'shopDetail',
        component: shopDetail
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
    // 注册协议
    {
        path: '/registerProtocol',
        name: 'registerProtocol',
        component: registerProtocol
    },
    // 找回密码
    {
        path: '/findPassword',
        name: 'findPassword',
        component: findPassword
    },
    {
        path: '/restPassword',
        name: 'restPassword',
        component: restPassword
    },
    {
        path: '/classify',
        name: 'classify',
        component: Classify,
        meta: {
            keepAlive: true
        }
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
        path: '/nactiveDetail',
        name: 'nactiveDetail',
        component: nactiveDetail
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

    /* ================== 我的 ================== */
    {
        path: '/mycenter',
        //name: 'mycenter',
        component: Mycenter,
        meta: { requiresAuth: true },
        children: [{
            path: '',
            name: 'mycenter',
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
            }
            ]
        },
        {

            path: 'myCollect',
            name: 'myCollect',
            component: myCollect
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
        { path: 'chooseShopType', name:'chooseShopType', component: chooseShopType },
        { path: 'chooseShopClass',name:'chooseShopClass', component: chooseShopClass },
        { path: 'chooseShopAddress',name:"chooseShopAddress", component: chooseShopAddress },
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
            path: 'classifyManage',
            name: 'classifyManage',
            component: classifyManage
        },
        {
            path: 'goodsEdit',
            name: 'goodsEdit',
            component: goodsEdit
        },
        {
            path: 'goodsStore',
            name: 'goodsStore',
            component: goodsStore
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
            path: '/classify',
            name: 'classify',
            component: Classify,
            meta: {
                keepAlive: true
            }
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
            path: 'goodSales',
            name: 'goodSales',
            component: goodSales
        },

        {
            path: 'salesGoods',
            name: 'salesGoods',
            component: salesGoods
        },
        {
            path: 'newSalesGood',
            name: 'newSalesGood',
            component: newSalesGood
        },

        {
            path: 'shopNotice',
            name: 'shopNotice',
            component: shopNotice
        },
        {
            path: 'shopNoticeDetail',
            name: 'shopNoticeDetail',
            component: shopNoticeDetail
        },
        {
            path: 'shopNoticeInfo',
            name: 'shopNoticeInfo',
            component: shopNoticeInfo
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
            component: logisticsManage,
            mate: { keepAlive: false }
        },
        {
            path: '/myWallet',
            name: 'myWallet',
            component: myWallet,
        },
        {
            path: 'myBankInfo',
            //name: 'myBankInfo',
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
            component: Coupons,
            children: [{
                path: '',
                name: 'coupons',
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
            component: Address,
            children: [{
                path: 'addressInfo',
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
            //name: 'chests',
            component: Chests,
            children: [{
                path: '',
                name: 'chests',
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
    /* ================== 我的 ================== */


    {
        path: '*',
        redirect: { name: 'home' }
    },

    ],
    //mode:'history'
});

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, form, next) => {

    store.commit('UPDATE_PAGE_LOADING', { pageLoading: true })

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

    setTimeout(_ => {
        store.commit('UPDATE_PAGE_LOADING', { pageLoading: false })
    }, 600)

})

export default router
