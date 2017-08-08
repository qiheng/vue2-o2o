<template>
    <div class="p10 my-card-panel" v-cloak>
        <!--<loading v-show="loading"></loading>-->
        <template>
            <ul v-if="bankcardList.length" class="my-card-list mt10">
                <li v-for="bankcard in bankcardList" @click="goDetail(bankcard)" class="panel-item clearfix my-card-opt" :key="bankcard.usersBankId">
                    <router-link :to="{name:'bankCardDetail'}">
                        <img class="pull-left mr10 radius50" width="36" height="36" :src="bankcard.bankPic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt="" />
                        <div class="bfc-panel">
                            <h2 class="f16">{{ bankcard.bankName }}</h2>
                            <p class="gray mt10 f20">{{ bankcard.bankCardNo }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <empty v-else :msg="emptyMsg">
                <img slot="icon" width="180" src="images/empty/img_wyhk@2x.png" alt="" />
            </empty>
        </template>
        <!-- 添加卡 start -->
        <div class="J-pay-pwd mt30">
            <!--<router-link @click.prevent="isSetPasswordPay" href="javascript:;" class="btn btn-lg btn-block btn-primary">添加银行卡</router-link>-->
            <router-link v-if="status==1" :to="{name:'addBankCard'}" class="btn btn-lg btn-block btn-primary">添加银行卡</router-link>

            <router-link v-else :to="{name:'changePassword'}" class="btn btn-lg btn-block btn-primary">添加银行卡</router-link>

        </div>
        <!-- 添加卡 end -->
        <router-link :to="{name:'myWallet'}" class="go-back"></router-link>
    </div>
    <!-- 银行卡 end -->
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            emptyMsg: {
                mainMsg: '还没有绑定银行卡呢~',
                subMsg: '绑定后购物更放心'
            },
            status:'',
            bankcardList: []
        }
    },
    created: function () {
        var _this = this;

        // 页面初始化银行卡
        this.loading = true;
        this.$axios.get(this.$api.bankcardlist)
            .then(function (bankcardList) {
                _this.bankcardList = bankcardList.data;
                _this.$nextTick(function () {
                    //                        _this.pressToggle($('.my-card-opt'));
                })
            });

        this.$axios.get(this.$api.issetpasswordpay)
            .then(function(data){
                _this.status = data.data.isSet;
                console.log(_this.status,'+++++++++++++++++++++++++++++++++++++++++++++++++++');
            });
        // .always(function () {
        //                _this.loading = false;
        //            })
    },
    methods: {
        // 是否设置了支付密码
        isSetPasswordPay: function () {
            alert('xxx');
            // 检测回调
//            var cb = function (result) {
//                if (result.isSet === 1) { // 1设置过
//                    redirect_url('/add-bank-card.html');
//                } else { // 0未设置过
//                    redirect_url('change-password.html?type=paypwd');
//                }
//            };

            // 检测是否设置过支付密码
//            _A.issetpasswordpayData(cb)
//            var _this = this;
//            this.$axios.get(this.$api.issetpasswordpay)
//                .then(function(data){
////                    console.log(data,'+++++++++++++++++++++++++++++++++++++++++++++++++++');
//                        _this.status = data.isSet;
//                        console.log(_this.status,'+++++++++++++++++++++++++++++++++++++++++++++++++++');
//                    });
        },
        // 显示解绑按钮
        pressToggle: function pressToggle($el) {
            $el.hammer().bind("press", function (evt) {
                var $target = $(evt.target),
                    oGesture = evt.gesture;

                if ($target.hasClass('expanded')) {
                    $target.removeClass('expanded');
                } else {
                    $target.addClass('expanded');
                }

                return false;
            });
        },
        // 解绑银行卡
//        unbindCard: function (usersBankId, index) {
//            payPwdLayer(function (layero, idx) {
//                var $inpt = $(layero).find('.int-pwd'), _val;
//
//                // 处理密码
//                $inpt.off('keyup').on('keyup', function () {
//                    _val = $.trim($inpt.val());
//
//                    if (/^\d{6}$/.test(_val)) {
//                        _A.getUnsetBankCardData({ usersBankId: usersBankId }, function () {
//                            _this.bankcardList.splice(index, 1);
//                            layer.close(idx);
//                        });
//                    }
//
//                })
//
//            });
//        },
        goDetail: function (bankCardDetail) {
            if (!bankCardDetail) return;
            localStorage.setItem('__bankCardDetail', JSON.stringify(bankCardDetail))
        }
    }
}
</script>