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
                <a @click.prevent="getCode" href="javascript:;" class="btn get-verCode">
                    <countdown slot="value" v-model="time" :start="countdown.start" v-show="countdown.show"></countdown>
                    <span v-html="countdown.getCodeText"></span>
                </a>
            </div>
        </div>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="验证" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Toast, Countdown } from 'vux'
import qs from 'qs'
import validator from '@/assets/js/validator'
export default {
    components: {
        Toast,
        Countdown
    },
    data() {
        return {
            shows: false,
            text: '',
            time: 60,
            countdown: {
                show: false,
                start: false,
                getCodeText: '获取验证码',
            },
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
    },
    watch: {
        time(oldVal, newVal) {
            if (oldVal == 0) {
                this.countdown.start = false;
                this.time = 60;
                this.countdown.show = false;
                this.countdown.getCodeText = '重新获取'
            }
        }
    },
    methods: {
        toastMsg(msg, type) {
            let that = this;
            this.$vux.toast.show({
                text: msg,
                type: 'text',
                width: '24em',
                position: 'middle',
                onHide() {
                    if (type) {
                        that.$router.back();
                    }
                    that.isDisabled = false;
                }
            })
        },
        init() {
            validator.config = {
                phone: [{ strategy: 'isNonEmpty', errorMsg: '请输入手机号码！' }, { strategy: 'isMobile' }],
                code: { strategy: 'isNonEmpty', errorMsg: '验证码不能为空' }
            };
        },
        getCode() {
            let that = this;
            that.countdown.getCodeText = 's'
            that.countdown.start = true;
            that.countdown.show = true;
            const params = qs.stringify({ phone: this.param.phone });
            // 发验证码
            this.$axios.post(this.$api.sendcodebychangephone1, params)
                .then(function(result) {
                    if(result.msg == '操作失败'){
                        that.toastMsg('请不要重复操作',false);
                        that.countdown.getCodeText = '获取验证码'
                        that.countdown.start = false;
                        that.countdown.show = false;
                    }else{
                        that.toastMsg('验证码已经发送至您的手机请注意查收',false);
                    }
                    that.shows = true;
                    return false;
                })
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
                    this.toastMsg(val,false);
                    return false;
                })
            }
            const params = qs.stringify(this.param);
            // 发验证码
            this.$axios.post(this.$api.changepassword1, params)
                .then(({ msg, status }) => {
                    if (status == -9) {
                        this.toastMsg(msg,false);
                        return false;
                    } else {
                        this.$router.push({ path: 'mycenterBindPhoneNum' })
                    }
                })
        }
    },
    computed: {
        query() {
            return this.$route.query
        }
    }
}

</script>
