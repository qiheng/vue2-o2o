<template>
    <!-- 表单 start -->
    <form class="fm-control withdraw-deposit" action="/" method="POST" v-cloak>

        <div class="mt10">
            <dl class="container int-price">
                <dt class="">提现金额</dt>
                <dd class="pb10 mt10">
                    <label class="l-label">&yen;</label>
                    <input type="tel" name="price" v-model.number="params.price" placeholder="请输入提现金额"/>
                </dd>
            </dl>
            <input type="hidden" name="passwordPay" />
            <div class="panel to-bank-panel">
                <h3 class="p10 gray">到账银行卡</h3>
                <input type="hidden" name="usersBankId" v-model="params.usersBankId"/>
                <ul class="to-bank-list">
                    <li v-for="(bankcardItem,index) in bankcardList" class="panel-chunk J-radio">
                        <img width="30" height="30" :src="bankcardItem.bankPic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt=""/>
                        {{bankcardItem.bankName}}（{{bankcardItem.bankCardNo.substr(-4)}}）
                        <i class="i-radio pos-rt-middle" :class="{'checked':active == index}" @click="click(bankcardItem,index)"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="提现" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
        <model-layer4 :layerData="layerData" @onclose="closeLayerFn" @paying="payValidatorFn"></model-layer4>
    </form>
    <!-- 表单 end -->
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import validator from '@/assets/js/validator'
    import qs from 'qs'
    export default {
        data() {
            return {
                isDisabled: false,
                bankcardList: [],
                params:{
                    price:'',
                    usersBankId:'',
                    passwordPay:''
                },
                active: -1,
                index:'',
                checked:false,
                layerData: {
                    visible: false
                },
            }
        },
        created: function () {
            var _this = this;

            // 初始化银行卡列表
            this.$axios.get(this.$api.bankcardlist)
                .then(function (bankcardList) {
                    _this.bankcardList = bankcardList.data;
                    bankcardList.data.forEach(function (key,val) {
                        _this.checked = true;
                        key.isshow = false;
                        console.log(key)
                    })
                });
        },
        mounted: function () {
            validator.config = {
                price: [{strategy: 'isNonEmpty', errorMsg: '请输入提现金额'}, {strategy: 'isIntege1'}],
                usersBankId: [{strategy: 'isNonEmpty', errorMsg: '请选择银行卡'}]
            };
        },
        methods: {
            click: function(bankcardItem,index) {
                this.active = index;
                this.params.usersBankId = bankcardItem.usersBankId
                console.log(bankcardItem.usersBankId)
            },
            submitFn: function () {
                var oValChar = {},
                    vm = this;

                if (vm.isDisabled) return;
                vm.isDisabled = true;

                // 校验字段
                $.each(validator.config, function (key) {
                    var val = vm.params[key];
                    oValChar[key] = val
                });

                // 校验表单
                if (!validator.validate(oValChar, true)) {

                    return $.each(validator.messages, function (i, val) {
                        vm.$notiejs({
                            state: 2,
                            msg: val,
                            end() {
                                vm.isDisabled = false
                            }
                        });
                        return false;
                    })

                }
                this.layerData.visible = !this.layerData.visible;
                console.log(this.params,'6666666666666666666666666666666666666666666666666666666')
                // 提现处理
//                payPwdLayer(function (layero, index) {
//                    var $inpt = $(layero).find('.int-pwd'), _val;
//                    // 处理密码
//                    $inpt.off('keyup').on('keyup', function () {
//                        _val = $.trim($inpt.val());
//
//                        if (/^\d{6}$/.test(_val)) {
//                            oValChar['passwordPay'] = _val;
//
//                            this.$axios.get(this.$api.withdraw)
//                                .then(function () {
//                                    vm.$notiejs({
//                                        state: 1,
//                                        msg: '提现成功',
//                                        end() {
//                                            redirect_url('result.html?t=tixian');
//                                        }
//                                    });
//                                })
//                                , function noFn(result) {
//                                vm.isDisabled = false;
//
//                                if (result.status === -11) { // 密码验证失败
//                                    vm.$notiejs({
//                                        state: 2,
//                                        msg: result.msg,
//                                        end() {
//                                            return false;
//                                        }
//                                    });
//                                }
//
//                                if (result.status === -15) { // 余额不足
//                                    vm.$notiejs({
//                                        state: 2,
//                                        msg: result.msg,
//                                        end() {
//                                            return false;
//                                        }
//                                    });
//                                }
//
//                                if (result.status === -17) { // 提现金额太小
//                                    vm.$notiejs({
//                                        state: 2,
//                                        msg: result.msg,
//                                        end() {
//                                            return false;
//                                        }
//                                    });
//                                }
//                            }
//                        }
//                    })
//                })
            },
            payValidatorFn : function(res){
                this.params.passwordPay = res;
                let submitData = qs.stringify(this.params)
                console.log(submitData,'666666666666666666666666666666666666')
                this.$axios.post(this.$api.withdraw,submitData)
                    .then(res => {
                        this.$notiejs({
                            state: 1,
                            msg: res.msg,

                        })
                        this.closeLayerFn()
                    })},
            closeLayerFn() {
                this.layerData.visible = false;
            }
        },
    }

</script>

<style scoped>
    .self-slt {display:block; overflow: hidden;}
    .kai{
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        top: 50%;
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .dui{
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        left: 5px;
    }
    .choose-radio{width: 20px;  height: 20px;  position: absolute;  opacity: 0; right: 0px;z-index: 99;}
    .choose-radio:checked{
        opacity: 1;
    }
</style>
