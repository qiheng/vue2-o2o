<template>
    <div class="animsition user-info-wrap">
        <form class="fm-control" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line">
                    <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/img_phone.png" alt=""/>
                    <input type="tel" v-model="phone" placeholder="请输入联系电话" autofocus="autofocus" autocomplete="off">
                </div>
            </div>

            <div class="container mt30">
                <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}">
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
                phone: '',
                shop: {}
            }
        },
        created: function () {
            var shop = JSON.parse(localStorage.getItem('__shopInfo'));

            this.phone = shop.phone;
            this.shop = shop;

            // 表单验证配置
            validator.config = {
                phone: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}]
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
                this.$axios.get(this.$api.setshopattribute,{params:{name: 'phone', value: this.phone}})
                    .then(function () {
                        vm.shop.phone = vm.phone;
                        localStorage.setItem('__shopInfo',JSON.stringify(vm.shop))

                        vm.$notiejs({
                            state: 1,
                            msg: '保存成功',
                            end() {
                                vm.$router.push({ path: 'shopEditSetup' })
//                                window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
                            }
                        });
                    }).catch(function () {
                        vm.isDisabled = false;
                        return false;
                })
            }
        }
    }
</script>

<style>

</style>
