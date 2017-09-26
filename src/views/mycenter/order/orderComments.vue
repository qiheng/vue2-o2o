<template>
    <form class="pb30 shop-comment" action="/" v-cloak>
        <div v-if="orderInfo.servicerId" class="panel-nobrd grade-panel text-center pt10">
            <h2 class="f12 ptb10 h-tit"><ins class="tit lightgray">服务人员评价</ins></h2>

            <div class="ptb5 shop-info-panel">
                <img class="radius50 dib" width="40" height="40"
                     :src="(orderInfo.servicerPic ? orderInfo.servicerPic : config.defaultHeaderPic)+'?x-oss-process=image/resize,m_fixed,h_60,w_60'" alt=""/>
                <!--<h1 class="dib f16 pl10">{{ orderInfo.servicerName | cutstr(20) }}</h1>-->
            </div>

            <ul class="gray ptb10">
                <li>
                    <i></i>
                    <star @commitscore="commitScore" :score="param.score05" :stype="5"></star>
                </li>
            </ul>
        </div>

        <div class="panel-nobrd grade-panel text-center pt10">
            <h2 class="f12 ptb10 h-tit"><ins class="tit lightgray">商家服务评价</ins></h2>

            <!--<div class="ptb5 shop-info-panel">-->
                <!--<img class="radius50 dib" width="40" height="40"-->
                     <!--:src="(orderInfo.shop.pic ? orderInfo.shop.pic : config.defaultShopPic)+'?x-oss-process=image/resize,m_fixed,h_60,w_60'" alt=""/>-->
                <!--&lt;!&ndash;<h1 class="dib f16 pl10">{{ orderInfo.shop.name | cutstr(20) }}</h1>&ndash;&gt;-->
            <!--</div>-->

            <!--<ul class="gray ptb10">-->
                <!--<li>-->
                    <!--<span class="i-comm-panel">质量</span>-->
                    <!--<star @commitscore="commitScore" :score="param.score01" :stype="1"></star>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span class="i-comm-panel">速度</span>-->
                    <!--<star @commitscore="commitScore" :score="param.score02" :stype="2"></star>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span class="i-comm-panel">服务</span>-->
                    <!--<star @commitscore="commitScore" :score="param.score03" :stype="3"></star>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<span class="i-comm-panel">态度</span>-->
                    <!--<star @commitscore="commitScore" :score="param.score04" :stype="4"></star>-->
                <!--</li>-->
            <!--</ul>-->

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
    var Star = {
        data: function () {
            return {
                num:5
            }
        },
        template:'<span class="J-comm i-comm-panel">\
                    <i @click.stop="commitScore(stype, i)" v-for="i in num" class="i-comm" :class="{\'i-comm-on\':i <= score}"></i>\
                </span>',
        props: {
            stype:[String, Number],
            score: {
                type: Number,
                default:5
            }
        },
        methods: {
            commitScore: function (stype, i) {
                this.$emit('commitscore', stype, i)
            }
        }
    };
    export default {
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
                    // 默认满分
                    score01: 5,
                    score02: 5,
                    score03: 5,
                    score04: 5,
                    score05: 5,
                    content: '',
                    greatIds: ''
                }
            }
        },
        created: function () {
            var _this = this;
            const query = _this.query;
            _this.ordersId = query.ordersId;
            // 获取订单详情信息
            _this.$axios.get(_this.$api.ordersview,{params:{ordersId: query.ordersId}})
                .then(function (orderDetail) {
                    _this.param.shopId = orderDetail.shop.shopId;
                    _this.param.servicerId = orderDetail.servicerId || '';
                    _this.orderInfo = orderDetail;
                })
        },
        components: {
            star: Star
        },
        methods: {
            commitScore: function (stype, score) {
                this.param['score0' + stype] = score;
            },
            hasGoodsId: function (goodsId) {
                return this.param.greatIds.indexOf(goodsId) != -1;
            },
            zan: function (goodsId) {
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
            submitFn: function () {
                this.$axios.get(this.$api.commentorders,{params:this.param})
                    .then(function () {
                        alert('评价成功');
//                        layer.msg('评论成功', {shift:0}, function () {
//                            redirect_url(forward())
//                        })
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
<!--<script type="text/javascript">-->
    <!--var query = parseURL( location.href ).query,-->
        <!--_backUrl = document.referrer,-->
        <!--_score = {-->
            <!--'score01':5,-->
            <!--'score02':5,-->
            <!--'score03':5,-->
            <!--'score04':5-->
        <!--};-->

    <!--// 评价-->
    <!--$('.J-comm').on('click', function (e) {-->
        <!--var $target = $(e.target), $children, index;-->

        <!--if ($target.hasClass('i-comm')) {-->
            <!--index = $target.index();-->
            <!--$children = $target.closest('.J-comm').children();-->

            <!--$children.removeClass('i-comm-on').each(function (i, ele) {-->
                <!--if (i > index) return false;-->
                <!--$(ele).addClass('i-comm-on');-->
            <!--});-->

            <!--return false;-->
        <!--}-->

        <!--return false;-->
    <!--})-->

    <!--// 提交评价-->
    <!--$('input[type="submit"]').on('click', function (e) {-->
        <!--e.preventDefault();-->

        <!--var _param,-->
            <!--_con = $.trim($('textarea').val());-->

        <!--if (_con == '') {-->
            <!--return notiejs.alert(2, '请填写评价内容！', 2000);-->
        <!--}-->

        <!--$('.J-comm').each(function (i) {-->
            <!--_score['score0' + (i + 1)] = $(this).find('.i-comm-on').length;-->
        <!--})-->

        <!--_param = $.extend({-->
            <!--'ordersId': query.ordersId || '',-->
            <!--'shopId': query.shopId || '',-->
            <!--'content': _con-->
        <!--}, _score);-->

        <!--this.$axios.get(this.$api.commentorders,{params:_param})-->
            <!--.then(function () {-->
                <!---->
            <!--})-->

<!--//        _A.setCommentOrdersData(_param, function () {-->
<!--//            redirect_url(_backUrl);-->
<!--//        })-->

    <!--})-->
<!--</script>-->
<style>
    textarea { width: 100%; border: 0; outline: none;}
    .shop-info-panel .dib {vertical-align: middle}
    .i-comm-panel:first-child {margin-right: 15%}
</style>
