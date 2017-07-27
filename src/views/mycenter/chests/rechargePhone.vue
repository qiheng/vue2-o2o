<template>
    <div class="container mobile-fee-recharge pt10" v-cloak>
        <div class="input-phone-num mb30">
            <input name="phoneno" type="tel" class="lightgray" placeholder="请输入充值手机号" maxlength="15" v-model="phoneno" />
            <a class="clear-btn mr10"></a>
        </div>
        <dl class="deno-chose">
            <dt>请选择充值面额</dt>
            <dd>
                <ul class="list-fl">
                    <li>
                        <label>
                            <input type="radio" id="one" value="10" v-model="cardnum" checked>
                            <span>10元</span>
                        </label>
                        <label>
                            <input type="radio" id="one" value="50" v-model="cardnum">
                            <span>50元</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" id="one" value="20" v-model="cardnum">
                            <span>20元</span>
                        </label>
                        <label>
                            <input type="radio" id="one" value="100" v-model="cardnum">
                            <span>100元</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" id="one" value="30" v-model="cardnum">
                            <span>30元</span>
                        </label>
                        <label>
                            <input type="radio" id="one" value="300" v-model="cardnum">
                            <span>300元</span>
                        </label>
                    </li>
                </ul>
            </dd>
            <dd class="text-right">
                <span class="f16 emb-red">售价：&yen;
                    <ins class="sell-price">请选择面额</ins>
                </span>
            </dd>
        </dl>
        <div class="mt30">
            <input type="submit" @click.prevent="submitFn" class="btn btn-block btn-primary btn-lg" value="立即充值" :class="{disabled: isDisabled}"/>
        </div>
        <div class="lightgray mt15">
            <h3>温馨提示：</h3>
            <ol>
                <li>1.支持全国移动、联通、电信手机快捷支付</li>
                <li>2.话费充值，三分钟到账</li>
            </ol>
        </div>
    </div>
    
</template>
<script>
import validator from '@/assets/js/validator'
import qs from 'qs'
export default {
    data() {
        return {
            content:'',
            phoneno: '',
            cardnum: 10,
            isDisabled: false,
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            validator.config = {
                phoneno: [{ strategy: 'isNonEmpty', errorMsg: '请输入手机号码！' }, { strategy: 'isMobile' }],
            }
        },
        submitFn() {
            let _this = this,
                oValChar = {};
            if (this.isDisabled) return;
            this.isDisabled = true;
            // 校验字段
            $.each(validator.config, key => {
                oValChar[key] = _this[key]
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
            }
            const param = qs.stringify({ phoneno: this.phoneno, cardnum: this.cardnum });
            this.$axios.post(this.$api.telquery, param)
                .then(request => {
                    if (request.status === -22) {
                        _this.$notiejs({
                            state: 2,
                            msg: request.msg,
                             end() {
                                _this.isDisabled = false
                            }
                        });
                        return
                    }
                    this.$axios.post(this.$api.createhuafeiorders, param)
                        .then(request => {
                            _this.$notiejs({
                                state: 1,
                                msg: request.msg
                            });
                        }).catch(error => {
                            //todo
                        })
                }).catch(error => {
                    //todo
                })
        }
    }
}
</script>
<style>
body {
    background-color: #fff
}

.deno-chose .list-fl label:first-child {
    margin-bottom: 20px;
}

.deno-chose .list-fl label span {
    position: relative;
    display: block;
    padding: 10px 15px;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e5e5e5;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #666;
}

.deno-chose .list-fl label input {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
}
.deno-chose .list-fl label input:checked ~ span{
    border-color: #e62739;
    color:#e62739
}

</style>
