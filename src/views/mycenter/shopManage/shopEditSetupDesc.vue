<template>
    <!-- 店铺描述 -->
    <div class="animsition user-info-wrap">
        <form class="fm-control" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line">
                    <textarea class="block one-full inp-area" name="summary" cols="30" rows="5" maxlength="100" v-model="summary" placeholder="请填写店铺描述"></textarea>
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
                summary: '',
                shop: {}
            }
        },
        created: function () {
            var shop = JSON.parse(localStorage.getItem('__shopInfo'));
//            if (!shop) {
//                redirect_url(forward())
//            }

            this.summary = shop.summary;
            this.shop = shop;

            // 表单验证配置
            validator.config = {
                summary: [{strategy: 'isNonEmpty', errorMsg: '请填写店铺描述'}, {strategy: 'minLength:10', errorMsg: '店铺描述不能小于10个字'}]
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
                this.$axios.get(this.$api.setshopattribute,{params:{name: 'summary', value: this.summary}})
                    .then(function () {
                        vm.shop.summary = vm.summary;
                        localStorage.setItem('__shopInfo',JSON.stringify(vm.shop))
                        vm.$notiejs({
                            state: 1,
                            msg: '保存成功',
                            end() {
//                                window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
                                vm.$router.push({ path: 'shopEditSetup' })

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
