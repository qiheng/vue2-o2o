<template>

    <form class="fm-control fm-login" action="/out/login" method="POST">
        <!--<div class="login-line">
            <div class="text-center logo-area">
                <img width="120" height="118" src="images/logo.png" alt="同城生活通" />
            </div>
        </div>-->
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label l-account" for="phone"></label>
                <input id="phone" type="tel" v-model.number="params.phone"  placeholder="请输入手机号" maxlength="15" autofocus="autofocus" tabindex="1" autocomplete="off" />
            </div>
            <div class="fm-line">
                <label class="l-label l-pwd"></label>
                <input v-show="!showPwd" id="password" type="password" class="protect-pwd" data-rel="public-pwd" v-model="params.password" placeholder="6-20位字母、数字组合" maxlength="20" tabindex="2" autocomplete="off" />
                <input v-show="showPwd" type="text" class="public-pwd" data-rel="protect-pwd" v-model="params.password" placeholder="6-20位字母、数字组合" maxlength="20" autocomplete="off" />
                <span @click="Jswitch" class="J-btn-switch btn-switch" :class="{checked: showPwd}"></span>
            </div>
        </div>

        <div class="container mt30">
            <!--
                当表单验证不通过时，按钮 添加 disabled 的类，去除 btn-primary类， 反之表单有效添加 btn-primary ，去除 disabled
            -->
            <input @click.prevent="submitFn" type="submit" value="登录" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}" tabindex="3"/>

            <p class="mt15"><a class="pull-right" href="find-password.html">找回密码</a><a href="register.html">手机快速注册</a></p>
        </div>
        <!-- 第三方登录 -->
        <div class="container mt30 thirdparty-line">
            <div class="lightgray f16 tit" data-tit="第三方登录"></div>
            <div class="bd pt10">
                <a class="btns-wx" href="javascript:;"></a>
            </div>
        </div>
    </form>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import validator from '@/assets/js/validator'

export default {
    data () {
        return {
            showPwd: false,
            isDisabled: false,
            params: {
                phone: '18664980500',
                password: '123456'
            }
        }
    },
    created () {
        this.init();
    },
    methods: {
        ...mapActions(['recordUserInfo']),
        init () {

            if (this.userInfo && this.userInfo.usersId) {
                this.forward();
            }

            // 登录
            validator.config = {
                phone: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}],
                password: [{strategy: 'isNonEmpty', errorMsg: '请输入密码！'}, {strategy: 'isPassword'}]
            }

        },
        forward () {
            var _this = this;

            // 登录后跳转回来源页面
            if (_this.$route.query.redirect) {
                _this.$router.replace(_this.$route.query.redirect)
            } else {
                _this.$router.back();
            }
        },
        Jswitch () {
            this.showPwd = !this.showPwd;
        },
        submitFn () {
            let _this = this,
                oValChar = {};

            if (this.isDisabled) return;
            this.isDisabled = true;

            // 校验字段
            $.each(validator.config, key => {
                oValChar[key] = _this.params[key]
            });

            console.log('oValChar:',oValChar)

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

            this.$axios.post('/out/login', this.params)
                .then(({status, data}) => {

                    if (data.status == 1) {
                        console.log('_this.$router:',_this.$router)
                        console.log('_this.$route:',_this.$route)

                        // 记录用户信息到vuex中
                        _this.recordUserInfo(data.data);

                        // 登录后跳转回来源页面
                        _this.forward();

                    } else if (data.status == -90) {
                        alert(data.msg);
                        _this.forward();
                    } else {

                        // todo
                        _this.$notiejs.top({
                            state: 2,
                            msg: data.msg,
                            end () {
                                _this.isDisabled = false
                            }
                        });

                        return false;
                    }

                })
                .catch((e) => {
                    _this.isDisabled = false;
                })
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    }
}


</script>

<style>

</style>
