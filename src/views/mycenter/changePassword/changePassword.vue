<template>
    <!-- 表单 start -->
    <form class="fm-control fm-findPwd" action="/e/changepassword" method="POST">
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label l-account" for="phone"></label>
                <input id="phone" type="tel" name="phone" v-model="parma.phone"  placeholder="请输入绑定的手机号" maxlength="15" autofocus="autofocus" tabindex="1" autocomplete="off" />
            </div>
            <div class="fm-line l-code">
                <label class="l-label"></label>
                <input id="code" type="text" name="code" v-model="parma.code" placeholder="请输入验证码" style="width:50%" maxlength="6" tabindex="2" autocomplete="off">
                <a @click="getCode" href="javascript:;" class="btn get-verCode" :class="{disabled: isDisabled}">获取验证码</a>
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="nextSetup" type="submit" value="验证" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>

    </form>
    <!-- 表单 end -->
</template>

<script>
    import { mapActions } from 'vuex'
    import validator from '@/assets/js/validator'
    export default {
        data(){
            return{
                isDisabled: false,
                parma:{
                    phone:'',
                    code:'',
                },
                type:'',
                handlerFn: $.noop,
                url:'/',
                title:''
            }
        },
        created: function () {
            this.init();
//            const query = this.query;
//            if (query.type) {
//                this.type = query.type
//            }

            // 功能处理区分
//            switch (query.type) {
//                case 'loginpwd':
//                    _this.handlerFn = changepassword;
//                    _this.url = '/set-password.html?type=1&forward=user-info.html';
//                    _this.title = '修改登录密码';
//                    break;
//                case 'paypwd':
//                    _this.handlerFn =changepasswordpay;
//                    _this.url = '/set-pay-password.html';
//                    _this.title = '设置支付密码';
//                    break;
//            }

//            document.title = this.title;

        },
    //        mounted: function () {
//            bindEvent(this)
//        },
        methods: {
            init () {

//                if (this.userInfo && this.userInfo.usersId) {
//                    this.forward();
//                }

                validator.config = {
                    phone: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}],
                    code: {strategy: 'isNonEmpty', errorMsg: '请输入验证码！'}
                };

            },

            getCode: function ($e) {
                var _this = this,
                        btn = $e.target,
                        _phone = this.phone,
                        reg = validator.types.isMobile;

                if (this.isDisabled) return;
                this.isDisabled = true;

                if (_phone === '') {
                    this.$notiejs({
                        state: 2,
                        msg: '请填写手机的号码',
                    });
                    _this.isDisabled = false;

                } else if (!reg.validate(_phone)) {
                    this.$notiejs({
                        state: 2,
                        msg:reg.errorMsg,
                    });
                    _this.isDisabled = false;
                }
                else {
                    down_time_60s($(btn));

                    // 获取验证吗
                    this.$axios.get(this.$api.sendcodebychangepassword,{phone: _phone})
                        // 成功 TODO
                        .then(function(result){
                            _this.isDisabled = false;
                        })
                        .catch(function(result){
                            this.$notiejs({
                                state: 2,
                                msg:result.msg,
                            });
                            // 清除倒计时
                            down_time_60s.clear();
                            _this.isDisabled = false;
                            return false;
                        })
                }
            },
            nextSetup: function () {
                var vm = this,
                        _this = this,
                        oValChar = {};

                // 校验字段
                $.each(validator.config, function (key) {
                    var val = _this.$data[key];
                    oValChar[key] = val
                })

                // 校验表单
                    if (!validator.validate(oValChar, true)) {
                        return $.each(validator.messages, (i, val) => {
                            _this.$notiejs({
                                state: 2,
                                msg: val,
                                end () {
                                _this.isDisabled = false
                                }
                            });
                            return false;
                    })
                }



                // 提交处理
                this.handlerFn(oValChar, function () {
                    _this.$notiejs({
                        state : 1,
                        msg: '保存成功',
                        end(){
                            redirect_url(vm.url)
                        }
                    })
                }, function (result) {
                    // 手机验证码错误
                    if (result.status == -9) {
                        _this.$notiejs({
                            state: 2,
                            msg: result.msg,
                            end () {
                            vm.isDisabled = false
                            }
                        });
                        return false;
                    }

                });
            }
        },
        computed: {
            query() {
                return this.$route.query
            }
        }

    }
//    // 注册事件
//    function bindEvent(vm) {
//        // 表单验证配置
//        validator.config = {
//            phone: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}],
//            code: {strategy: 'isNonEmpty', errorMsg: '请输入验证码！'}
//        };
//
//    }

</script>

<style>

</style>