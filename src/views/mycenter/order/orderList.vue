<template>
    <div class="order-detail" v-cloak>
        <div class="panel my-tab-order">
            <nav class="mod-box tap-panel tab-panel-primary">
                <a v-for="(tabmeun, index) in tabmeuns"
                   @click.prevent="tabNav(index)"
                   :data-type="index" class="box-flex tap-meun"
                   :class="{'tap-meun-on': index == params.type}" href="javascript:;">{{ tabmeun }}</a>
            </nav>
        </div>

        <div class="order-list">
            <loading v-show="loading"></loading>

            <template v-if="!loading">
                <template v-if="ordersList.length">
                    <scroller ref="loadmore"
                              :on-infinite="infinite">

                    <div v-for="(ordersItem, index) in ordersList" class="panel sure-order-list">
                        <div class="panel-hd">
                            <div class="pull-left">
                                <img class="pull-left mr5 mt3 radius50" width="30" height="30"
                                     :src="ordersItem.shop.pic ? ordersItem.shop.pic +'?x-oss-process=image/resize,m_fixed,h_60,w_60' : config.defaultShopPic" alt="">
                            </div>
                            <div class="bfc-panel">
                                <h2 class="">{{ ordersItem.shop.name | cutstr(20) }}</h2>
                                <p class="lightgray f12" style="line-height: 1.2">{{ ordersItem.ctime }}</p>
                            </div>
                            <span class="emb-red pos-rt-middle">{{ ordersItem.statusOrderMsg }}</span>
                        </div>

                        <router-link class="block ml30 p10 lh-22" :to="{name:'myOrderDetail', query: {ordersId: ordersItem.ordersId}}">
                            <div v-for="goodsItem in ordersItem.orderDetail" class="clearfix">
                                <p class="pull-left two-thirds nowrap">{{ goodsItem.goodsName }}</p>
                                <p class="pull-left">x{{ goodsItem.goodsCount }}</p>
                                <p class="pull-right one-fourth text-right">&yen;{{ goodsItem.goodsPrice | toFixed }}</p>
                            </div>
                        </router-link>

                        <div class="pb10 lightgray text-right">
                            共{{ordersItem.goodsCount}}件商品&nbsp;&nbsp;合计&yen;{{ ordersItem.priceCount | toFixed }}

                            <template v-if="ordersItem.shop.shopTypeId == config.shopTypeId.synthe">
                                （含运费&yen;{{ ordersItem.priceLogistics | toFixed }}）
                            </template>
                            <template v-else-if="ordersItem.shop.shopTypeId == config.shopTypeId.spws">
                                （含配送费&yen;{{ ordersItem.priceSend | toFixed }}）
                            </template>
                            &nbsp;
                        </div>

                        <div class="panel-chunk text-right">
                            <p v-if="ordersItem.refundReason" class="text-left mt5 gray bwrd">退款原因：{{ ordersItem.refundReason }}</p>
                            <div class="btns-handler mt5">

                                <template v-if="ordersItem.statusPay == 0">
                                    <template v-if="ordersItem.statusOrder == 0">
                                        <a @click.prevent="cancel(ordersItem.ordersId, $event, index)" class="J-cancel-order btn btn-default" href="javascript:;">取消订单</a>
                                        <router-link v-if="!(ordersItem.shop.shopTypeId == config.shopTypeId.spws && ordersItem.payType === HDFK_VAL)" class="btn btn-primary"
                                           :to="{name:'choosePayWay',query:{'ordersId':ordersItem.ordersId}}">立即付款</router-link>
                                    </template>
                                </template>
                                <template v-if="ordersItem.statusPay == 1">
                                    <template v-if="ordersItem.statusOrder == 1 || ordersItem.statusOrder == 2">
                                        <!--<a class="btn btn-default" :href="'tel:'+ordersItem.shop.phone">催单</a>-->
                                        <!--<a @click.prevent="refund(ordersItem.ordersId, $event)" class="J-refund btn btn-primary" href="javascript:;">申请退款</a>-->

                                        <router-link class="J-refund btn btn-primary" :to="{name:'refundReason',query:{'ordersId':ordersItem.ordersId,'priceCount':ordersItem.priceCount}}">申请退款</router-link>

                                    </template>
                                    <template v-if="ordersItem.statusOrder == 3 || ordersItem.statusOrder == 4">
                                        <!--<a class="btn btn-default" :href="'tel:'+ordersItem.shop.phone">催单</a>-->
                                        <!--<a v-if="!(ordersItem.shop.shopTypeId == config.shopTypeId.spws && ordersItem.payType === HDFK_VAL)" class="J-refund btn btn-default" :href="'refund-reason.html?ordersId='+ordersItem.ordersId + '&priceCount=' + ordersItem.priceCount">申请退款</a>-->


                                        <!--<router-link class="mr15" :to="{name:'editAddress', query: {type:'edit',userAddressId : addressItem.userAddressId} }"></router-link>-->

                                        <router-link v-if="!(ordersItem.shop.shopTypeId == config.shopTypeId.spws && ordersItem.payType === HDFK_VAL)" class="J-refund btn btn-default" :to="{name:'refundReason',query:{'ordersId':ordersItem.ordersId,'priceCount':ordersItem.priceCount}}">申请退款</router-link>

                                        <a @click.prevent="sure(ordersItem.ordersId, $event, index)" class="J-sure btn btn-primary" href="javascript:;">确认订单</a>
                                    </template>
                                    <!--<template v-if="ordersItem.statusOrder == 7">
										<a class="btn btn-primary" :href="'order-comments.html?ordersId='+ordersItem.ordersId+'&shopId='+ordersItem.shop.shopId">评价订单</a>
									</template>-->
                                </template>
                                <template v-if="ordersItem.statusPay == 4">
                                    <template v-if="ordersItem.statusOrder == 3 || ordersItem.statusOrder == 4">
                                        <!--<a class="btn btn-default" :href="'tel:'+ordersItem.shop.phone">催单</a>-->
                                        <a @click.prevent="sure(ordersItem.ordersId, $event, index)" class="J-sure btn btn-primary" href="javascript:;">确认订单</a>
                                    </template>
                                    <!--<template v-if="ordersItem.statusOrder == 7">
										<a class="btn btn-primary" :href="'order-comments.html?ordersId='+ordersItem.ordersId+'&shopId='+ordersItem.shop.shopId">评价订单</a>
									</template>-->
                                </template>
                                <template v-if="ordersItem.statusPay == 5">
                                    <template v-if="ordersItem.statusOrder <= 2">
                                        <!--<a class="btn btn-default" :href="'tel:'+ordersItem.shop.phone">催单</a>-->
                                        <a @click.prevent="cancel(ordersItem.ordersId, $event, index)" class="J-cancel-order btn btn-primary" href="javascript:;">取消订单</a>
                                    </template>
                                    <template v-if="ordersItem.statusOrder == 3 || ordersItem.statusOrder == 4">
                                        <!--<a class="btn btn-default" :href="'tel:'+ordersItem.shop.phone">催单</a>-->
                                        <a @click.prevent="sure(ordersItem.ordersId, $event, index)" class="J-sure btn btn-primary" href="javascript:;">确认订单</a>
                                    </template>
                                </template>

                                <template v-if="ordersItem.statusOrder == 7">
                                    <!--<a class="btn btn-primary" :href="'order-comments.html?ordersId='+ordersItem.ordersId+'&shopId='+ordersItem.shop.shopId">评价订单</a>-->
                                    <router-link class="btn btn-primary" :to="{name:'orderComments',query:{'ordersId':ordersItem.ordersId,'shopId':ordersItem.shop.shopId}}">评价订单</router-link>
                                    <!--<router-link class="btn btn-primary" :to="{name:'orderComments',query:{ordersId:ordersItem.ordersId}}">评价订单</router-link>-->
                                </template>

                            </div>
                        </div>
                    </div>

                    </scroller>
                </template>

                <empty v-else :msg="emptyMsg">
                    <img slot="icon" width="180" src="../../../assets/images/empty/img_wdd@2x.png" alt=""/>
                    <router-link slot="button" :to="config.index" class="btn btn-default mt20">返回首页</router-link>
                </empty>

            </template>

        </div>
<!--
        &lt;!&ndash; 退款原因层 start &ndash;&gt;
        <div class="refund-cause-layer hidden">
            <h2 class="tit f16">请选择申请退款理由</h2>
            <ul class="cause-list lightgray">
                <li v-for="(reasonItem, index) in reasonList" class="J-radio">{{ reasonItem.summary }}<i class="i-radio"></i></li>
                <li class="J-radio" data-reason="-1">其他原因<i class="i-radio"></i></li>
            </ul>
            <p class="center-block ptb20 two-thirds">
                <a class="btn btn-lg btn-block btn-primary" href="javascript:;">提交</a>
            </p>
        </div>
        &lt;!&ndash; 退款原因层 end &ndash;&gt;

        &lt;!&ndash; 其他原因 start &ndash;&gt;

        <div id="otherReasonLayer" class="panel-chunk" style="display: none">
            <textarea name="otherreason" cols="30" rows="5" class="one-full mb10"></textarea>
            <a class="btn btn-lg btn-block btn-primary" href="javascript:;">确定</a>
        </div>

        &lt;!&ndash; 其他原因  end &ndash;&gt;

        <main-nav :current-nav-index="currentNavIndex"></main-nav>-->

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data () {
            return {
//                query: {},
                HDFK_VAL: 3, // 3为货到付款
                currentNavIndex:3,
                _loadMore: null,
                loading: true,
                timeId: null,
                allLoaded: false,
                tabmeuns: ['全部', '待付款', '待完成', '待评价', '退款'],
                emptyMsg: {
                    mainMsg:'暂无订单哦~',
                    subMsg: '赶快去选择心仪的商品吧!'
                },
                params: {
                    page: 1,
                    type: 0
                },
                noData: false,
                ordersList: [],
                reasonList: []
            }
        },
        created () {
            var _this = this;

            this.params.type = this.query.type || 0;
            // 初始化订单信息
            this.getOrders();
            // 退款理由
//			_A.getRefundreasonData(function (reasonList) {
//				_this.reasonList = reasonList
//			});


        },
        methods: {
            getOrders (bConcat, cb) {
                //var _this = this;

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = null;
                }

                !bConcat  ? (this.loading = true) : '';

                this.$axios.post(this.$api.eOrderslist, $.param(this.params))
                    .then(({data, status}) => {
                        let ordersList = data;

                        this.loading = false;

                        // 返回空列表，表示无数据
                        if (!ordersList.length) {
                            this.noData = true
                        }

                        // 合并
                        if (bConcat) {
                            this.ordersList = this.ordersList.concat(ordersList)
                        } else {
                            this.ordersList = ordersList
                        }

                        this.$nextTick(function () {
                            cb && cb(ordersList)
                        })
                    })
            },
            // 下拉更新
//            refresh (done) {
//                setTimeout(() => {
//                    done();
//                },1500)
//            },
            // 上拉加载更多
            infinite (done) {

                clearTimeout(this.timeId);

                if (this.noData) {
                    setTimeout(() => {
                        console.log('come over')
                        done(true)
                    }, 500)
                   return;
                }

                this.timeId = setTimeout(() => {
                    this.params.page++;

                    this.getOrders(true, () => {
                        done()
                    })

                }, 1500)

            },
            tabNav (index) {

                this.params.type = index;
                this.params.page = 1;
                this.noData = false;
                //this._loadMore = null;

                this.getOrders();
            },
            hideBtn (ev) {
                ev.target.style.display = 'none'
            },
            // 取消订单
            cancel (ordersId, ev, idx) {
                var _this = this;

                this.$vux.confirm.show({
                    title:'温馨提示',
                    content:'您确定要取消订单吗？',
                    onCancel () {

                    },
                    onConfirm () {
                        _this.$axios.post(_this.$api.cancelorders, $.param({ordersId: ordersId}))
                            .then(({data, status}) => {
                            _this.$vux.toast.show({
                                    text: '取消成功',
                                    onHide () {
                                        if (_this.params.type == 0) {
                                            // tab:全部，重新获取数据
                                            _this.params.page = 1;
                                            _this.getOrders();
                                        } else {
                                            // 其它移除
                                            _this.ordersList.splice(idx, 1);
                                        }
                                    }
                                })
                            })
                    }
                })

            },
            // 确认订单
            sure (ordersId, ev, idx) {
                var _this = this,
                    dataset = ev.target.dataset;

                if (dataset.isDisabled) return;
                dataset.isDisabled = true;

                // 提交确认服务处理
                this.$axios.post(this.$api.confirmorders, $.param({ordersId: ordersId}))
                    .then((data, status) => {

                        this.$vux.confirm.show({
                            title:'温馨提示',
                            content:'确认成功',
                            onCancel () {
                                dataset.isDisabled = false;
                            },
                            onConfirm () {
                                this.$router.go(0)
                            }
                        })

                    })
            },
            // 退款
            refund (ordersId, ev) {
                var _this = this,
                    dataset = ev.target.dataset;

                layer.open({
                    type:1,
                    title:0,
                    shift:1,
                    area: '90%',
                    scrollbar: false,
                    content: $('.refund-cause-layer'),
                    success: function (layero, index) {
                        var $radio = $(layero).find('.J-radio'),
                            $subBtn = $(layero).find('.btn'),
                            otherFlag = false,
                            _reason = '';

                        setRadio(function (status) {
                            if (!!status) {
                                // 提交退款申请
                                var $parent = $(this).parent();

                                _reason = $parent.text();

                                // 其他原因
                                if ($parent.data('reason') === -1) {
                                    layer.open({
                                        type:1,
                                        title:'其他原因',
                                        shift:1,
                                        area: '90%',
                                        scrollbar: false,
                                        content: $('#otherReasonLayer'),
                                        success: function (layeroEl, index) {
                                            var _val,
                                                $yesBtn = $(layeroEl).find('.btn');

                                            $yesBtn.off('click').on('click', function () {
                                                _val = $.trim($(layeroEl).find('textarea').val())

                                                if (_val === '') {
                                                    return layer.msg('请填写原因', {icon:2});
                                                }

                                                otherFlag = true;
                                                _reason = _val;
                                                //layer.close(index);
                                                $subBtn.trigger('click');
                                            })
                                        },
                                        cancel: function () {
                                            if (!otherFlag) {
                                                _reason = '';
                                                $('.refund-cause-layer .i-radio').removeClass('checked');
                                            }
                                        }
                                    })
                                }
                            }
                        })

                        $subBtn.off('click').on('click', function (e) {
                            if (_reason === '' && !otherFlag) {
                                return layer.msg('请选择退款原因', {icon:2});
                            }

                            _A.refundOrdersData({ordersId: ordersId, reason: _reason}, function () {
                                layer.closeAll();
                                //$btn.remove();
                                //redirect_url(location.href);
                                _this.hideBtn(ev)
                                layer.msg('申请成功')
                            });

                            e.stopPropagation();
                        })

                    },
                    end: function () {
                        $('.refund-cause-layer .i-radio').removeClass('checked');
                    }

                });
            },
            // 滚动底部加载
            loadBottom (id) {
                let _this = this;

                this.getOrders(true, () => {
                    // if all data are loaded
                    _this.allLoaded = true;
                });

                this.$refs.loadmore.onBottomLoaded(id);
            }
        },
        computed: {
            ...mapGetters(['config']),
            isHdfk: function () {
                return this.ordersItem.shop.shopTypeId == config.shopTypeId.spws && this.ordersItem.payType === this.HDFK_VAL
            },
            query () {
                return this.$route.query
            }
        }
    }
</script>

<style lang="less" scoped>
    .order-detail {
        padding-bottom: 0;
        padding-top: 40px;
        height: 100%;

        .my-tab-order {
            position: absolute;
            top:0;
            width: 100%;
            z-index: 5;
        }

        .order-list {
            position: relative;
            height: 100%;
            overflow: hidden;
        }

    }
</style>
