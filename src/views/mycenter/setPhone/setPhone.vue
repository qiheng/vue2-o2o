<template>
    <!-- 表单 start -->
    <div class="fm-control fm-bind-phoneNum" v-cloak>
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label l-account" for="phone"></label>
                <input class="int-nopl three-fourths" name="phone" type="tel" id="phone" v-model="param.phone" maxlength="11" placeholder="请输入原手机号码" />
            </div>
            <div class="fm-line">
                <label class="l-label l-code"></label>
                <input class="int-nopl" name="code" type="text" v-model="param.code" placeholder="请输入验证码" style="width:50%" maxlength="6" />
                <a @click.prevent="getVerCode" href="javascript:;" class="btn get-verCode">获取验证码</a>
            </div>
        </div>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="验证" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import validator from '@/assets/js/validator'
import notiejs from '@/components/notiejs/notiejs'
export default {
    data() {
        return {
            isDisabled: false,
            param: {
                phone: '',
                code: ''
            }
        }
    },
    created() {
        const query = this.query;
        if (query.phone) {
            this.param.phone = query.phone
        }
        this.init()
    },
    methods: {
        init(){
            validator.config = {
                phone: [{ strategy: 'isNonEmpty', errorMsg: '请输入手机号码！' }, { strategy: 'isMobile' }],
                code: { strategy: 'isNonEmpty', errorMsg: '----------' }
            };
        },
        getVerCode() {

        },
        submitFn() {
            let _this = this,
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
                    notiejs({
                        state: 2,
                        msg: val,
                        end() {
                            _this.isDisabled = false
                        }
                    });
                    return false;
                })
            }
        }
    },
    computed: {
        query() {
            return this.$route.query
        }
    }
}
</script>
