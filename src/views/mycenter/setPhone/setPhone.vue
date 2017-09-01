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
                <a @click.prevent="getVerCode($event)" href="javascript:;" class="btn get-verCode">获取验证码</a>
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
        this.init();
        console.log(this.param.code,'+++++++++++++++++++++++++++6666');
    },
    methods: {
        init(){
            validator.config = {
                phone: [{ strategy: 'isNonEmpty', errorMsg: '请输入手机号码！' }, { strategy: 'isMobile' }],
                code: { strategy: 'isNonEmpty', errorMsg: '----------' }
            };
        },
        errorTips: function () {
            var vm = this;
            $.each(validator.messages, function (i, val) {
                vm.$notiejs({
                    state: 2,
                    msg: val,
                    end() {
                        vm.isDisabled = false
                    }
                });
                return false;
            })
        },
        getVerCode() {
            var vm = this;
                //$dt = $(e.target);

            if (this.isSendDisabled) return;
            this.isSendDisabled = true;

            // 校验表单
            if (!validator.validate({phone: this.phone}, true)) {

                this.isSendDisabled = false;
                return this.errorTips()
            }

            // 倒计时
            down_time_60s();

            // 发验证码
            vm.$axios.get(vm.$api.sendcodebychangephone1,{params:{phone: this.phone}})
                .then(function (result) {
                    vm.$notiejs({
                        state: 2,
                        msg: result.msg,
                        end() {
                            down_time_60s.clear();
                        }
                    });
                    return false;
                }).always(function () {
                vm.isSendDisabled = false;
            });
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
                    _this.$notiejs({
                        state: 2,
                        msg: val,
                        end() {
                            _this.isDisabled = false
                        }
                    });
                    alert('xxxx');
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
function down_time_60s(el, calback) {
    down_time_60s.t = 60;

    var dt = function () {
        down_time_60s.t = --(down_time_60s.t);

        if (down_time_60s.t <= 0 ) {
            el.text('获取验证码');
            el.removeClass('disabled');
            calback && calback(el);
            return;
        }

        el.text( down_time_60s.t + 's后重新获取');

        setTimeout(arguments.callee, 1000);
    };

    dt();
}
/**
 * 清除倒计时
 */
down_time_60s.clear = function () {
    down_time_60s.t = 0;
};
</script>
