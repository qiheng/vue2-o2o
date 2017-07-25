<template>
    <!-- 表单 start -->
    <form class="fm-control" action="/e/changeusername" method="POST" v-cloak>

        <div class="fm-group mt10">
            <div class="fm-line">
                <input class="int-nopl" type="text" name="username" placeholder="请填写您的昵称" v-model.trim="params.username" />
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}" />
        </div>

    </form>
    <!-- 表单 end -->
</template>

<script>
    import {mapActions} from 'vuex'
    //import validator from '../../assets/js/validator'

    export default {
        data () {
            return {
                isDisabled: false,
                params: {
                    username: ''
                }
            }
        },
        created: function () {
            const query = this.query;

            // 初始化
            if (this.query.username) {
                this.params.username = query.username;
            }

            //console.log('$store----', this.$store)
        },
        methods: {
            ...mapActions(['updateUserName']),
            submitFn () {
                var _this = this;
                var {params, query} = this;

                if (_this.isDisabled) return;
                _this.isDisabled = true;

                if (params.username === '' || params.username === query.username) {
                    alert('昵称不能为空或者跟修改前一致');
                    _this.isDisabled = false;
                    return;

                    /*return notiejs.alert(2, '昵称不能为空或者跟修改前一致', 2000, function () {
                        _this.isDisabled = false;
                    });*/

                }

                // 修改用户昵称
                _this.api.changeusername({
                    params
                })
                .then(({status, data}) => {
                    console.log('修改该昵称:', data);

                    if (data.status === 1) {
                        alert('修改成功');
                        _this.updateUserName(params.username)
                        _this.$router.back();
                    } else {
                        _this.isDisabled = false;
                    }

                })
                .then(({status, data}) => {
                    //console.log('data----------',data)
                    alert(11111)
                })
                .catch(() => {
                    _this.isDisabled = false;
                })


                /*_this.api.changeusername({username: _this.username}, function() {

                    _theuser.username = _this.username;
                    store.set('__theuser', _theuser);

                    redirect_url(forward())
                }).always(function () {
                    _this.isDisabled = false;
                });*/

            }
        },
        computed: {
            query () {
                return this.$route.query;
            }
        }
    }
</script>

<style>

</style>