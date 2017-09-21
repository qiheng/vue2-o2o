<template>
    <div class="pay-way-wrap" v-cloak>
        <div class="panel pay-select-panel mt10">
            <div class="pay-select-way">

                    <div class="J-radio pay-select-otps">
                        <i class="pay-zxzf"></i>在线支付
                        <span :class="{checked: zxzf.length,checked:active2}" data-pay="0"  @click="clickActive(1)" class="i-radio"></span>
                    </div>

                    <div class="J-radio pay-select-otps">
                        <i class="pay-hdfk"></i>货到付款
                        <span :class="{checked: hdfk.length , checked:active}" data-pay="1"  @click="clickActive(2)" class="i-radio"></span>
                    </div>

                <!--<template v-else>-->
                    <!--<div v-if="(query.supportPayType.indexOf('5') == -1 && query.supportPayType.length > 0) ||-->
            <!--(query.supportPayType.indexOf('5') != -1 && query.supportPayType.length > 1)" class="J-radio pay-select-otps">-->
                        <!--<i class="pay-zxzf"></i>在线支付-->
                        <!--<span class="i-radio" data-pay="0"></span>-->
                    <!--</div>-->
                    <!--<div v-if="query.supportPayType.indexOf('5') != -1" class="J-radio pay-select-otps">-->
                        <!--<i class="pay-hdfk"></i>货到付款-->
                        <!--<span class="i-radio" data-pay="1"></span>-->
                    <!--</div>-->
                <!--</template>-->
            </div>
        </div>
        <div v-if="!isOrderChoose" class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary">
        </div>
    </div>
</template>

<script>
    export default ({
        data(){
            return{
                zxzf: [],
                hdfk: [],
                payTypeArr: [],
                shop: {},
                item1:1,
                active:false,
                active2:false,
//                query: query
            }
        },
        created: function () {
            // 订单生成支付选择
            if (this.isOrderChoose) {

                // 该店铺没有设置支付方式
//                if (!query.supportPayType) {
//                    return notiejs.alert(2, '没有支付方式', 2000, function () {
//                        redirect_url(forward())
//                    });
//                }

            }
            // 店铺支付方式设置
            else {

                var shop = JSON.parse(localStorage.getItem('__shopInfo')),
                    payTypeTxt = '';

                if (!shop) {
//                    redirect_url(forward())
                }

                this.shop = shop;
                // 提取支付方式
                payTypeTxt = shop.payType;

                if (!!payTypeTxt) {

                    this.payTypeArr = payTypeTxt.split(',');
                    //console.log(this.payTypeArr)
                    // 货到付款
                    if (this.payTypeArr.indexOf('5') != -1) {
                        this.hdfk = [5]
                    }

                    // 在线支付
                    this.zxzf = this.payTypeArr.filter(function (item) {
                        return item != 5
                    })

                }
            }
        },
        mounted: function () {

        },
        methods: {
            clickActive: function(eq) {
                if(this.item1===eq){
                    eq = 1;
                    this.active2 = !this.active2;
                }
                else{
                    eq = 2;
                    this.active = !this.active;
                }

            },
            submitFn: function () {
                var _this = this;

                // 设置店铺的支付方式
                _this.$axios.get(_this.$api.setshopattribute,{params:{name: 'payType', value: this.payType}})
                    .then(function(){
                        _this.shop.payType = _this.payType;

                        localStorage.setItem('__shopInfo',JSON.stringify( _this.shop));

//                        notiejs.alert(1, '保存成功', 2000, function () {
//                            redirect_url(forward())
//                        });
                    })
            },
        },
        computed: {
            // 设置是否支付方式
            payType: function () {
                return [].concat(this.zxzf, this.hdfk).join(',')
            },
            // 判断是支付方式选择 or 店铺支付方式设置页面
            isOrderChoose: function () {
//                return this.query.t == 'orderchoose';
            },
            query () {
                return this.$route.query
            }

        }
    })
</script>

<style>

</style>
