<template>
    <!-- 表单 start -->
    <form class="fm-control withdraw-deposit" action="/" method="POST" v-cloak>

        <div class="mt10">

            <dl class="container int-price">
                <dt class="">提现金额</dt>
                <dd class="pb10 mt10">
                    <label class="l-label">&yen;</label>
                    <input type="tel" name="price" v-model.number="price" placeholder="请输入提现金额"/>
                </dd>
            </dl>
            <input type="hidden" name="passwordPay" />
            <div class="panel to-bank-panel">
                <h3 class="p10 gray">到账银行卡</h3>
                <input type="hidden" name="usersBankId" v-model="usersBankId"/>
                <ul class="to-bank-list">
                    <li v-for="(bankcardItem,index) in bankcardList" class="panel-chunk J-radio" @click="setRadio(index)">
                        <img width="30" height="30" :src="bankcardItem.bankPic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt=""/>
                        <!--{{bankcardItem.bankName}}（{{bankcardItem.bankCardNo.substr(-4)}}）-->
                        {{bankcardItem.isshow}}
                        <i class="i-radio  pos-rt-middle" :data-users-bank-id="bankcardItem.usersBankId"  :class="{checked:bankcardItem.isshow}"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="提现" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
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
                usersBankId: '',
                price: '',
                index:'',
            }
        },
        created: function () {
            var _this = this;

            // 初始化银行卡列表
            this.$axios.get(this.$api.bankcardlist)
                .then(function (bankcardList) {
                    _this.bankcardList = bankcardList.data;
                    bankcardList.data.forEach(function (key,val) {
//                        key.splice(0,0,{
//                            isshow:false
//                        })
                        key.isshow = false;
                        console.log(key)
                    })
                    // 绑定事件
                    _this.$nextTick(function () {
                        bindEvent(_this);
                    })
                });
        },
        mounted: function () {
        },
        methods: {
            setRadio:function (index) {
                var _this = this;
                _this.index = _this.bankcardList[index].usersBankId;
                //_this.bankcardList[index].isshow = true;
                console.log(_this.bankcardList[index],'9+++++++++++++++++++++++++++++++');
//                console.log(_this.bankcardList[index].usersBankId);
//                _this.index.closest('li').addClass('checked').siblings().removeClass('checked');

            },
            submitFn: function () {
                var oValChar = {},
                    vm = this;

                if (vm.isDisabled) return;
                vm.isDisabled = true;

                // 校验字段
                $.each(validator.config, function (key) {
                    var val = vm.$data[key];
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

                // 提现处理
                payPwdLayer(function (layero, index) {
                    var $inpt = $(layero).find('.int-pwd'), _val;
                    // 处理密码
                    $inpt.off('keyup').on('keyup', function () {
                        _val = $.trim($inpt.val());

                        if (/^\d{6}$/.test(_val)) {
                            oValChar['passwordPay'] = _val;

                            this.$axios.get(this.$api.withdraw)
                                .then(function () {
                                    vm.$notiejs({
                                        state: 1,
                                        msg: '提现成功',
                                        end() {
                                            redirect_url('result.html?t=tixian');
                                        }
                                    });
                                })
                                , function noFn(result) {
                                vm.isDisabled = false;

                                if (result.status === -11) { // 密码验证失败
                                    vm.$notiejs({
                                        state: 2,
                                        msg: result.msg,
                                        end() {
                                            return false;
                                        }
                                    });
                                }

                                if (result.status === -15) { // 余额不足
                                    vm.$notiejs({
                                        state: 2,
                                        msg: result.msg,
                                        end() {
                                            return false;
                                        }
                                    });
                                }

                                if (result.status === -17) { // 提现金额太小
                                    vm.$notiejs({
                                        state: 2,
                                        msg: result.msg,
                                        end() {
                                            return false;
                                        }
                                    });
                                }
                            }
                        }
                    })
                })
            }
        },
    }

    // 注册事件
    function bindEvent(vm) {
        // 配置验证信息
        validator.config = {
            price: [{strategy: 'isNonEmpty', errorMsg: '请输入提现金额'}, {strategy: 'isIntege1'}],
            usersBankId: [{strategy: 'isNonEmpty', errorMsg: '请选择银行卡'}]
        };



        $('.J-radio').eq(0).trigger('click');
    }

</script>

<style scoped>
    .self-slt {display:block; overflow: hidden;}
</style>
