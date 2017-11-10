<template>
    <div class="order-detail-wrap">
        <!-- 我的订单 start -->

        <!--- 搜索 start -->
        <div class="header nav-header-search">
            <i @click="search" class="btn icos-sprite search-btn pull-right"></i>
            <div class="header-search"><input type="text" class="search-key" v-model="keyword" placeholder="订单搜索"/></div>
        </div>
        <!--- 搜索 end -->

        <div class="order-detail" v-cloak>
            <div class="panel my-tab-order">
                <nav class="mod-box tap-panel">
                    <!-- 不同的订单 nav 不一样 具体看原型 -->
                    <a v-for="(tabmeun, index) in tabmeuns"
                       @click.prevent="tabNav(index, $event)"
                       :data-type="index"
                       :class="{'tap-meun-on': param.type == index}"
                       class="box-flex tap-meun" href="javascript:;">{{ tabmeun }}</a>
                </nav>
            </div>

            <div class="order-list">
                <!-- 数据区 -->
                <!--<loading v-show="loading"></loading>-->
                <template v-if="ordersList.length">
                    <div v-for="(orderItem, index) in ordersList" class="panel sure-order-list">
                        <div class="panel-hd">
                            <div class="pull-left">
                                <img class="pull-left mr5 mt3 radius50" width="30" height="30"
                                     :src="orderItem.shop.pic+'?x-oss-process=image/resize,m_fixed,h_113,w_113'" alt="" />
                            </div>
                            <div class="bfc-panel">
                                <h2 class="">{{ orderItem.shop.name | cutstr(20) }}</i></h2>
                                <p class="lightgray f12" style="line-height: 1.2">{{ orderItem.ctime }}</p>
                            </div>
                            <span class="emb-red pos-rt-middle">{{ orderItem.statusOrderMsg }}</span>
                        </div>

                        <a class="block ml30 p10 lh-22" :href="'order-manage-detail.html?ordersId='+orderItem.ordersId">
                            <div v-for="goodsItem in orderItem.orderDetail" class="clearfix">
                                <p class="pull-left two-thirds nowrap">{{ goodsItem.goodsName }}</p>
                                <p class="pull-left">x{{ goodsItem.goodsCount }}</p>
                                <p class="pull-right one-fourth text-right">&yen;{{ goodsItem.goodsPrice | toFixed }}</p>
                            </div>
                        </a>

                        <div class="pb10 text-right">
                            共<ins class="emb-red">{{ orderItem.goodsCount }}</ins>件商品  合计
                            <ins class="emb-red"> &yen;{{ orderItem.priceCount | toFixed }}</ins>
                            <template v-if="query.shopTypeId == shopTypeId.synthe">
                                （含运费&yen;{{ orderItem.priceLogistics }}）
                            </template>
                            <template v-else-if="query.shopTypeId == shopTypeId.jsws">
                                （含配送费&yen;{{ orderItem.priceSend }}）
                            </template>
                        </div>

                        <div class="panel-bd text-right">
                            <div class="btns-handler mt5">
                                <template v-if="orderItem.statusPay === 1 || orderItem.statusPay === 4 || orderItem.statusPay === 5">
                                    <template v-if="orderItem.statusOrder === 1 || orderItem.statusOrder === 2">
                                        <a v-if="orderItem.shop.shopTypeId == shopTypeId.synthe"
                                           @click.prevent="btnHanderFn(orderItem.ordersId, $event)"
                                           class="J-send btn btn-default"
                                           href="javascript:;"
                                           data-fn="fh">去发货</a>
                                        <a v-else-if="orderItem.shop.shopTypeId != shopTypeId.ddxf"
                                           class="J-send btn btn-default"
                                           :href="'service-person-manage.html?type=choose&ordersId='+orderItem.ordersId+'&shopId='+orderItem.shop.shopId">
                                            去{{ (orderItem.shop.shopTypeId === shopTypeId.o2o ? '服务' : '配送') }} </a>
                                        <a class="btn btn-primary" :href="'tel:'+orderItem.phone">联系买家</a>
                                    </template>
                                </template>

                                <template v-if="orderItem.statusPay == 2">
                                    <a @click.prevent="btnHanderFn(orderItem.ordersId, $event)" class="J-yesTK btn btn-default" href="javascript:;" data-fn="yestk">同意退款</a>
                                    <a @click.prevent="btnHanderFn(orderItem.ordersId, $event)" class="J-noTK btn btn-primary" href="tel:10086" data-fn="notk">不同意退款</a>
                                </template>
                            </div>
                        </div>

                    </div>
                </template>
                <empty v-else :msg="emptyMsg"></empty>

            </div>
        </div>
    </div>
</template>
<script>
import config from '../../../config/index'
// console.log(config.shopTypeId.o2o,'666666666666666666666')
    export default ({
        data(){
            return{
                _loadMore: null,
//                loading: true,
                keyword:'',
                //tabmeuns: ['全部', '待服务', '待收货', '退款处理'],
                emptyMsg: {
                    mainMsg:'暂无订单数据~'
                },
                param: {
                    page: 1,
                    // 0全部，2待发货（待服务），3待收货(待确认)，-1退款处理，默认0，不传或传错为0。
                    type: 0
                },
                shopTypeId:'',
                ordersList: []
            }
        },
        created: function () {
            var _this = this;
            const query = _this.query;
            _this.shopTypeId = _this.query.shopTypeId;

            // 初始化订单管理
            this.getOrdersList()
        },
        methods: {
            // 订单数据
            getOrdersList: function (bConcat, cb) {
                var _this = this;

                if (bConcat == null) {
                    bConcat = false;
                }

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = false;
                }

                _this.loading = true;
                _this.$axios.get(_this.$api.orderslist,{params:_this.param})
                    .then(function (result) {
                        if (result.ordersCount) {
                            // 有订单数据
                            if (bConcat) {
                                _this.ordersList = _this.ordersList.concat(result.ordersList)
                            } else {
                                _this.ordersList = result.ordersList
                            }
                            // 加载更多
                            if (!_this._loadMore) {
                                _this._loadMore = _this.loadMore();
                            }

                            _this._loadMore && _this._loadMore.update();
                            // 回调处理
                            cb && cb(result);
                        } else {
                            _this.ordersList = []
                        }
                    })
            },
            // tab 切换
            tabNav: function (index, ev) {
                var dataset = ev.target.dataset;
                this.param.type = dataset.type;
                this.param.page = 1;

                this.getOrdersList();
            },
            // 隐藏按钮
            hideBtn: function (ev) {
                ev.target.style.display = 'none'
            },
            // 发货、退款等处理
            btnHanderFn: function (ordersId, ev) {
                var dataset = ev.target.dataset,
                    handleFn, _this = this;

                switch (dataset.fn) {
                    case 'fh':
                        handleFn = _A.setSendOrdersData;
                        break;
                    case 'yestk':
                        handleFn = _A.setRefundOrdersData;
                        break;
                    case 'notk':
                        handleFn = _A.setRefundrefuseOrdersData;
                        break;
                }

                handleFn && handleFn({ordersId: ordersId}, function () {
                    _this.hideBtn(ev);
                    layer.msg('操作成功', {shift:0});
                })

            },
            // 订单搜索
            search: function () {
                if (this.keyword == '') {
                    return layer.msg('请输入搜索内容', {icon:2});
                }

//                redirect_url('order-manage-search.html?key=' + this.keyword);
            },
            // 滚动底部加载
            loadMore: function loadMore() {
                var _this = this;

                return $('.order-detail').loadMore({
                    scrollArea : window,
                    loadDownFn: function (me) {
                        var data;
                        // 初始化全部促销分类商品
                        _this.param.page += 1;

                        _this.getOrdersList(true, function (result) {

                            if (!result.ordersList.length) {

                                me.noData();
                            }
                            me.refresh();

                        });
                    }
                }).data('load-more');
            }
        },
        computed: {
            tabmeuns () {
                var result = {};

                // 区分店铺类型
                switch (this.query.shopTypeId) {

                    case config.shopTypeId.o2o:
                        result = {
                            '0':'全部',
                            '2':'待出发',
                            '3':'待完成',
                            '-1':'退款'
                        };
                        break;
                    case config.shopTypeId.jsws:
                        result = {
                            '0':'全部',
                            '2':'待配送',
                            '3':'待完成',
                            '-1':'退款'
                        };
                        break;
                    case config.shopTypeId.ddxf:
                        result = {
                            '0':'全部',
                            '3':'未使用',
                            '-1':'退款'
                        };
                        break;
                    case config.shopTypeId.synthe:
                    default :
                        result = {
                            '0':'全部',
                            '2':'待发货',
                            '3':'待收货',
                            '-1':'退款'
                        };
                        break;
                }
                return result;
            },
            query() {
                return this.$route.query
            }
        }
    })
</script>

<style>

</style>
