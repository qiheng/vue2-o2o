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

            <p class="mt15">
                <router-link class="pull-right" :to="{name:'findPassword'}">找回密码</router-link>

                <router-link :to="{name:'register'}">手机快速注册</router-link>
                <!--<a href="javascript:;" @click="logout">退出</a>-->

            </p>
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
    mounted () {
        const _this = this;
    },
    methods: {
        ...mapActions(['recordUserInfo']),
        init () {

            if (this.userInfo && this.userInfo.usersId) {
                this.forward();
            } else {
                this.getTheUser();
            }

            // 登录
            validator.config = {
                phone: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}],
                password: [{strategy: 'isNonEmpty', errorMsg: '请输入密码！'}, {strategy: 'isPassword'}]
            }

        },
        // 回退跳转
        forward () {
            var _this = this;

            // 登录后跳转回来源页面
            if (_this.$route.query.redirect) {
                console.log('url1==',_this.$route.query.redirect)
                _this.$router.replace({
                    path: _this.$route.query.redirect
                })
            } else {
                console.log('url2')
                _this.$router.replace({
                    path: '/'
                })
            }
        },
        // 退出
        logout () {
            const _this = this;

            this.$axios.get(this.$api.logout)
                .then(() => {
                _this.$notiejs({
                    state: 1,
                    msg: '退出成功',
                    end () {
                        _this.isDisabled = false
                    }
                });
            })
        },
        Jswitch () {
            this.showPwd = !this.showPwd;
        },
        // 获取用户信息
        getTheUser () {
            this.$axios.post(this.$api.theuser)
                .then(({data, msg, status}) => {
                    this.saveUserInfo(data)
                    this.forward();
                })
        },
        // 保存并更新用户的信息
        saveUserInfo (user) {
            // 记录用户信息到vuex中
            this.recordUserInfo(user);

            // 缓存用户信息到 sessionStorage 中
            window.sessionStorage.userInfo = JSON.stringify(user);
        },
        // 登录提交
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

            this.$axios.post(this.$api.login, $.param(this.params))
                .then(({status, data, msg}) => {

                    if (data.status == 1) {

                        this.saveUserInfo(data)
                        // 记录用户信息到vuex中
                        //_this.recordUserInfo(data);

                        // 缓存用户信息到 sessionStorage 中
                        //window.sessionStorage.userInfo = JSON.stringify(data);

                        // 登录后跳转回来源页面
                        _this.forward();

                    } else if (status == -90) {
                        // 如果是已登录，接口直接返回用户信息
                        this.getTheUser();

                    } else {

                        // todo
                        _this.$notiejs.top({
                            state: 2,
                            msg: msg,
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
    },
    watch: {
        $route (to, from) {
            console.log('to:',to)
            console.log('from:',from)
        }
    }
}


</script>

<style>

</style>
