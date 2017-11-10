<template>
    <form class="fm-control">
        <div class="fm-group mt10 container">
            <div class="fm-line">
                <label class="l-label">起送价（元）</label>
                <input type="text" name="priceBeginSend" 　v-model.number="priceBeginSend" placeholder="请设置起送价" autofocus="autofocus" autocomplete="off">
            </div>
            <div class="fm-line container">
                <label class="l-label" for="">配送费（元）</label>
                <input type="text" name="priceSend" v-model.number="priceSend" placeholder="请设置配送费" autofocus="autofocus" autocomplete="off">
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled:isDisabled}" />
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import validator from '@/assets/js/validator'
export default {
    data() {
        return {
            isDisabled: false,
            priceSend: '',
            priceBeginSend: ''
        }
    },
    created() {
        var _this = this;
        if (this.shopInfo.shop.priceSend != null) {
            _this.priceSend = this.shopInfo.shop.priceSend;
            _this.priceBeginSend = this.shopInfo.shop.priceBeginSend;
        }
    },
    mounted: function() {
        // 表单验证配置
        validator.config = {
            priceBeginSend: [{ strategy: 'isNonEmpty', errorMsg: '请输入起步价' }, { strategy: 'isIntege1', errorMsg: '请输入正确的起步价' }],
            priceSend: [{ strategy: 'isNonEmpty', errorMsg: '请输入配送费' }, { strategy: 'isIntege1', errorMsg: '请输入正确的配送费' }]
        }
    },
    methods: {
        submitFn: function() {
            var _this = this,
                oValChar = {};

            if (this.isDisabled) return;
            this.isDisabled = true;

            // 校验字段
            $.each(validator.config, function(key) {
                var val = _this.$data[key];
                oValChar[key] = val
            });

            // 校验表单
            if (!validator.validate(oValChar, true)) {

                return $.each(validator.messages, function(i, val) {
                    _this.$notiejs({
                        state: 2,
                        msg: val,
                        end() {
                            _this.isDisabled = false
                        }
                    })
                    return false;
                })
            }

            // 提交设置价格
            _this.$axios.get(_this.$api.setsendprice, { params: { priceBeginSend: this.priceBeginSend, priceSend: this.priceSend } })
                .then(function() {
                    _this.$notiejs({
                        state: 1,
                        msg: '设置成功',
                        end() {
                            _this.$router.push({ path: 'shopManage' });
                        }
                    })
                })
        }
    },
    computed: {
        ...mapGetters(['shopInfo']),
        query() {
            return this.$route.query
        }
    }
}
</script>

<style scoped>
.fm-group .fm-line {
    padding: 10px 0
}
</style>
