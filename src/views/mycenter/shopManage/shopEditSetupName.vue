<template>
    <!-- 店铺名称 -->
    <div class="animsition user-info-wrap">
        <form class="fm-control" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line">
                    <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/img_shop_name.png" alt="" />
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
import { Toast } from 'vux'
import validator from '@/assets/js/validator'
export default {
    data() {
        return {
            isDisabled: false,
            name: '',
            shop: {}
        }
    },
    created() {
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

        this.name = shop.name;
        this.shop = shop;

        // 表单验证配置
        validator.config = {
            name: [{ strategy: 'isNonEmpty', errorMsg: '请填写店铺名称' }, { strategy: 'maxLength:10', errorMsg: '店铺名称不能大于10个字' }]
        };
    },
    methods: {
        submitFn() {
            var oValChar = {};
            var _this = this;
            if (this.isDisabled) return;
            _this.isDisabled = true;

            // 校验字段
            $.each(validator.config, (key) => {
                var val = this.$data[key];
                oValChar[key] = val
            });

            // 校验表单
            if (!validator.validate(oValChar, true)) {
                return $.each(validator.messages, function (i, val) {
                    _this.$notiejs({
                       state:2,
                       msg:val,
                       end(){
                           _this.isDisabled = false
                       }
                    });
                    return false;
                })
            }

            // 设置店铺的名称

            _this.$axios.post(_this.$api.setshopattribute, $.param({ name: 'name', value: _this.name }))
                .then(({ msg, data, state }) => {
                    _this.shop.name = _this.name;
                    localStorage.setItem('__shopInfo', JSON.stringify(_this.shop));
                    _this.$notiejs({
                        state:1,
                        msg:'保存成功',
                        end(){
                            _this.$router.back();
                            _this.isDisabled = false;
                        }
                    });
                }).catch(() => {
                    _this.isDisabled = false;
                    return false;
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
