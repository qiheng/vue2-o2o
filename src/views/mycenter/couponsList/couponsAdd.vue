<template>
    <div class="coupons-wrap" v-cloak>
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label">
                    <img class="block" width="25" height="25" src="../../../assets/images/icons-v3/icons1/img_yhqx.png" alt="" />
                </label>
                <input type="text" name="code" placeholder="请输入优惠券编号" v-model="param.code">
            </div>
        </div>
        <div class="container mt30">
            <input type="submit" value="确定" class="btn btn-block btn-lg btn-primary" @click.prevent="submitFn" :class="{disabled: isDisabled}">
        </div>
    </div>
</template>
<script>
import validator from '@/assets/js/validator'
import qs from 'qs'
export default {
    data() {
        return {
            isDisabled: false,
            param: {
                code: ''
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            validator.config = {
                code: [{ strategy: 'isNonEmpty', errorMsg: '请输入优惠券编码！' }],
            }
        },
        submitFn() {
            var _this = this,
                oValChar = {};
            if (this.isDisabled) return;
            this.isDisabled = true;
            // 校验字段
            $.each(validator.config, key => {
                oValChar[key] = _this.param[key]
            });
            // 校验表单
            if (!validator.validate(oValChar, true)) {
                return $.each(validator.messages, (i, val) => {
                    _this.$notiejs({
                        state: 2,
                        msg: val,
                        end() {
                            _this.isDisabled = false
                        }
                    });
                    return false;
                })
            };
            const param = qs.stringify(this.param);
            this.$axios.post(this.$api.convertcoupon, param)
                .then(request => {
                    if (request.status === -23) {
                        _this.$notiejs({
                            state: 2,
                            msg: request.msg,
                            end(){
                                _this.isDisabled = false;
                            }
                        });
                        return
                    }
                    _this.$notiejs({
                        state: 1,
                        msg: request.msg,
                    });
                })
        }
    }
}
</script>
