<template>
    <div class="pb60 user-info-wrap">
        <form class="fm-control" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line head-pic clearfix">
                    <label class="l-label">头像</label>
                    <span class="upload-parts pull-right">
                        <img class="upload-img" width="60" height="60"
                             :src=" userInfo.headpic + '?x-oss-process=image/resize,m_fixed,h_100,w_100'" :alt="userInfo.username" />
                        <input type="file" name="headpic" class="file-pic"/>
                    </span>

                </div>
                <div class="fm-line">
                    <label class="l-label">用户名</label>
                    <router-link class="pull-right" :to="{name: 'setUserName', query: {username: userInfo.username}}">
                        <input class="text-right lightgray" type="text" :value="userInfo.username" readonly="readonly" />
                        <i class="arr-rt"></i>
                    </router-link>
                </div>

                <!--
                <div class="fm-line">
                    <label class="l-label">所在地区</label>
                    <a class="pull-right" href="edit-userInfo-address.html?address=<%- userInfo.address %>">
                        <input class="text-right" type="text" value="<%- userInfo.address %>" readonly="readonly" />
                        <i class="arr-rt"></i>
                    </a>
                </div>
                -->

            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">手机号</label>
                    <router-link class="pull-right"
                        :to="{name:'setPhone', query: {phone: userInfo.phone}}"
                    >
                        <input class="text-right lightgray" type="tel" :value="userInfo.phone" readonly="readonly" />
                        <i class="arr-rt"></i>
                    </router-link>
                </div>
                <!--<div class="fm-line">
                    <label class="l-label">QQ</label>
                    <a class="pull-right" href="javascript:;"><input class="text-right lightgray" type="tel" name="" value="<%- userInfo.issetQQ ? '已绑定' : '未绑定'  %>" readonly="readonly" /><i class="arr-rt"></i></a>
                </div>-->
                <div class="fm-line">
                    <label class="l-label">微信</label>
                    <a class="pull-right" href="javascript:;">
                        <input class="text-right lightgray" type="text" :value="userInfo.issetWeiXin ? '已绑定' : '未绑定'" readonly="readonly" />
                        <i class="arr-rt"></i>
                    </a>
                </div>
            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <router-link class="block" :to="{name:'changePassword',query:{type:userInfo.query}}">
                        <label class="l-label">登录密码</label>
                        <span class="pull-right">
                            <input class="text-right lightgray" type="text" name="" value="修改" readonly="readonly" /><i class="arr-rt"></i>
                        </span>
                    </router-link>
                </div>
                <div class="fm-line hidden">
                    <a class="block" href="change-password.html?type=paypwd">
                        <label class="l-label">支付密码</label>
                        <span class="pull-right">
                            <input class="text-right lightgray" type="text" :value="userInfo.issetPayPassword ? '已设置' : '未设置'" readonly="readonly" />
                            <i class="arr-rt"></i>
                        </span>
                    </a>
                </div>
            </div>

            <div class="fm-group mt20">
                <a @click.prevent="logout" href="javascript:;" class="block logout fm-line">
                    <label class="l-label">退出当前账号</label>
                </a>
            </div>


            <!--<div class="container mt30">
                <input type="submit" value="用户退出" class="btn btn-block btn-lg btn-primary" />
            </div>-->
        </form>
        <!-- 表单 end -->

        <transition name="router-fade" mode="out-in">
            <router-view class="fullPage"></router-view>
        </transition>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        data () {
            return {

            }
        },
        created: function () {
            var _this = this;

        },
        methods: {
            ...mapActions(['recordUserInfo']),
            logout () {
                var _this = this;

                this.$axios.post(this.$api.logout)
                    .then(() => {
                        console.log('当前用户已退出');
                        //_this.recordUserInfo(null);
                        _this.$store.dispatch('recordUserInfo', null);

                        _this.$router.replace({name: 'login', query: {redirect: _this.$route.fullPath}})
                    })
                    .catch((e) => {
                        console.log('退出报错了:', e)
                    })

            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        }
    }
</script>

<style lang="scss" scoped>
    .fullPage {
        z-index: 90000;
        background: #f2f2f2;
    }
</style>
