<template>
    <div class="viewbox-container ">
        <div class="viewbox pb60 my-center">

            <section class="panel-nobrd user-info">
                <!-- 用户信息 start -->
                <div class="panel-hd">
                    <router-link :to="{name:'userInfo'}" class="block clearfix">
                        <!--<img class="head pull-left" width="60" height="60" :src="(userInfo.headpic || config.defaultHeaderPic) + '?x-oss-process=image/resize,m_fixed,h_100,w_100'" >-->
                        <img class="head pull-left" width="60" height="60" :src="userInfo.headpic + '?x-oss-process=image/resize,m_fixed,h_100,w_100'">
                        <div class="bfc-panel">
                            <h2 class="f36 nowrap">{{ userInfo.username }}</h2>
                            <p class="mt5">
                                <img class="pull-left" width="16" src="../../../assets/images/icons-v3/icons1/icon_phone_white.png" alt="" /> {{ userInfo.phone }}
                            </p>
                        </div>
                    </router-link>
                    <i class="arr-rt"></i>
                </div>
                <!-- 用户信息 end -->

                <ul class="mod-box text-center f16 panel-bd">
                    <li class="box-flex">
                        <router-link :to="{name:'myWallet'}">
                            {{ userInfo.balance }}
                            <p class="f12 lightgray">余额</p>
                        </router-link>
                    </li>
                    <li class="box-flex" style="border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
                        <router-link :to="{name: 'coupons'}">
                            {{ userInfo.couponCount }}
                            <p class="f12 lightgray">优惠券</p>
                        </router-link>
                    </li>
                    <!--<li class="box-flex">-->
                    <!--<a class="get-points emb-red" href="my-score.html">签到赚积分</a>-->
                    <!--</li>-->
                    <li class="box-flex">
                        <router-link :to="{name:'myScore'}">
                            {{ userInfo.score }}
                            <p class="f12 lightgray">积分</p>
                        </router-link>
                    </li>
                </ul>

            </section>

            <dl class="panel-nobrd order-handler-panel">
                <dt class="panel-hd">
                    全部订单
                    <router-link :to="{name:'order', query: {type: 0}}" class=" pull-right">
                        <span class="mr25 f24 lightgray">查看全部订单</span>
                        <i class="arr-rt"></i>
                    </router-link>
                </dt>
                <dd class="panel-bd f24">
                    <div class="mod-box text-center f12">
                        <router-link :data-count="userInfo.orderCountNotPay > 100 ? '…' : userInfo.orderCountNotPay"
                                     :to="{name:'order', query: {type: 1}}" class="block box-flex o-dfk">待付款</router-link>
                        <router-link :data-count="userInfo.orderCountNotFinish > 100 ? '…' : userInfo.orderCountNotFinish"
                                     :to="{name:'order', query: {type: 2}}" class="block box-flex o-dwc">待完成</router-link>
                        <router-link :data-count="userInfo.orderCountNotComment > 100 ? '…' : userInfo.orderCountNotComment"
                                     :to="{name:'order', query: {type: 3}}" class="block box-flex o-dpj">待评价</router-link>
                        <router-link :data-count="userInfo.orderCountRefund > 100 ? '…' : userInfo.orderCountRefund"
                                     :to="{name:'order', query: {type: 4}}" class="block box-flex o-tk">退款</router-link>
                    </div>
                </dd>
            </dl>

            <nav class="panel-nobrd">
                <router-link class="block panel-chunk" :to="{name:'addressInfo'}">
                    <h3 class="icos4 i4-address">收货地址</h3>
                    <i class="arr-rt"></i>
                </router-link>
                <router-link class="block panel-chunk" :to="{name: 'myCollect'}">
                    <h3 class="icos4 i4-collect">我的收藏</h3>
                    <i class="arr-rt"></i>
                </router-link>
                <router-link class="block panel-chunk" :to="{name:'jifenShop'}">
                    <h3 class="icos4 i4-jfen">积分商城</h3>
                    <i class="arr-rt"></i>
                </router-link>
                <router-link class="block panel-chunk" :to="{name:'systemMessage'}">
                    <h3 class="icos4 i4-msg">系统消息</h3>
                    <!--<span class="pos-rt-middle" style="right: 0">
                        <i v-if="userInfo.ordersCount" class="counter mr25">{{ userInfo.ordersCount }}</i>
                        <i class="arr-rt"></i>
                    </span>-->
                    <i class="arr-rt"></i>
                </router-link>
            </nav>

            <nav class="panel-nobrd">
                <!--<router-link class="J-refund btn btn-primary" :to="{name:'refundReason',query:{'ordersId':ordersItem.ordersId,'priceCount':ordersItem.priceCount}}">申请退款</router-link>-->
                <router-link class="block panel-chunk" :to="{name:'nativeBenditong',query:{'shopClassId':'29D316360C2120EFE050AA0A1B2B413E'}}">
                    <h3 class="icos4 i4-bdt">本地通</h3>
                    <i class="arr-rt"></i>
                </router-link>

                <router-link class="block panel-chunk" :to="{name:'chests'}">
                    <h3 class="icos4 i4-bm">便民服务</h3>
                    <i class="arr-rt"></i>
                </router-link>
                <a v-if="userInfo.sitePhone" class="block panel-chunk" :href="'tel:' + userInfo.sitePhone">
                    <h3 class="icos4 i4-phone pull-left">客服热线</h3>
                    <p class="mr25 pull-right">
                        <ins class="lightgray">{{ userInfo.sitePhone }}</ins>
                    </p>
                    <i class="arr-rt"></i>
                </a>
                <router-link v-if="userInfo.shop != 0" class="block panel-chunk " :to="{name:'shopManage'}">
                    <h3 class="icos4 i4-shop">店铺管理</h3>
                    <span class="pos-rt-middle" style="right: 0">
                        <i v-if="userInfo.ordersCount" class="counter mr25">{{ userInfo.ordersCount }}</i>
                        <i class="arr-rt"></i>
                    </span>
                </router-link>
                <router-link v-else class="block panel-chunk" :to="{name:'choseShopTmp'}">
                    <h3 class="icos4 i4-shop">我要开店</h3>
                    <i class="arr-rt"></i>
                </router-link>
                <router-link class="block panel-chunk " :to="{name:'mySetup'}">
                    <h3 class="icos4 i4-setup">设置</h3>
                    <i class="arr-rt"></i>
                </router-link>
            </nav>
        </div>
        <main-nav :current-nav-index="currentNavIndex"></main-nav>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            currentNavIndex: 4,
            userInfo: {}
        }
    },
    created: function () {
        var _this = this;

        // 个人中心页面信息
        this.$axios.get(this.$api.eIndex)
            .then(({ data, status }) => {
                let userInfo = data;

                // 登录时已保存了用户信息，但是信息相对基础，所以在个人中心在扩展一次
                _this.extendUserInfo(userInfo);

                // 更新到视图上
                _this.userInfo = userInfo;

            })
    },
    methods: {
        ...mapActions(['extendUserInfo'])
    }
}
</script>

<style>

</style>
