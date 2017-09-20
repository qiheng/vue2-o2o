<template>
    <div class="animsition pb60" v-cloak>
        <div class="sales-promotion-wrap">
            <!-- ad start -->
            <div v-if="salesInfo.bigPic">
                <img class="img-responsive" :src="salesInfo.bigPic+'?x-oss-process=image/resize,m_fixed,h_300,w_720'" alt=""/>
            </div>
            <div v-if="isTimeLimitBuy && salesInfo.mobilePromotionId" class="dw-time-panel mb10" :data-time="etime" :data-format="1">
                <div class="pos-rt-middle lightgray">
                    <template v-if="etime > 0">
                        <p class="f18 orange mb5">抢购中</p>
                        <span class="time">
						<ins>00</ins>:<ins>00</ins>:<ins>00</ins>
					</span>
                        距离活动结束
                    </template>
                    <template v-else>
                        <p class="f18 orange mb5">抢购结束</p>
                        活动结束
                    </template>
                </div>
            </div>
            <!-- 商品列表 start -->
            <div class="panel-list-nospace sales-promotion-list">
                <!--<loading style="padding-top: 50px" v-show="loading"></loading>-->
                <template v-if="query.salesType == 0 && salesList.length">
                    <!-- 限时抢购 -->
                    <a :href="'product-datail.html?goodsId='+saleItem.goodsId" v-for="(saleItem, index) in salesList" :key="saleItem.goodsId" class="container panel-item">
                        <div class="panel-inner">
                            <div class="panel-pic">
                                <img  width="72" height="72" :src="(saleItem.pics.length ? saleItem.pics[0].picUrl : config.defaultGoodsPic )+'?x-oss-process=image/resize,m_fixed,h_200,w_200'" alt=""/>
                            </div>
                            <div class="panel-info f12">
                                <div class="lightgray">
                                    <img width="12" height="12" src="images/icons-v3/icons1/icon_shop2.png" alt=""/>
                                    {{saleItem.shop.name}}（{{ saleItem.shop.address }}）
                                </div>
                                <h2 class="mt2 panel-tit nowrap">{{ saleItem.name }} </h2>
                                <div class="mt2 lightgray">
                                    <span class="i-label">已抢{{ saleItem.salesSalesNum || 0 }}份</span>&nbsp;剩余{{ saleItem.salesInventory || 0 }}份
                                </div>
                                <p class="mt2 orange">
                                    <span class="price mr5">&yen; <i data-rel-price="" class="f18">{{ saleItem.eprice }}</i></span>
                                    <del class="lightgray mr5">&yen; {{ saleItem.price }}</del>
                                </p>
                                <span class="btn btn-primary btn-buy">立即抢购</span>
                            </div>
                        </div>
                    </a>
                </template>

                <template v-if="query.salesType == 1 && salesList.length">
                    <!-- 店铺 -->
                    <a v-for="shopItem in salesList" class="container panel-item"
                       :href="'shop-detail.html?shopId='+shopItem.shopId">
                        <div class="panel-inner">

                            <div class="panel-pic">
                                <img width="72" height="72"
                                     :src="(shopItem.pic ? shopItem.pic : config.defaultGoodsPic)+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt="">

                            </div>
                            <div class="gray f12 panel-info">
                                <h2 class="panel-tit">{{ shopItem.name | cutstr(16) }}

                                    <span v-if="shopItem.self" class="i-label ml10 f12">自营</span>

                                </h2>
                                <p>
                                    <i :class="'star2 star-'+Math.round(shopItem.score)"></i><span class="dib-middle ml5 orange">{{ shopItem.score }}</span>
                                    <span class="ml30 lightgray">月售：{{ shopItem.salesMonthCount }}单</span>
                                </p>
                                <p class="nowrap mt5">{{ shopItem.summary }}</p>
                                <div class="clearfix mt5">
                                    <p class="pull-left">
                                        <span class="i-label mr5">{{ shopItem.shopCategoryName }}</span>
                                        <span class="i-label">{{ shopTypeName[shopItem.shopTypeId] }}</span>
                                    </p>
                                    <i class="pull-right ml5 mt5">
                                        <!--<i class="i-dwei"></i>&lt;-->
                                        {{ shopItem.distance }}
                                    </i>
                                </div>

                                <ul v-if="shopItem.saleList" class="panel-yhInfo f12">
                                    <li v-for="saleItem in shopItem.saleList" :class="saleClass[saleItem.salesType]">{{ saleItem.name }}</li>
                                </ul>

                                <ul v-if="shopItem.goodsList && shopItem.goodsList.length" class="list-fl mt10 tui-goods-list">
                                    <li v-for="subgoods in shopItem.goodsList">
                                        <img width="100%" height="100%" class="img-responsive"
                                             :src="(subgoods.pics ? subgoods.pics[0].picUrl : config.defaultGoodsPic) + '?x-oss-process=image/resize,m_fixed,h_50,w_50'" alt=""/>
                                        <b>&yen;{{ subgoods.price }}</b>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </a>
                </template>

                <template v-if="query.salesType == 2 && salesList.length">
                    <!-- 商品 -->
                    <a :href="'product-datail.html?goodsId='+saleItem.goodsId" v-for="(saleItem, index) in salesList" :key="saleItem.goodsId" class="container panel-item">
                        <div class="panel-inner">
                            <div class="panel-pic">
                                <img  width="72" height="72" :src="(saleItem.pics.length ? saleItem.pics[0].picUrl : config.defaultGoodsPic )+'?x-oss-process=image/resize,m_fixed,h_200,w_200'" alt=""/>
                            </div>
                            <div class="panel-info f12">
                                <div class="lightgray">
                                    <img width="12" height="12" src="images/icons-v3/icons1/icon_shop2.png" alt=""/>
                                    {{saleItem.shop.name}}（{{ saleItem.shop.address }}）
                                </div>
                                <h2 class="mb5 mb10 panel-tit nowrap">{{ saleItem.name }} </h2>
                                <p class="mt2 orange">
                                    <span class="price mr5">&yen; <i data-rel-price="" class="f18">{{ saleItem.eprice }}</i></span>
                                    <del class="lightgray mr5">&yen; {{ saleItem.price }}</del>
                                </p>
                                <span class="btn btn-primary btn-buy">立即抢购</span>
                            </div>
                        </div>
                    </a>
                </template>
                <empty v-if="isEmpty" :msg="emptyMsg"></empty>
            </div>
            <!-- 商品列表 end -->
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
//                query: query,
//                loading: true,
                _loadMore: null,
                emptyMsg: {
                    mainMsg:'暂无数据~'
                },
                salesInfo:{
                    sales: {}
                },
                salesList:[],
                param: {
                    page:1,
                    salesType: '',
                    promotionId:  ''
                }
            }
        },
        created: function () {
            var _this = this;
            const query = _this.query;
            _this.param.salesType = _this.query.salesType;
            _this.param.promotionId = _this.query.promotionId;
            this.getgoodslistbysalesid();
        },
        mounted: function () {
            // 设置标题
            this.setTitle()
        },
        methods: {
            setTitle: function () {
                document.title = ['限时抢购', '活动店铺', '活动商品'][Number(this.query.salesType)] || '活动促销'
            },
            getgoodslistbysalesid: function (bConcat, cb) {
                var _this = this;

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = false;
                }

                _this.$axios.get(_this.$api.promotionModel,{params:_this.param})
                    .then(function (salesInfo) {
                        // 第一次加载
                        if (!_this._loadMore) {
                            _this.salesInfo = salesInfo;
                            console.log(salesInfo,'666666+++++++++++++++++++++++++666666666666666666666666666');

                            if (_this.isTimeLimitBuy) {
                                // 倒计时
                                _this.$nextTick(function () {
                                    countDown($('.dw-time-panel'))
                                })
                            }
                        }

                        var salesList = salesInfo.jsonArray;

                        // 合并
                        if (bConcat) {
                            _this.salesList = _this.salesList.concat(salesList)
                        } else {
                            _this.salesList = salesList;
                        }

                        // loadDown
                        if (!_this._loadMore) {
                            _this._loadMore = _this.loadMore();
                        }

                        _this._loadMore && _this._loadMore.update();

                        cb && cb(salesList)
                    })
            },
            // 滚动底部加载
            loadMore: function loadMore() {
                var _this = this;

                return $('.sales-promotion-list').loadMore({
                    scrollArea : window,
                    loadDownFn: function (me) {

                        var data;
                        // 初始化全部促销分类商品
                        _this.param.page += 1;
                        _this.getgoodslistbysalesid(true, function (salesList) {

                            if (!salesList.length) {
                                me.noData();
                            }
                            me.refresh();
                        });
                    }
                }).data('load-more');
            }
        },
        computed: {
            // 获取当前距离结束时间的秒数
            etime: function () {
                var dTime = this.salesInfo.sales && this.salesInfo.sales.dTime || 0;
                return dTime / 1000;
            },
            // 判断是否是限时抢购
            isTimeLimitBuy: function () {
                var salesType = this.query.salesType;
                return salesType == 0
            },
            isEmpty: function () {
                return !this.salesList.length
            },
            query() {
                return this.$route.query
            }
        }
    }
</script>
<style>

</style>
