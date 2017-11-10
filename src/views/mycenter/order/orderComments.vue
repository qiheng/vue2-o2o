<template>
    <form class="pb30 shop-comment" action="/" v-cloak>
        <div v-if="orderInfo.servicerId" class="panel-nobrd grade-panel text-center pt10">
            <h2 class="f12 ptb10 h-tit"><ins class="tit lightgray">服务人员评价</ins></h2>

            <div class="ptb5 shop-info-panel">
                <img class="radius50 dib" width="40" height="40"
                     :src="(orderInfo.servicerPic ? orderInfo.servicerPic : config.defaultHeaderPic)+'?x-oss-process=image/resize,m_fixed,h_60,w_60'" alt=""/>
                <h1 class="dib f16 pl10">{{ orderInfo.servicerName }}</h1>
            </div>

            <ul class="gray ptb10">
                <li>
                    <i></i>
                    <star @commitscore="commitScore" :score="param.score05" :stype="5"></star>
                </li>
            </ul>
        </div>
        <div class="panel-chunk" style="background: #ffffff">
            <h2 class="f12 ptb10 h-tit"><ins class="tit lightgray">商家服务评价</ins></h2>
            <cell title="质量"><rater v-model="param.score01" slot="value"></rater></cell>
            <cell title="速度"><rater v-model="param.score02" slot="value"></rater></cell>
            <cell title="服务"><rater v-model="param.score03" slot="value"></rater></cell>
            <cell title="态度"><rater v-model="param.score04" slot="value"></rater></cell>
        </div>

        <div class="panel-nobrd grade-panel text-center pt10" style="border-top: 1px solid #e5e5e5;">
            <div class="panel-chunk">
                <textarea  placeholder="写下您对这件商品的评价吧！" v-model="param.content" cols="50" rows="5"></textarea>
            </div>
        </div>

        <div class="panel">
            <div class="panel-bd">
                <h2 class="f12 mb15">商品评价</h2>
                <ul class="f16" style="line-height: 30px">
                    <li v-for="(goodsItem, index) in orderInfo.orderDetail"
                        @click="zan(goodsItem.goodsId)"><i class="pull-right i-zan mt5" :class="{'i-zan-on':hasGoodsId(goodsItem.goodsId)}"></i><b>{{ goodsItem.goodsName }}</b></li>
                </ul>
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="完成" class="btn btn-block btn-primary btn-lg" :class="{disabled:isDisabled}"/>
        </div>
    </form>
</template>

<script>
//    import { mapActions, mapGetters } from 'vuex'
//    import { Rater} from 'vux'
import { Rater, Group, Cell, Range } from 'vux'
    export default {
        components: {
            Rater,
            Cell
        },
        data() {
            return {
                isDisabled: false,
                orderInfo:{
                    shop:{}
                },
                param: {
                    shopId: '',
                    ordersId: '',
                    servicerId: '',
                    score01:5,
                    score02:5,
                    score03:5,
                    score04:5
                }
            }
        },
        created() {
//            const query = this.query;
            console.log(this.param.shopId,'hahahhhhhahahahakashasdkahdsldhasdas');
            this.param.ordersId = this.query.ordersId;
            this.param.shopId = this.query.shopId;
            // 获取订单详情信息
            this.$axios.post(this.$api.ordersview, $.param({ordersId: this.query.ordersId}))
                .then(function (orderDetail) {
                    console.log(orderDetail,'12121213212132');
//                    this.param.shopId = orderDetail.shop.shopId;
//                    console.log(this.param.shopId,'66666666666666666666666663212233');
//                    this.param.servicerId = orderDetail.servicerId || '';
//                    this.orderInfo = orderDetail;
//                    console.log(orderDetail,'6666666666666666666666666666666666666666666')
//                    console.log(orderDetail.servicerId,'77777777777777777777777777777776666666666666666666666666666666666666666666')
                })
        },

        methods: {
            toastMsg(msg, type) {
                var _this = this;
                this.$vux.toast.show({
                    text: msg,
                    type: 'text',
                    width: '24em',
                    position: 'middle',
                    onHide() {
                        if (type) {
                            _this.$router.back();
                        }
                        _this.isDisabled = false;
                    }
                })
            },
            zan(goodsId) {
                var tmp = this.param.greatIds.split(','), index;

                tmp = tmp.filter(function (item) {
                    return item != '';
                });

                index = tmp.indexOf(goodsId);

                if (index != -1) {
                    tmp.splice(index,1)
                } else {
                    tmp.push(goodsId)
                }

                this.param.greatIds = tmp.join(',')
            },
            submitFn() {
                var _this = this;
                if (this.isDisabled) return;
                this.isDisabled = true;

                if (_this.param.content == '') {
                    this.toastMsg('评价内容不能为空',false);
                    this.isDisabled = false;
                }

                _this.$axios.get(_this.$api.commentorders,{params:_this.param})
                    .then(function () {
                        _this.toastMsg('评论成功',true);
                    }).catch(function (result) {
                    if (result.status == -203) {
                        _this.toastMsg(result.msg,false);
                        return false
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

<style>
    .vux-label{
        display: inline-block;
        float: left;
    }
    .weui-cell:before{border:none !important}
    textarea { width: 100%; border: 0; outline: none;}
    .shop-info-panel .dib {vertical-align: middle}
    .i-comm-panel:first-child {margin-right: 15%}
</style>
