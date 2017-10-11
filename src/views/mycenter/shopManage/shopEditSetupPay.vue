<template>
    <div class="pay-way-wrap" v-cloak>
        <div class="panel pay-select-panel mt10">
            <div class="pay-select-way">
                <template v-if="!isOrderChoose">
                    <div class="J-radio pay-select-otps">
                        <i class="pay-zxzf"></i>在线支付
                        <span class="i-radio" :class="{checked: zxzf.length}" data-pay="0"></span>
                    </div>
                    <div class="J-radio pay-select-otps">
                        <i class="pay-hdfk"></i>货到付款
                        <span class="i-radio" :class="{checked: hdfk.length}" data-pay="1"></span>
                    </div>
                </template>
                <template v-else>
                    <div v-if="(query.supportPayType.indexOf(HDFK_VAL) == -1 && query.supportPayType.length > 0) ||
				(query.supportPayType.indexOf(HDFK_VAL) != -1 && query.supportPayType.length > 1)" class="J-radio pay-select-otps">
                        <i class="pay-zxzf"></i>在线支付
                        <span class="i-radio" data-pay="0"></span>
                    </div>
                    <div v-if="query.supportPayType.indexOf(HDFK_VAL) != -1" class="J-radio pay-select-otps">
                        <i class="pay-hdfk"></i>货到付款
                        <span class="i-radio" data-pay="1"></span>
                    </div>
                </template>
            </div>
        </div>
        <!--<div v-if="!isOrderChoose" class="container mt30">-->
            <!--<input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary">-->
        <!--</div>-->
    </div>
</template>

<script>

    import {setRadio} from '@/assets/js/common'
    import {mapMutations} from 'vuex'
    import * as types from '@/store/mutation-types'

    export default ({
        data () {
            return{
                HDFK_VAL: 3, // 3为货到付款
                zxzf: [],
                hdfk: [],
                payTypeArr: [],
                shop: {},
                supportPayType:''
            }
        },
        created() {
            var query = this.query;
            this.supportPayType = query.supportPayType;
            // 订单生成支付选择
            if (this.isOrderChoose) {

                // 该店铺没有设置支付方式
                if (!query.supportPayType) {
                    this.toastMsg('没有支付方式',true);
                }
            }
            // 店铺支付方式设置
            else {
                var shop = localStorage.getItem('__shopInfo'),
                    payTypeTxt = '';

                if (!shop) {
                    this.$router.back();
                }
                this.shop = shop;
                // 提取支付方式
                payTypeTxt = shop.payType;

                if (!!payTypeTxt) {

                    this.payTypeArr = payTypeTxt.split(',');

                    // 货到付款
                    if (this.payTypeArr.indexOf(this.HDFK_VAL) != -1) {
                        this.hdfk = [this.HDFK_VAL]
                    }

                    // 在线支付
                    this.zxzf = this.payTypeArr.filter(function (item) {
                        return item != this.HDFK_VAL
                    })

                }

            }
        },
        mounted () {
            bindEvent(this)
        },
        methods: {
            ...mapMutations([types.UPDATE_ORDER_PARAM]),
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
            submitFn() {
                var _this = this;

                // 设置店铺的支付方式
                _this.$axios.get(_this.$api.setshopattribute,{params:{name: 'payType', value: this.payType}})
                    .then(()=>{
                        _this.shop.payType = _this.payType;
                        localStorage.setItem(JSON.stringify('__shopInfo'), _this.shop);
                        _this.toastMsg('保存成功',true);
                    })
            }
        },
        computed: {
            // 设置是否支付方式
            payType() {
                return [].concat(this.zxzf, this.hdfk).join(',')
            },
            // 判断是支付方式选择 or 店铺支付方式设置页面
            isOrderChoose() {
                return this.query.t == 'orderchoose';
            },
            query(){
                return this.$route.query;
            }
        }
    })

    function bindEvent(_this) {
        if (_this.isOrderChoose) {

            setRadio(function (status) {
                var _val = 2,
                    pay = Number( this.dataset.pay );

                if (status) {
                    // 货到付款
                    if (pay === 1) {
                        _val = _this.HDFK_VAL
                    }

                    // 更新订单参数
                    _this[types.UPDATE_ORDER_PARAM]({
                        payType: _val
                    })

                    _this.$router.back()
                }
            }, true, true)
        }
        // 支付方式选择
        else {
            setRadio(function (status) {
                var _val = [],
                    pay = Number( this.dataset.pay );

                if (status) {
                    // 在线支付
                    if (pay === 0) {
                        _val = [0,1,2]
                    }
                    // 货到付款
                    if (pay === 1) {
                        _val = [_this.HDFK_VAL]
                    }
                }

                _this.$set(_this.$data, ['zxzf', 'hdfk'][pay], _val)

            }, false)
        }
    }
</script>

<style>

</style>
