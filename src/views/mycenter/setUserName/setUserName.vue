<template>
    <!-- 表单 start -->
    <form class="fm-control" action="" method="POST" v-cloak>

        <div class="fm-group mt10">
            <div class="fm-line">
                <input class="int-nopl" type="text" name="username" placeholder="请填写您的昵称" v-model.trim="params.username" />
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}" />
        </div>
        <!--<toast v-model="show6" type="text" width="20em" position="middle">{{text}}</toast>-->
    </form>

    <!-- 表单 end -->
</template>

<script>
import { Toast, Group, XSwitch, XButton } from 'vux'
import { mapActions } from 'vuex'
import qs from 'qs'
import validator from '@/assets/js/validator'

export default {
    components: {
        Toast,
        Group,
        XSwitch,
        XButton
    },
    data() {
        return {
            isDisabled: false,
            show6: false,
            text: '',
            params: {
                username: ''
            }
        }
    },
    created: function() {
        const query = this.query;

        // 初始化
        if (this.query.username) {
            this.params.username = query.username;
        }
    },
    methods: {
        ...mapActions(['updateUserName']),
        submitFn() {
            var _this = this;
            var { params, query } = this;

            if (_this.isDisabled) return;
            _this.isDisabled = true;

            if (params.username === '' || params.username === query.username) {
                return _this.$notiejs({
                    state:2,
                    msg:'昵称不能为空或者跟修改前一致',
                    end(){
                        _this.isDisabled = false;
                    }
                })
            }
            var username = qs.stringify(params)

            // 修改用户昵称
            _this.$axios.post(this.$api.changeusername, username)
                .then(({ status, data }) => {
                    console.log('修改该昵称:', data);
                    if (status === 1) {
                        return _this.$notiejs({
                            state:1,
                            msg:'昵称修改成功',
                            end(){
                                _this.updateUserName(params.username)
                                _this.$router.back();
                            }
                        })
                    } else {
                        _this.isDisabled = false;
                    }
                })
                .catch(() => {
                    _this.isDisabled = false;
                })
        }
    },
    computed: {
        query() {
            return this.$route.query;
        }
    }
}
</script>

<style>

</style>
