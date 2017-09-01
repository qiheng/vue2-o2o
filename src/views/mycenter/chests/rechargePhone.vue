<template>
    <div class="container mobile-fee-recharge pt10" v-cloak>
        <div class="input-phone-num mb30">
            <input name="phoneno" type="tel" class="lightgray" placeholder="请输入充值手机号" maxlength="15" v-model="phoneno" />
            <a class="clear-btn mr10"></a>
        </div>
        <dl class="deno-chose">
            <dt>请选择充值面额</dt>
            <dd>
                <div class="list-fl">
                    <label v-for="(item,index) in moneys" :key="index" :class="{'active':item.checked}" @click="changeFn(index,item)">
                        <span>{{item.value}}元</span>
                    </label>
                </div>
            </dd>
            <dd class="text-right">
                <span class="f16 emb-red">售价：&yen;
                    <ins class="sell-price">请选择面额</ins>
                </span>
            </dd>
        </dl>
        <div class="mt30">
            <input type="submit" @click.prevent="submitFn" class="btn btn-block btn-primary btn-lg" value="立即充值" :class="{disabled: isDisabled}" />
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
            moneys: [
                { value: 10, checked: true },
                { value: 20, checked: false },
                { value: 30, checked: false },
                { value: 50, checked: false },
                { value: 100, checked: false },
                { value: 300, checked: false }
            ],
            content: '',
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
        changeFn(index, item) {
            for (let key of this.moneys) {
                key.checked = false
            }
            this.moneys[index].checked = true;
            this.cardnum = item.value
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
.deno-chose .list-fl label:nth-child(3n-1){
    margin: 0 18px 
}
.deno-chose .list-fl label span {
    position: relative;
    display: block;
    padding: 10px 15px;
    width: 30%;
    display: inline-block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e5e5e5;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #666;
}


.deno-chose .list-fl label.active span {
    border-color: #e62739;
    color: #e62739
}
</style>
