<template>
    <div class="viewbox-container" v-cloak>
        <div class="viewbox order-detail">
            <!-- 订单状态 start -->
            <div v-if="orderInfo.orderType != orderType.SCANORDER" class="order-status-panel">
                <div class="order-status-con">
                    <div class="table-type p10 btm-brd-gray">
                        <a class="tbl-cell-ct"
                           :href="(orderInfo.shop.shopTypeId == shopTypeId.ddxf || isReceiving) && !(orderInfo.statusPay == 2 || orderInfo.statusPay == 3) && orderInfo.salesCode
                       ? 'consumer-code.html?name='
                       + orderInfo.shop.name + '&areaName='+ orderInfo.shop.areaName + '&salesCode=' + orderInfo.salesCode + '&pic=' + orderInfo.shop.pic
                       : 'javascript:;'">
                            <!--consumer-code.html-->
                            <img class="mr5" width="45" height="45" :src="status.statusPic" alt="">
                        </a>
                        <div class="tbl-cell-mid">
                            <div class="text-left">
                                <template v-if="orderInfo.shop.shopTypeId == shopTypeId.ddxf || isReceiving">
                                    <!--<h2 class="f18">消费码:{{ orderInfo.statusPay == 2 ? '已冻结' : (orderInfo.statusPay == 3 ? '订单已退款' : orderInfo.salesCode) }}</h2>-->
                                    <h2 class="f18">消费码：{{ salesCode }}</h2>
                                    <p class="tbl-cell-ct lightgray">点击扫码完成消费</p>
                                </template>
                                <h2 v-else class="f20 orange">{{ status.statusMsg }}</h2>
                            </div>
                        </div>
                    </div>

                    <div class="mt10">
                        <ul class="table-type f12">
                            <li v-for="status in status.statusArr" class="tbl-cell-ct">{{ status }}</li>
                        </ul>
                        <p class="mt5 text-center">
                            <img width="70%" :src="status.progressPic" alt="">
                        </p>
                    </div>
                </div>
            </div>
            <!-- 订单状态 end -->

            <!-- 卖家商品信息 start -->
            <div class="panel-nobrd sure-order-list">
                <router-link class="panel-chunk lh-22" :to="{path:'/shopDetail', query: {shopId: orderInfo.shop.shopId}}">
                    <img class="pull-left mr5 radius50" width="22" height="22" :src="(orderInfo.shop.pic ? orderInfo.shop.pic : config.defaultShopPic)+'?x-oss-process=image/resize,m_fixed,h_60,w_60'" alt="">
                    <!--<h2>{{ orderInfo.shop.name | cutstr(20) }}</h2>-->
                    <i class="pos-rt-middle arr-rt"></i>
                    <h2>{{ orderInfo.shop.name | cutstr(20) }}</h2>
                </router-link>


                <template v-if="!isBook">
                    <div class="panel-chunk order-detail-list">
                        <div v-for="(goodsItem, index) in orderInfo.orderDetail" class="ml25 clearfix">
                            <p class="pull-left two-thirds nowrap">{{ goodsItem.goodsName }}</p>
                            <p class="pull-left">x{{ goodsItem.goodsCount }}</p>
                            <p class="pull-right one-fourth text-right">&yen;{{ goodsItem.goodsPrice | toFixed }}</p>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="panel-chunk">
                        <span class="pull-left two-thirds nowrap">预定金额</span>
                        <span class="pull-right one-fourth text-right">&yen;{{ orderInfo.priceCount | toFixed }}</span>
                    </div>
                    <div class="panel-chunk">
                        <span class="pull-left two-thirds nowrap">实际金额</span>
                        <span class="pull-right one-fourth text-right">&yen;{{ orderInfo.priceCount | toFixed }}</span>
                    </div>
                </template>


                <!-- 卖家商品信息 end -->

                <!-- 传统电商 物流费 -->
                <div v-if="orderInfo.shop.shopTypeId == shopTypeId.synthe" class="panel-chunk">
                    <span class="pull-left">运费</span>
                    <span class="pull-right">&yen;{{ orderInfo.priceLogistics | toFixed }}</span>
                </div>
                <!-- 商品外送 配送费 -->
                <!--<div v-if="orderInfo.shop.shopTypeId == shopTypeId.jsws" class="panel-chunk">
                    <span class="pull-left">配送费</span>
                    <span class="pull-right">&yen;{{ orderInfo.priceSend | toFixed }}</span>
                </div>-->

                <!--<div class="panel-chunk">
                    <span class="pull-left">优惠券</span>
                    <span class="pull-right emb-red">-&yen;{{ orderInfo.priceCoupon | toFixed }}</span>
                </div>-->

                <div v-if="!isBook" class="panel-chunk">
                    <div class="mt5"><span class="pull-right">&yen;{{ orderInfo.priceGoods | toFixed }}</span><b>商品金额</b></div>
                    <ul class="lh-22 ptb5">
                        <li>
                            <span class="pull-right emb-red">-&yen;{{ orderInfo.priceCoupon | toFixed }}</span>
                            <span class="lightgray">优惠券</span>
                        </li>
                        <li>
                            <span class="pull-right emb-red">-&yen;{{ (orderInfo.goodsAllDiscount || 0) | toFixed }}</span>
                            <span class="lightgray">优惠金额</span>
                        </li>
                        <li v-if="isSPWS && !isReceiving">
                            <span class="pull-right " :class="{'emb-red':(orderInfo.freeStatus == 1)}">{{ orderInfo.freeStatus == 1 ? '(免)' : '' }}&yen;{{ orderInfo.priceSend | toFixed }}</span>
                            <span class="lightgray">配送费</span>
                        </li>
                    </ul>
                    <div class="mb5"><span class="pull-right">&yen;{{ orderInfo.priceCount | toFixed }}</span><b>实际支付</b></div>
                </div>

            </div>
            <!-- 卖家商品信息 end -->

            <!-- 自提订单 start -->
            <div v-if="isReceiving" class="panel-nobrd">
                <div class="panel-hd">
                    <span class="pull-right">{{ orderInfo.linkman }}</span>
                    <b>自&nbsp;&nbsp;提&nbsp;&nbsp;点：</b>
                </div>

                <ul class="panel-bd lh-22">
                    <li class="clearfix">
                        <span class="lightgray">联系电话：</span>
                        <span>{{ orderInfo.phone }}</span>
                    </li>
                    <li class="clearfix">
                        <span class="lightgray">取货地址：</span>
                        <span>{{ orderInfo.address }}</span>
                    </li>
                </ul>

            </div>
            <!-- 自提订单 end -->

            <!-- 预定订单 start -->
            <div v-if="isBook" class="panel-nobrd">
                <div class="panel-hd">
                    <span class="pull-right">{{ orderInfo.comeTime }}</span><b>预定信息</b>
                </div>

                <ul class="panel-bd lh-22">
                    <li class="clearfix">
                        <span class="lightgray">预&nbsp;&nbsp;定&nbsp;&nbsp;人：</span>
                        <span class="mr10">{{ orderInfo.linkman }}</span>
                        <a href="tel:10000">{{ orderInfo.phone }}</a>
                    </li>
                    <li class="clearfix">
                        <span class="lightgray">预定座位：</span>
                        <span>{{ orderInfo.orderDetail[0].goodsName }}</span>
                    </li>
                    <li class="clearfix">
                        <span class="lightgray">预定人数：</span>
                        <span>{{ orderInfo.orderDetail[0].goodsCount }}</span>
                    </li>
                </ul>

            </div>
            <!-- 预定订单 end -->

            <!-- 配送信息 start -->
            <div v-if="orderInfo.shop.shopTypeId != shopTypeId.ddxf && !isReceiving" class="panel-nobrd buyer-info-panel">
                <!--<div v-if="orderInfo.shop.shopTypeId == shopTypeId.o2o || orderInfo.shop.shopTypeId == shopTypeId.jsws"
                     class="panel-chunk">到达时间：{{ orderInfo.comeTime ? orderInfo.comeTime : '尽快到达' }}</div>-->

                <div class="panel-chunk">
                    <span class="pull-right lightgray">到达时间：{{ orderInfo.comeTime ? orderInfo.comeTime : '尽快到达' }}</span>
                    <b>{{ orderInfo.shop.shopTypeId == shopTypeId.o2o ? '服务' :  '配送' }}信息</b>
                </div>

                <a v-if="orderInfo.servicerId && !(orderInfo.statusOrder > 6 || orderInfo.statusPay == 3)" class="panel-chunk" :href="'delivery-staff.html?showTel=1&servicerId='+orderInfo.servicerId">
                <span class="pull-left lightgray">
                    {{ orderInfo.shop.shopTypeId == shopTypeId.o2o ? '服务' :  '配送' }}人员：
                </span>
                    <div class="bfc-panel"><i class="pull-right arr-rt"></i>{{ orderInfo.servicerName }}</div>
                </a>

                <div  class="panel-chunk">
                    <span class="pull-left lightgray">收货地址：</span>
                    <div class="bfc-panel address-txt" href="javascript:;">
                        <p class=""><span class="mr15">{{ orderInfo.linkman }}</span>&nbsp;{{ orderInfo.phone }}</p>
                        <p class="mt5 lightgray">{{ orderInfo.address }}</p>
                    </div>
                </div>
            </div>
            <!-- 配送信息 end -->

            <!-- 订单信息 start -->
            <div class="panel-nobrd">
                <div class="panel-hd">
                    <span class="pull-right lightgray">订单编号：{{ orderInfo.ordersId }}</span><b>订单信息</b>
                </div>

                <ul class="panel-bd lh-22">
                    <li>
                        <span class="lightgray">支付方式：</span>
                        <span>{{(orderInfo.payType != HDFK_VAL ? '在线支付' : '货到付款' ) }}</span>
                    </li>
                    <li v-if="orderInfo.billInfo != ''" class="lightgray">
                        <span>发票类型：</span>
                        <span>{{ orderInfo.billInfo || '不开发票' }}</span>
                    </li>
                    <li class="lightgray">
                        <span>下单时间：</span>
                        <span>{{ orderInfo.ctime }}</span>
                    </li>
                </ul>

            </div>
            <!-- 订单信息 end -->

            <!-- 评价、备注 start -->
            <div v-if="orderInfo.remark || orderInfo.orderEvaluate == 0" class="panel-nobrd buyer-info-panel">
                <a v-if="orderInfo.statusOrder == 7" :href="'order-comments.html?ordersId='+orderInfo.ordersId" class="block panel-chunk">
                    <span class="pull-left">订单评价</span>
                <span class="pull-right orange">
                    完成评价有积分
                    <i class="arr-rt"></i>
                </span>
                </a>
                <!--<a v-if="orderInfo.remark" class="block panel-chunk" href="remark-detail.html">-->
                <div v-if="orderInfo.remark" class="panel-chunk">
                    <span>信息备注</span>
                    <!--<i class="pull-right arr-rt"></i>-->
                    <div class="mt5 lightgray">
                        {{ orderInfo.remark }}
                    </div>
                </div>
            </div>
            <!-- 评价、备注 end -->

            <div v-if="!(orderInfo.statusPay == 2 || orderInfo.statusPay == 3 || orderInfo.statusOrder == 8)" class="fixed-footer urge-order-layer">
                <template v-if="orderInfo.statusPay == 0">
                    <template v-if="orderInfo.statusOrder == 0">
                        <a @click.prevent="cancel(orderInfo.ordersId, $event)" class="J-cancel-order btn btn-default" href="javascript:;">取消订单</a>

                        <router-link v-if="!isHdfk" class="btn btn-primary"
                                     :to="{name:'choosePayWay',query:{ordersId: orderInfo.ordersId}}">立即付款</router-link>
                    </template>
                </template>
                <template v-if="orderInfo.statusPay == 1">
                    <template v-if="orderInfo.statusOrder == 1 || orderInfo.statusOrder == 2">
                        <!--<a class="btn btn-default" :href="'tel:'+orderInfo.shop.phone">催单</a>-->
                        <!--<a @click.prevent="refund(orderInfo.ordersId, $event)" class="J-refund btn btn-primary" href="javascript:;">申请退款</a>-->
                        <router-link class="J-refund btn btn-primary" :to="{name:'refundReason',query:{'ordersId':orderInfo.ordersId,'priceCount':orderInfo.priceCount}}">申请退款</router-link>
                    </template>
                    <template v-if="orderInfo.statusOrder == 3 || orderInfo.statusOrder == 4">
                        <!--<a class="btn btn-default" :href="'tel:'+orderInfo.shop.phone">催单</a>-->
                        <router-link class="J-refund btn btn-primary" :to="{name:'refundReason',query:{'ordersId':orderInfo.ordersId,'priceCount':orderInfo.priceCount}}">申请退款</router-link>
                        <a v-if="!(isReceiving || isBook)" @click.prevent="sure(orderInfo.ordersId, $event)" class="J-sure btn btn-primary" href="javascript:;">确认订单</a>
                    </template>
                    <!--<template v-if="orderInfo.statusOrder == 7">
                        <a class="btn btn-primary" :href="'order-comments.html?ordersId='+orderInfo.ordersId+'&shopId='+orderInfo.shop.shopId">评价订单</a>
                    </template>-->
                </template>
                <template v-if="orderInfo.statusPay == 4">
                    <template v-if="orderInfo.statusOrder == 3 || orderInfo.statusOrder == 4">
                        <!--<a class="btn btn-default" :href="'tel:'+orderInfo.shop.phone">催单</a>-->
                        <a v-if="!(isReceiving || isBook)" @click.prevent="sure(orderInfo.ordersId, $event)" class="J-sure btn btn-primary" href="javascript:;">确认订单</a>
                    </template>
                </template>
                <!--<template v-if="orderInfo.statusPay == 5">
                    <template v-if="orderInfo.statusOrder <= 2">
                        &lt;!&ndash;<a class="btn btn-default" :href="'tel:'+orderInfo.shop.phone">催单</a>&ndash;&gt;
                        <a @click.prevent="cancel(orderInfo.ordersId, $event)" class="J-cancel-order btn btn-primary" href="javascript:;">取消订单</a>
                    </template>
                    <template v-if="orderInfo.statusOrder == 3 || orderInfo.statusOrder == 4">
                        &lt;!&ndash;<a class="btn btn-default" :href="'tel:'+orderInfo.shop.phone">催单</a>&ndash;&gt;
                        <a @click.prevent="sure(orderInfo.ordersId, $event)" class="J-sure btn btn-primary" href="javascript:;">确认订单</a>
                    </template>
                </template>-->
                <template v-if="!(orderInfo.statusPay == 2 || orderInfo.statusPay == 5) && orderInfo.statusOrder == 7">
                    <a v-if="orderInfo.shop.shopTypeId == shopTypeId.jsws && !isReceiving && orderInfo.statusPay < 5" class="btn btn-default"
                       :href="'refund-reason.html?chooseType=0&ordersId='+orderInfo.ordersId">退货</a>
                    <router-link class="btn btn-primary" :to="{name:'orderComments',query:{'ordersId': orderInfo.ordersId,'shopId': orderInfo.shop.shopId}}">评价订单</router-link>
                </template>
            </div>

            <!-- 退款原因层 start -->
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
            <!-- 退款原因层 end -->

            <!-- 其他原因 start -->

            <div id="otherReasonLayer" class="panel-chunk" style="display: none">
                <textarea name="otherreason" cols="30" rows="5" class="one-full mb10"></textarea>
                <a class="btn btn-lg btn-block btn-primary" href="javascript:;">确定</a>
            </div>

            <!-- 其他原因  end -->

        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data () {
            return {
                HDFK_VAL: 3, // 3为货到付款
                // orderType  DEFAULT '0' COMMENT '订单类型：0：不是预定  1： 预定  2:扫码支付  3:自提订单  4 电话订单
                orderType: {
                    DEFAULTORDER: 0,
                    BOOKORDER: 1,
                    SCANORDER: 2,
                    SELFORDER: 3,
                    CALLORDER: 4
                },
                orderInfo: {
                    shop: {}
                },
                reasonList: []
            }
        },
        created () {
            // 初始化订单详情信息
            this.getOrdersview()

        },
        methods: {
            hideBtn (ev) {
                ev.target.style.display = 'none'
            },
            getOrdersview () {
                let _this = this;

                this.$axios.post(this.$api.eOrdersview, $.param({ordersId: this.query.ordersId}))
                    .then(({data, status, msg}) => {
                        if (status === 1) {
                            this.orderInfo = data;
                        } else {

                            this.$vux.toast.show({
                                type: 'text',
                                    width: 'auto',
                                    text: msg
                            });

                        }

                    })
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

                        _this.$axios.post(_this.$api.cancelorders, $.param({ordersId}))
                            .then(({data, status}) => {
                                _this.$vux.toast.show({
                                    text: '取消成功',
                                    onHide () {
                                        // 重新获取页面数据
                                        _this.getOrdersview();
                                    }
                                })
                            })
                    }
                })

            },
            // 确认订单
            sure (ordersId, ev) {
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
                                // 重新获取页面数据
                                _this.getOrdersview();
                            }
                        })
                    })
            },
            refund (ordersId, ev) {
                var _this = this;

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
            }
        },
        computed: {
            ...mapGetters(['config']),
            // url查询
            query () {
                return this.$route.query
            },
            // 店铺类型
            shopTypeId () {
                let {shopTypeId} = this.config;
                return shopTypeId
            },
            // 商品外送类型
            isSPWS () {
                return this.orderInfo.shopTypeId == this.shopTypeId.jsws;
            },
            // 判断是否是商品外送店铺类型并且是订单自提
            isReceiving () {
                return this.isSPWS && this.orderInfo.orderType == this.orderType.SELFORDER;
            },
            // 到店类型
            isDDXF () {
                return this.orderInfo.shop.shopTypeId == this.shopTypeId.ddxf;
            },
            // 到店且是预约
            isBook () {
                return this.isDDXF && this.orderInfo.orderType == this.orderType.BOOKORDER;
            },
            // 货到付款
            isHdfk () {
                return this.isSPWS && this.orderInfo.payType === this.HDFK_VAL
            },
            salesCode () {
                var code = null;

                switch (this.orderInfo.statusPay) {
                    case 1:
                    case 4:
                        code = this.orderInfo.salesCode || '待发放';
                        break;
                    case 2:
                        code = '退款中';
                        break;
                    case 3:
                        code = '已退款';
                        break;
                    case 0:
                        code = '未付款';
                        break;
                }

                return code;
            },
            status () {
                var _this = this,
                    shopTypeId = this.shopTypeId,
                    statusOrder = Number(this.orderInfo.statusOrder), // 订单状态
                    statusPay = Number(this.orderInfo.statusPay), // 订单支付状态
                    pathPic = '../../../assets/images/icons-v3/icons1/',
                    statusMsg = '',
                    statusPic = '',
                    progressPic = '',
                    statusArr = [],
                    statusList = [];

                // 四种店铺类型区分
                switch (this.orderInfo.shop.shopTypeId) {
                    case shopTypeId.synthe:
                        statusList = ['买家未付款', '买家已付款', '卖家未发货', '卖家已发货', '买家未收货', '买家已收货'];
                        statusPic = pathPic + 'icon_ctds.png';
                        break;
                    case shopTypeId.o2o:
                        statusList = ['买家未付款', '买家已付款', '人员未出发', '人员已出发', '服务未完成', '服务已完成'];
                        statusPic = pathPic + 'icon_smfw.png';
                        break;
                    case shopTypeId.jsws: // 商品外送(配送类订单、自提类订单、电话订单)
                        statusList = ['买家未付款', '买家已付款', '人员未出发', '人员已出发', '买家未收货', '买家已收货'];
                        statusPic = pathPic + 'icon_spws.png';

                        // 自提
                        if (this.isReceiving) {
                            statusList[2] = '商家未确认';
                            statusList[3] = '自提码已发出';
                            statusPic = pathPic + 'icon-qcode.png';
                        } else {
                            // 货到付款
                            if (this.orderInfo.payType === this.HDFK_VAL) {
                                statusList[0] = statusList[1] = '提交订单'
                            }
                        }

                        break;
                    case shopTypeId.ddxf: // 到店消费(到店类订单、预订类订单、扫码支付订单)

                        statusList = ['买家未付款', '买家已付款', '消费码未发出', '消费码已发出', '买家未使用', '买家已使用'];
                        statusPic = pathPic + 'icon-qcode.png';
                        break;
                }

                // 订单状态
                var setupStatusOrder = function (statusOrder, msg, icon) {

                    // 付款状态：0待付款 1已支付 2申请退款中 3已退款 4卖家拒绝退款 5申请退货 6已退货并退款 7卖家拒绝退货
                    // 订单状态：0待付款 1已支付 2待发货 3发货中 4已送达 7已确认 8已完成 9已取消
                    switch (statusOrder) {
                        case 0:
                            statusArr = [statusList[0], statusList[2], statusList[4]];
                            statusMsg = statusList[0];
                            progressPic = pathPic + 'order-status-1.png';

                            // 商品外送之货到付款
                            if (_this.orderInfo.shop.shopTypeId == shopTypeId.jsws && _this.orderInfo.payType === _this.HDFK_VAL) {
                                progressPic = pathPic + 'order-status-2.png';
                            }

                            break;
                        case 1:
                            statusArr = [statusList[1], statusList[2], statusList[4]];
                            statusMsg = statusList[1];
                            progressPic = pathPic + 'order-status-2.png';
                            break;
                        case 2:
                            statusArr = [statusList[1], statusList[2], statusList[4]];
                            statusMsg = statusList[2];
                            progressPic = pathPic + 'order-status-2.png';
                            break;
                        case 3:
                            statusArr = [statusList[1], statusList[3], statusList[4]];
                            statusMsg = statusList[3];
                            progressPic = pathPic + 'order-status-3.png';
                            break;
                        case 4:
                            statusArr = [statusList[1], statusList[3], statusList[4]];
                            statusMsg = statusList[4];
                            progressPic = pathPic + 'order-status-3.png';
                            break;
                        case 7:
                        case 8:
                            statusArr = [statusList[1], statusList[3], statusList[5]];
                            statusMsg = statusList[5];
                            progressPic = pathPic + 'order-status-4.png';
                            break;
                        case 9:
                            statusArr = [statusList[0], statusList[2], statusList[4]];
                            statusMsg = '订单已取消';
                            progressPic = pathPic + 'order-status-1.png';
                            statusPic = pathPic + 'icon_qxdd.png';
                            break;
                    }
                };

                setupStatusOrder(statusOrder);

                // 根据支付状态来判断一些订单状态
                switch (statusPay) {
                    // 申请退款／货
                    case 2:
                    case 5:
                        statusMsg = this.orderInfo.statusOrderMsg;
                        //statusMsg = '申请退款中';
                        statusArr = ['已提交申请 ', '商家未处理', (statusPay === 2 ? '退款' : '退货') + '未成功'];
                        progressPic = pathPic + 'order-status-2.png';
                        break;
                    // 已退款／货
                    case 3:
                    case 6:
                        statusMsg = this.orderInfo.statusOrderMsg;
                        //statusMsg = '订单已退款';
                        statusArr = ['已提交申请', '商家已处理', (statusPay === 3 ? '退款' : '退货') + '已成功'];
                        progressPic = pathPic + 'order-status-4.png';
                        break;
                    case 1:
                        // 是到店类型但不是预约
                        if (!(this.isDDXF && !this.isBook)) {
                            break;
                        }
                    // 拒绝退款／货与已退款／货状态处理
                    case 4:
                        setupStatusOrder(3);
                        break;
                    case 7:
                        setupStatusOrder(7);
                        break;
                }
//                statusPic = 'static/images/icon-qcode.png'
                return {
                    statusPic,
                    statusArr,
                    progressPic,
                    statusMsg
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    .order-status-panel {
        padding: 10px;
        background-color: #f60;

        .order-status-con {
            padding: 10px 0;
            border-radius: 10px;
            background-color: #fff;
        }
    }

</style>
