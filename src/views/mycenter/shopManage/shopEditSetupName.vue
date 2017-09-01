<template>
    <!-- 店铺名称 -->
    <div class="animsition user-info-wrap">
        <form class="fm-control" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line">
                    <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/img_shop_name.png" alt=""/>
                    <input type="text" name="name" placeholder="请输入店铺名称" v-model.trim="name" autofocus="autofocus" autocomplete="off">
                </div>
            </div>

            <div class="container mt30">
                <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled:isDisabled}">
            </div>
        </form>
    </div>
</template>

<script>
    import validator from '@/assets/js/validator'
    export default {
        data() {
            return {
                isDisabled: false,
                name: '',
                shop: {}
            }
        },
        created: function () {
            const query = this.query;
            // 初始化
            if (this.query.name) {
                this.name = query.name;
            }

            // 初始化
            if (this.query.username) {
                this.params.username = query.username;
            }
            var shop = JSON.parse(localStorage.getItem('__shopInfo'));
//            if (!shop) {
//                redirect_url(forward())
//            }

            this.name = shop.name;
            this.shop = shop;

            // 表单验证配置
            validator.config = {
                name: [{strategy: 'isNonEmpty', errorMsg: '请填写店铺名称'}, {strategy: 'maxLength:10', errorMsg: '店铺名称不能大于10个字'}]
            };
        },
        methods: {
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

                // 设置店铺的名称

                this.$axios.get(this.$api.setshopattribute,{params:{name: 'name', value: this.name}})
                    .then(function () {
                        vm.shop.name = vm.name;
                        localStorage.setItem('__shopInfo', JSON.stringify(vm.shop));
                        vm.$notiejs({
                            state: 1,
                            msg: '保存成功',
                            end() {
                                window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
                            }
                        });
                    }).catch(function () {
                    vm.isDisabled = false;
                    return false;
                })
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
