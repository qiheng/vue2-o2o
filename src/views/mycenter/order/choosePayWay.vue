<template>
    <div>
        <div class="panel pay-select-panel">
            <!-- 支付方式选择 start -->
            <div class="pay-select-way">
                <div class="pay-select-otps" data-pay="0">
                    <i class="pay-weixin"></i>微信支付
                    <span class="i-radio"></span>
                </div>
                <div class="pay-select-otps"  data-pay="1">
                    <i class="pay-balance"></i>账户余额付款
                    {{theuser}}
                    <ins id="balance" class="emb-red f12 ml10">余额{{ theuser }}元</ins>
                    <span class="i-radio"></span>
                </div>
                <div class="pay-select-otps"  data-pay="2">
                    <i class="pay-hdfk"></i>货到付款
                    <span class="i-radio"></span>
                </div>
            </div>
            <!-- 支付方式选择 end -->
        </div>

        <div class="container mt30">
            <input type="submit" value="确认支付" class="btn btn-block btn-primary btn-lg"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                payType: 2,
                ordersId: '',
                isDisabled: false,
                theuser: {}
            }
        },
        mounted: function () {
            this.payType = this.query.payType || 2;
            this.ordersId = this.query.ordersId || '';
            // 支付方式：1支付宝支付 2微信支付 3银行支付 4余额支付 5货到付款
            var __theuser = JSON.parse(localStorage.getItem('__theuser'|| {}));
            // 挂载数据
            this.theuser = __theuser;
            bindEvent(this)
        },
        methods: {
            // 支付成功处理
            paySuccess: function () {
                redirect_url('result.html?t=pay');
            },
            // 支付错误处理
            payFailure: function (result) {
                var _this = this;

                if (result.status === -7) { // 订单号错误
                    layer.msg(result.msg, {icon:2}, function () {
                        redirect_url(config.index);
                    });
                    return false;
                } else if (result.status === -11) { // 密码验证失败
                    layer.msg(result.msg, {icon:2}, function () {
                        _this.isDisabled = false;
                    });
                    return false;
                } else if (result.status === -14) { // 请设置支付密码
                    layer.msg(result.msg, {icon:2}, function () {
                        redirect_url('change-password.html?type=paypwd');
                    });
                    return false;
                }
            },
            // 支付处理
            submitFn: function () {
                var _this = this;
                console.log('this.ordersId----',this.ordersId+"===="+'this.payType----',this.payType);
                if (_this.isDisabled) return;
                _this.isDisabled = true;

                _this.$axios.get(_this.$api.wxpay,{params:{orderid: this.ordersId}})
//                    redirect_url('payWapWeChat?orderid=' + _this.ordersId + '&payPlant=XX' + _this.payType);
                        .then(function (result) {
                            _this.isDisabled = false;

                            if (result.status == -7) {
                                redirect_url('payWapWeChat?orderid=' + _this.ordersId + '&payPlant=XX' + _this.payType);
                            } else if (result.status == -127) {
                                layer.msg(result.msg, {icon:2}, function () {
                                    redirect_url(config.index);
                                });
                            }
                            return false;
                    });
//                _A.orderQueryData({orderid: this.ordersId}, function () {
//                    redirect_url('payWapWeChat?orderid=' + _this.ordersId + '&payPlant=XX' + _this.payType);
//                }, function (result) {
//
//                    _this.isDisabled = false;
//
//                    if (result.status == -7) {
//                        redirect_url('payWapWeChat?orderid=' + _this.ordersId + '&payPlant=XX' + _this.payType);
//                    } else if (result.status == -127) {
//                        layer.msg(result.msg, {icon:2}, function () {
//                            redirect_url(config.index);
//                        });
//                    }
//
//                    return false;
//                });
            }
        },
        computed: {
//            ...mapGetters(['config']),
            isHdfk: function () {
                // return this.ordersItem.shop.shopTypeId == config.shopTypeId.spws && this.ordersItem.payType === this.HDFK_VAL
            },
            query () {
                return this.$route.query
            }
        }
    }
    // 注册事件
    function bindEvent(vm) {

        // 支付方式选择
//        setRadio(function (status) {
//            var _val = [],
//                pay = Number( this.dataset.pay );
//
//            if (status) {
//                vm.payType = pay;
//            }
//
//        }, true, true)
    }
</script>

<style>

</style>
