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
            <input @click.prevent="submitFn" type="submit" value="确认支付" class="btn btn-block btn-primary btn-lg"/>
        </div>
        <model-layer4 :layerData="layerData" @onclose="closeLayerFn" @paying="payValidatorFn"></model-layer4>

    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import {setRadio,utils} from '@/assets/js/common'
    import * as types from '@/store/mutation-types'
    import { Toast, Countdown } from 'vux'

    export default {
        components: {
            Toast,
            Countdown
        },
        data() {
            return {
                payType: 2,
                ordersId: '',
                isDisabled: false,
                layerData: {
                    visible: true
                },
                theuser: {}
            }
        },
        mounted() {
            this.payType = this.query.payType;
            this.ordersId = this.query.ordersId;
            // 支付方式：1支付宝支付 2微信支付 3银行支付 4余额支付 5货到付款
            var __theuser = JSON.parse(localStorage.getItem('__theuser'|| {}));
            // 挂载数据
            this.theuser = __theuser;
            bindEvent(this)
        },
        methods: {
            toastMsg(msg, type) {
                let that = this;
                this.$vux.toast.show({
                    text: msg,
                    type: 'text',
                    width: '24em',
                    position: 'middle',
                    onHide() {
                        if (type) {
                            that.$router.back();
                        }
                        that.isDisabled = false;
                    }
                })
            },
            // 支付成功处理
            paySuccess() {
                this.$router.back();
            },
            // 支付错误处理
            payFailure(result) {
                if (result.status === -7) { // 订单号错误
                    this.toastMsg('订单号码错误')
                    this.$router.push({path:'home'});
                    return false;
                } else if (result.status === -11) { // 密码验证失败
                    this.toastMsg('密码验证失败',false);
                    this.isDisabled = false;
                    return false;
                } else if (result.status === -14) { // 请设置支付密码
                    this.toastMsg('请设置支付密码',false);
                    this.$router.push({path:'changePassword',query:{type:'paypwd'}});
                    return false;
                }
            },
            // 支付处理
            submitFn() {
                console.log('this.ordersId----',this.ordersId+"===="+'this.payType----',this.payType);
                if (this.isDisabled) return;
                this.isDisabled = true;
                this.$axios.get(this.$api.wxpay,{params:{ordersId: this.ordersId}})
                    .then(({data})=>{
                        this.isDisabled = false;
                        console.log(data,'55455555555555555555555555555555555555555555555');
                        if (data.status == -7) { // 订单号错误
                            this.$router.push({path:'payWapWeChat',query:{ordersId:this.ordersId,'payPlant=XX':this.payType}})

                            this.layerData.visible = !this.layerData.visible;

                        } else if (data.status == -127) {
                            this.toastMsg(result.msg);
                            this.$router.push({path:'home'});
                        }
                        return false;
                    });
            },
            payValidatorFn(res){
                this.params.passwordPay = res;
                let submitData = qs.stringify(this.params)
                console.log(submitData,'666666666666666666666666666666666666')
                this.$axios.post(this.$api.withdraw,submitData)
                    .then(res => {
                        this.$notiejs({
                            state: 1,
                            msg: res.msg,
                            end() {
                                this.$router.push({path:'myWallet'});
                            }
                        })
                        this.closeLayerFn()
                    })},
            closeLayerFn() {
                this.layerData.visible = false;
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
        setRadio(function (status) {
            var _val = [],
                pay = Number( this.dataset.pay );

            if (status) {
                vm.payType = pay;
            }

        }, true, true)
    }
</script>

<style>

</style>
