<template>
    <div class="wallet-recharge" v-cloak>
        <div class="panel-nobrd">
            <div class="panel-bd">
                <ul class="list-fl lightgray choose-price">
                    <li @click="choosePrice(index)" v-for="(price, index) in priceList" :class="{on:currentInded === index && !otherPrice}"><i>&yen;</i>{{price}}</li>
                </ul>
                <dl class="int-price mb5">
                    <dt @click="otherPriceFn" class="clearfix">
                        <span class="pull-right" :class="{toLeft:otherPrice}">其他金额</span>
                    </dt>
                    <dd v-if="otherPrice" class="mt10">
                        <label class="l-label">&yen;</label>
                        <input type="text" name="price" v-model.number="price" placeholder="请输入充值金额"/>
                    </dd>
                </dl>
            </div>
        </div>

        <div class="mt10 ">
            <div class="panel pay-choose-way gray">
                <div class="panel-chunk J-radio">
                    <img width="45" height="46" src="../../../assets/images/pay-wx.png" alt=""/>
                    微信充值
                    <i class="i-radio pos-rt-middle" data-pay="0" :class="{checked:true}"></i>
                </div>
            </div>
        </div>
        <div class="container mt30">
            <a @click.prevent="submitFn" href="javascript:;" class="btn btn-block btn-success btn-lg" :class="{disabled:isDisabled}">立即充值</a>
        </div>
        <div v-show="show6">
            <toast v-model="show6" type="text" width="20em">{{'请输入充值金额'}}</toast>
        </div>
        <div v-show="show7">
            <toast v-model="show7" type="text" width="20em">{{'支付成功'}}</toast>
        </div>
        <div v-show="show8">
            <toast v-model="show7" type="text" width="20em">{{'请选择支付方式'}}</toast>
        </div>
    </div>
</template>

<script>
    import { Toast, Group, XSwitch, XButton } from 'vux'
    export default {
        components: {
            Toast,
            Group,
            XSwitch,
            XButton
        },
        data() {
            return {
                price:'',
                currentInded:0,
                // 充值方式
                payTpye:0,
                otherPrice: false,
                priceList:[30,50,100,300,500,1000],
                isDisabled: false,
                show6: false,
                show7: false,
                show8: false

            }
        },
        created: function () {
            this.price = this.priceList[this.currentInded]
        },
        mounted: function () {
            var _this = this;
        },
        methods: {
            choosePrice: function (index) {
                this.currentInded = index;
                this.price = this.priceList[index]
            },
            otherPriceFn: function () {
                this.otherPrice = !this.otherPrice;

                if (!this.otherPrice) {
                    this.price = this.priceList[this.currentInded]
                } else {
                    this.price = '';
                }
            },
            submitFn: function () {

                var _price = $.trim( this.price),
                    _this = this ;

                if (this.isDisabled) return;
                _this.isDisabled = true;

                if (!/(^0.\d+$)|(^[1-9]\d*.\d*$)|(^[1-9]\d*$)/.test( _price )) {
                    _this.price = '';

//                    return layer.msg('请输入充值金额', function () {
//                        _this.isDisabled = false;
//                    })
                    this.show6 = true;
                    console.log(this.show6,'++++++++++++++++++++');
                    _this.isDisabled = false;
                }


                switch(Number(this.payTpye)) {
                    case 0: // 公众号 微信

                        this.$axios.get(this.$api.recharge2wxpay,{params:{'price': _price, 'openid': '1314156'}})
                            .then(function (result) {
                                _this.isDisabled = false;

                                var config = {
                                    'appId'    : result.appId,     //公众号名称，由商户传入
                                    'timeStamp': result.timeStamp,         //时间戳，自1970年以来的秒数
                                    'nonceStr' : result.nonceStr, //随机串
                                    'package'  : result.package,
                                    'signType' : result.signType         //微信签名方式：
                                    ,'paySign'  : result.paySign //微信签名
                                };

                                WeixinJSBridge.invoke(
                                    'getBrandWCPayRequest', config,
                                    function(res){
                                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {

                                            redirect_url('result?t=chongzhi');
                                        }
                                    }
                                );
                            })
                        break;
                    case 1:
                        payPwdLayer(function (layero, index) {
                            var $inpt = $(layero).find('.int-pwd'), _val;
                            // 处理密码
                            $inpt.off('keyup').on('keyup', function () {
                                _val = $.trim($inpt.val());

                                if (/^\d{6}$/.test(_val)) {

                                    // 银联充值
//                                    layer.msg('支付成功', function () {
//                                        //redirect_url('/');
//                                    })
                                    this.show7= true;
                                }

                            })

                        })
                        break;
                    default :
//                        layer.msg('请选择支付方式', function () {
//                            _this.isDisabled = false;
//                        });
                        _this.show8 = true;
                        _this.isDisabled = false;
                        break;
                }

            },

            onHide () {
                console.log('on hide')
            },
            onChange (val) {
                const _this = this
            }
        }
    }
</script>

<style>
    .pay-choose-way .i-radio {
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .int-price span {
        position: relative;
        right: 0;
        transition: all .5s;
    }
    .int-price .toLeft {
        right: calc(100% - 56px);
    }
</style>
