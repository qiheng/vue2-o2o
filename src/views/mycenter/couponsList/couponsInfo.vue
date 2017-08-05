<template>
    <!-- 兑换优惠券 -->
    <div class="coupons-wrap" v-cloak>
        <div class="panel-item">
            <div class="exchange-link">
                <router-link :to="{name:'couponsAdd'}" class="btn btn-block btn-lg btn-primary">添加优惠券</router-link>
            </div>
        </div>
        <template v-if="!isChoose">
            <div class="coupons-tabNav panel-item">
                <div @click.capture="tabmeunFn" class="list-fl">
                    <a v-for="(tabmeun, index) in tabMeuns" :data-type="index + 1" :key="index" class="list-item" :class="{on: tabMeunIndex === (index+1)}" href="javascript:;">{{tabmeun}}</a>
                </div>
            </div>
        </template>
        <div class="coupons-list">
            <loading v-show="loading"></loading>
            <template v-if="!loading">
                <template v-if="couponList.length">
                    <div v-for="(couponItem, index) in couponList"
                         :class="'coupons-option mb10'+(couponItem.status !=1 ? ' coupons-noused' :'')"
                         :key="couponItem.couponId">
                        <a @click.prevent="isChoose && choose(index)" href="javascript:;" :data-coupon-id="couponItem.couponId">
                            <div class="coupons-num">
                                <p class="yh-price mt20">&yen;
                                    <i class="f30">{{ couponItem.sub }}</i>
                                </p>
                                <p class="f12">满{{ couponItem.attain }}减{{ couponItem.sub }}</p>
                            </div>
                            <div class="bfc-panel coupons-info ">
                                <h3 class="nowrap">{{ couponItem.name }}</h3>
                                <p class="nowrap f12 mt5">{{ couponItem.summary }}</p>
                                <p class="lightgray f12 mt5">有效期：{{ couponItem.etime }}</p>
                            </div>
                            <i v-if="couponItem.status == 3" class="i-coupons-used"></i>
                            <i v-if="couponItem.status == 4" class="i-coupons-end"></i>
                        </a>
                    </div>
                </template>
                <empty v-else :msg="emptyMsg">
                    <img slot="icon" width="80" src="../../../assets/images/empty/img_wyhq@2x.png" alt="" />
                    <a slot="button" href="/" class="btn btn-default mt20">返回首页</a>
                </empty>
            </template>
        </div>
        <a href="my-center.html" class="go-back"></a>
    </div>
</template>
<script>

import { mapActions } from 'vuex'
import qs from 'qs'

export default {
    data() {
        return {
            loading: true,
            emptyMsg: {
                mainMsg: '很糟糕，无优惠券~'
            },
            tabMeunIndex: 1, // 默认未使用
            tabMeuns: ['未使用', '已使用', '已过期'],
            param: {
                type: 1
            },
            couponList: [],
        }
    },
    created () {
        this.getCouponList();
    },
    methods: {
        getCouponList () {
            var _this = this;

            _this.loading = true;
            let types = qs.stringify(this.param);

            this.$axios.get(this.$api.couponlist + '?' + types)
                .then(({data, status}) => {
                    _this.loading = false;
                    _this.couponList = data;
                })
        },
        tabmeunFn: function (ev) {
            var target = ev.target;
            this.param.type = this.tabMeunIndex = +target.dataset.type;
            this.getCouponList()
        },
        choose: function (index) {
            var couponItem = this.couponList[index];

            if (this.orderParam) {
                this.orderParam.couponId = couponItem.couponId;

                // 存储在本地
                store.set('__orderParam', this.orderParam);

                redirect_url(forward())
            }
        }
    },
    computed: {
        isChoose: function () {
            return false
        }
    }
}

</script>
