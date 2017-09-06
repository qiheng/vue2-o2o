<template>
    <form class="fm-control pb60" action="/" method="POST">

        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label pull-left mr15">类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <div class="self-slt">
                    <select name="cardType" class="slt" v-model="parma.cardType">
                        <option value="0">储蓄卡</option>
                        <option value="1">信用卡</option>
                    </select>
                </div>
            </div>
            <div class="fm-line">
                <label class="l-label pull-left mr15">银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <div class="self-slt">
                    <select name="bankId" class="J-banklist-slt slt" v-model="parma.bankId">
                        <option v-for="list in bank" :value="list.bankId">{{list.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label">银行卡号</label>
                <input type="text" name="bankCardNo" placeholder="请输入存储卡卡号" v-model="parma.bankCardNo"/>
            </div>
            <div class="fm-line">
                <label class="l-label">持卡人&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" name="name" placeholder="姓名"  v-model="parma.name"/>
            </div>
            <div class="fm-line">
                <label class="l-label">身份证&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" name="idCardNo" placeholder="请正确填写身份证号" v-model="parma.idCardNo"/>
            </div>
            <div class="fm-line">
                <label class="l-label">开户行&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" name="bankSubname" placeholder="请输入开户支行" v-model="parma.bankSubname" />
            </div>
        </div>


        <p class="container ptb15 gray"><label for="protocol"><input id="protocol" type="checkbox" checked="checked">&nbsp;我已阅读并同意</label>
            <router-link class="blue" :to="{name:'bankcardpage'}">《银行卡支付协议》</router-link>
        </p>

        <div class="container mt30">
            <input type="submit" value="绑定" @click.prevent="submitFn" class="btn btn-block btn-primary btn-lg" />
        </div>

        <model-layer4 :layerData="layerData" @onclose="closeLayerFn" @paying="payValidatorFn"></model-layer4>

    </form>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import validator from '@/assets/js/validator'
    import qs from 'qs'

    export default {
        data(){
            return{
                parma:{
                    cardType:'',
                    bankId :'',
                    bankCardNo:'',
                    name:'',
                    idCardNo:'',
                    bankSubname:'',
                    passwordPay:''
                },
                bank:'',
                _para:{},
                isDisabled:false,
                layerData: {
                    visible: false
                },
            }
        },
        mounted:function(){
            this.getBankListData();
            validator.config = {
                cardType: [{strategy: 'isNonEmpty', errorMsg: '请选择银行卡类型！'}],
                bankId: [{strategy: 'isNonEmpty', errorMsg: '请选择您的所属银行！'}],
                bankCardNo: [{strategy: 'isNonEmpty', errorMsg: '请输入您的银行卡号！'}, {strategy: 'isBankCard'}],
                name: [{strategy: 'isNonEmpty', errorMsg: '请输入您的姓名！'}],
                idCardNo: [{strategy: 'isNonEmpty', errorMsg: '请输入您的身份证号！'}, {strategy: 'isIdCard'}],
                bankSubname: [{strategy: 'isNonEmpty', errorMsg: '请输入您的开户支行！'}]
            };
        },
        methods: {
            // 填充银行卡选择
            getBankListData: function () {
                var _this = this;
                this.$axios.get(this.$api.banklist)
                    .then(function(bankList){
                        _this.bank = bankList.data;
                        console.log(_this.bank);
                    })
            },
            // 错误提示
            errorTips: function () {
                var vm = this;

                if (!validator.validate(oValChar, true)) {
                    return $.each(validator.messages, (i, val) => {
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

        },
            // 提交处理
        submitFn: function () {
            var vm = this,
                    oValChar = {};
            if (vm.isDisabled) return;
            vm.isDisabled = true;

            // 校验字段
            $.each(validator.config, function (key) {
                var val = vm.parma[key];
                oValChar[key] = val
            });
            // 校验表单
                var vm = this;

                if (!validator.validate(oValChar, true)) {
                    return $.each(validator.messages, (i, val) => {
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
            //this.payValidatorFn();

            // 回调
            var successFn = function () {
            //返回银行卡列表
                vm.$notiejs({
                    state: 1,
                    msg: '添加成功',
                    end() {
                        vm.$router.push({ path: 'myBankInfo' })
//                        redirect_url(_backUrl);
                    }
                });
            },
                errorFn = function () {
                    if (result.status === -11) { // 密码验证失败
                        vm.$notiejs({
                            state: 1,
                            msg: result.msg,
                            end() {
                            vm.isDisabled = false;
                            }
                        });
                        return false;
                    }
                },
                payPwdLayer = function (layero, index) {
                    var $inpt = $(layero).find('.int-pwd'), _val;

                    // 处理密码
                    $inpt.off('keyup').on('keyup', function () {
                        if (/^\d{6}$/.test(_val)) {
                            layer.close(index);
                        }

                    }).focus();

                };
        },
        payValidatorFn : function(res){
        this.parma.passwordPay = res;
        let submitData = qs.stringify(this.parma)
            console.log(submitData)
        this.$axios.post(this.$api.savebankcard,submitData)
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
    }
}
</script>

<style scoped>
    .self-slt {display:block; overflow: hidden;}
</style>
