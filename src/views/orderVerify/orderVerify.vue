<template>
    <div class="order-detail" v-cloak>
        <div class="panel-nobrd">
            <!-- 商品外送店铺类型 -->
            <div v-if="isSPWS" class="panel-chunk">
                <h2 class="pull-left">收货方式</h2>
                <div class="self-slt pos-rt-middle">
                    <select class="slt" style="font-size: 14px" @change="receivingFn(receivingWay)" v-model="receivingWay">
                        <option value="0">配送</option>
                        <option v-if="orderInfo.pickup" value="3">自提</option>
                    </select>
                </div>
            </div>
            <!-- 商品外送店铺类型 -->

            <template v-if="orderInfo.shopTypeId !== shopTypeId.ddxf">
                <div v-if="!isReceiving" class="panel-chunk">
                    <template v-if="orderInfo.userAddress">
                        <img class="pull-left" width="19" src="../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>
                        <router-link  id="address" class="bfc-panel address-txt pl5" :data-address-id="orderInfo.userAddress.userAddressId"
                            :to="{name:'addressInfo',query:{'shopId':query.shopId,'goodsArr':query.goodsArr}}">
                            <p>
                                <span class="mr15">{{ orderInfo.userAddress.linkman }}</span>&nbsp;
                                <span class="mr15">{{ orderInfo.userAddress.phone }}</span>
                            </p>
                            <p class="mt5 lightgray">{{ orderInfo.userAddress.addressDet }}</p>
                            <i class="arr-rt pos-rt-middle"></i>
                        </router-link>
                    </template>

                    <router-link v-else class="address-txt"
                       :to="{name:'addressInfo',query:{'shopId':query.shopId,'goodsArr':query.goodsArr}}">
                        <p class="ptb20 text-center lightgray">您未填写收货的地址！</p>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>

                </div>


                <!--<div v-if="!isReceiving" class="panel-chunk">-->
                    <!--<template v-if="orderInfo.userAddress">-->
                        <!--<img class="pull-left" width="19" src="../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>-->
                        <!--<a  id="address" class="bfc-panel address-txt pl5" :data-address-id="orderInfo.userAddress.userAddressId"-->
                            <!--:href="'select-address.html?forward=order-verify.html&shopId='+query.shopId+'&goodsArr='+query.goodsArr">-->
                            <!--<p>-->
                                <!--<span class="mr15">{{ orderInfo.userAddress.linkman }}</span>&nbsp;-->
                                <!--<span class="mr15">{{ orderInfo.userAddress.phone }}</span>-->
                            <!--</p>-->
                            <!--<p class="mt5 lightgray">{{ orderInfo.userAddress.addressDet }}</p>-->
                            <!--<i class="arr-rt pos-rt-middle"></i>-->
                        <!--</a>-->
                    <!--</template>-->

                    <!--<a v-else class="address-txt"-->
                       <!--:href="'select-address.html?forward=order-verify.html&shopId='+query.shopId+'&goodsArr='+query.goodsArr">-->
                        <!--<p class="ptb20 text-center lightgray">您未填写收货的地址！</p>-->
                        <!--<i class="arr-rt pos-rt-middle"></i>-->
                    <!--</a>-->
                <!--</div>-->
                <!--<a v-else class="panel-chunk"-->
                   <!--:href="'select-receiving-address.html?forward=order-verify.html&shopId='+query.shopId+'&goodsArr='+query.goodsArr">-->
                    <!--<h2 class="pull-left">自提点</h2>-->
                    <!--<p class="pull-right">-->
                        <!--<ins class="mr15 lightgray">{{ receivingInfo.name ? receivingInfo.name : '请选择自提点' }}</ins>-->
                        <!--<i class="arr-rt pos-rt-middle"></i>-->
                    <!--</p>-->
                <!--</a>-->
            </template>

            <router-link v-if="orderInfo.shopTypeId == shopTypeId.o2o || orderInfo.shopTypeId == shopTypeId.jsws && !isReceiving"
               class="block panel-chunk" :to="{name:'arrivalTime'}">
                <h2 class="pull-left">到达时间</h2>
                <span class="pull-right f12">
				<ins class="lightgray mr5">{{ orderParam.comeTime }}</ins>
				<i class="arr-rt"></i>
			    </span>
            </router-link>

            <router-link v-if="orderInfo.shopTypeId == shopTypeId.synthe" class="block panel-chunk" :to="{name:'logisticsSelect',query:{shopId:query.shopId}}">
                <h2 class="pull-left">物流选择</h2>
                <span class="pull-right f12">
                    <ins class="lightgray mr5">{{ orderParam.logisticsName ? orderParam.logisticsName : '请选择物流' }}</ins>
                    <i class="arr-rt"></i>
                </span>
            </router-link>

            <a v-if="orderInfo.provideBill" class="block panel-chunk" :href="'invoice-type.html?shopId='+query.shopId">
                <h2 class="pull-left">发票选择</h2>
			<span class="pull-right f12">
				<ins class="lightgray mr5">{{ orderParam.billInfo }}</ins>
				<i class="arr-rt"></i>
			</span>
            </a>

            <!-- 商品外送且是自提隐藏支付方式 -->
            <router-link v-if="!isReceiving" class="block panel-chunk"
               :to="{name:'shopEditSetupPay',query:{t:'orderchoose', supportPayType: orderInfo.supportPayType}}">
                <h2 class="pull-left">支付方式</h2>
                <span class="pull-right f12">
                    <ins class="lightgray mr5">{{ orderParam.payType != HDFK_VAL ? '在线支付' : '货到付款' }}</ins>
                    <i class="arr-rt"></i>
                </span>
            </router-link>
        </div>

        <div class="panel-nobrd sure-order-list">
            <!-- 卖家商品信息 start -->
            <div class="panel-hd">
                <h2 class="pull-left">{{ orderInfo.shopName }} <i class="emb-red">[{{ shopTypeName[orderInfo.shopTypeId] }}]</i></h2>
                <!--<span class="orange f12	 pull-right">总额&yen;<%- toFixed(order.goodsPrice) %>元</span>-->
            </div>

            <div class="panel-bd order-detail-list f12">
                <div v-for="(orderGoods, index) in orderInfo.goods" class="mtb5 clearfix">
                    <h3 class="pull-left nowrap one-half lightgray">{{ orderGoods.name }}</h3>
                    <p class="pull-left one-fourth text-center lightgray">x{{ orderGoods.count }}</p>
                    <p class="pull-left one-fourth text-right">&yen;<i>{{ orderGoods.eprice | toFixed }}</i></p>
                </div>
            </div>
            <!-- 卖家商品信息 end -->

            <template v-if="orderInfo.coupon && orderInfo.coupon.length">
                <a class="block panel-chunk"
                   @click.prevent="couponLayer" href="javascript:;">
                    <h2 class="pull-left">优惠券</h2>
                    <span class="pull-right f12">
                        <!--<ins class="emb-red mr5">节省 {{ orderInfo.couponPrice | toFixed }}</ins>-->
                        <ins v-if="orderParam.couponId != null" class="emb-red mr5">节省 {{ orderInfo.couponPrice | toFixed }}</ins>
                        <ins v-else class="lightgray mr5">选择优惠券</ins>
                        <i class="arr-rt"></i>
                    </span>
                </a>

                <div class="panel-nobrd text-center couponLayer hidden">
                    <div class="panel-hd bg-gray f16">选择优惠券</div>
                    <ul class="coupon-list">
                        <li @click.prevent="chooseCoupon(i)" v-for="(couponItem, i) in orderInfo.coupon"
                            :data-coupon-id="couponItem.couponId" class="panel-chunk">{{ couponItem.name }}</li>
                        <li @click.prevent="cancel" class="panel-chunk">取消</li>
                    </ul>
                </div>
            </template>

            <div v-else class="panel-chunk">
                <h2 class="pull-left">优惠券</h2>
                <span class="pull-right f12">
                    <ins class="lightgray mr5">暂无优惠券可用</ins>
                    <i class="arr-rt"></i>
                </span>
            </div>

            <!-- 优惠券 -->
            <!--<a id="coupon" class="block panel-hd" href="javascript:;" data-coupon-id="<%- order.coupon[0].couponId %>">
				<h2 class="pull-left">&lt;!&ndash;<i class="icos2-quan"></i>&ndash;&gt;优惠券</h2>
				<span class="pull-right f12">
					<ins class="lightgray mr5"><%- order.coupon[0].name %></ins>
					<i class="arr-rt"></i>
				</span>
			</a>-->

            <!-- 传统电商 物流费 -->
            <div v-if="orderInfo.shopTypeId == shopTypeId.synthe" class="panel-chunk">
                <span class="pull-left">运费</span>
                <span class="pull-right">&yen;{{ orderInfo.logisticsPrice | toFixed }}</span>
            </div>
            <!-- 商品外送 配送费 -->
            <!--<div v-if="orderInfo.shopTypeId == shopTypeId.jsws" class="panel-chunk">
				<span class="pull-left">配送费</span>
				<span class="pull-right">&yen;{{ orderInfo.sendPrice | toFixed }}</span>
			</div>-->

            <!--<div class="block panel-chunk" href="javascript:;">
				<h2 class="pull-left">优惠券</h2>
				<span class="pull-right f12">
					<ins class="emb-red mr5">-&yen;{{ orderInfo.couponPrice | toFixed }}</ins>
				</span>
			</div>-->

            <!--<div class="panel-chunk gray btm-brd-gray ">
				<p class="pull-left">
					<span class="mr25">原价&yen;{{ (orderInfo.countPrice + orderInfo.couponPrice + orderInfo.scorePrice) | toFixed }}</span>
					<span>优惠&yen;{{ (orderInfo.couponPrice + orderInfo.scorePrice) | toFixed }}</span>
				</p>
				<span class="pull-right">总计&yen;{{ orderInfo.countPrice | toFixed }}</span>

			</div>-->

            <!--<%
				var _url = "javascript:;";

				if (order.theScore > 0 ) {
					_url = "score-to-coupons.html?score=" + order.theScore;
				}

			%>

			<a id="score" class="block panel-hd" href="<%- _url %>" data-score="<%- order.score || 0 %>">
				<h2 class="panel-tit"><i class="icos2-score"></i>使用积分</h2>
				<span class="pull-right">
					<% if (order.score) { %>
					<ins class="lightgray mr5">使用积分<%- order.score %></ins>
					<% } else { %>
					<ins class="lightgray mr5">现有积分<%- order.theScore %></ins>
					<% } %>
					<i class="arr-rt"></i>
				</span>
			</a>-->

        </div>

        <!-- 给卖家留言 -->
        <div class="panel-nobrd msgTosell-panel">
            <div class="panel-bd">
			<textarea id="mark" class="msg-txt" cols="30" rows="5"
                      @change="changeFn"
                      v-model="orderParam.mark" placeholder="给卖家留言(可输入特殊要求)"></textarea>
            </div>
        </div>

        <!-- 有优惠信息 -->
        <div class="panel-nobrd">
            <div class="panel-chunk">
                <span class="pull-left">商品金额</span>
                <span class="pull-right emb-red">&yen;{{ orderInfo.goodsPrice | toFixed }}</span>
            </div>
            <div class="panel-chunk">
                <span class="pull-left">优惠券</span>
                <span class="pull-right">-&yen;{{ orderInfo.couponPrice | toFixed }}</span>
            </div>
            <div class="panel-chunk">
                <span class="pull-left">优惠金额</span>
                <span class="pull-right">-&yen;{{ (orderInfo.goodsAllDiscount || 0) | toFixed }}</span>
            </div>
            <div v-if="orderInfo.scorePrice" class="panel-chunk">
                <span class="pull-left">积分</span>
                <span class="pull-right">-&yen;{{ orderInfo.scorePrice | toFixed }}</span>
            </div>
            <div v-if="isSPWS && !isReceiving" class="panel-chunk">
                <span class="pull-left">配送费</span>
                <span class="pull-right" :class="{'emb-red': isFreeSendPrice}">{{ isFreeSendPrice ? '(免)' : '' }}&yen;{{ orderInfo.sendPrice | toFixed }}</span>
            </div>
        </div>

        <!--<div class="favorable-panel">
			&lt;!&ndash;<p>商品总额 <span class="emb-red">-&yen;<ins><%- toFixed(order.goodsPrice) %></ins></span></p>&ndash;&gt;
			&lt;!&ndash;<p v-if="orderInfo.couponPrice > 0">优惠券 <span class="emb-red">-&yen;<ins>{{ orderInfo.couponPrice | toFixed }}</ins></span></p>&ndash;&gt;
			<p v-if="orderInfo.scorePrice">使用积分 <span class="emb-red">-&yen;<ins>{{ orderInfo.scorePrice | toFixed }}</ins></span></p>
		</div>-->

        <div class="fixed-footer subimt-order-layer">
            <!--<a class="btn btn-primary pull-right sub-order-btn" href="follow-order-detail.html">提交订单</a>-->
            <a @click.prevent="submitFn" class="btn btn-primary pull-right sub-order-btn" :class="{disabled: isDisabled}" href="javascript:;">提交订单</a>
            <p class="gray">数量{{orderInfo.goodsCount}}，合计：<span class="emb-red">&yen;<i class="f18">{{ totalPrice | toFixed }}</i></span></p>
        </div>

    </div>
</template>

<script>

    import {mapGetters} from 'vuex'

	export default {
		data () {
            return {
                HDFK_VAL: 3, // 3为货到付款
                isDisabled: false,
                // 商品外送的收货方式 默认0（配送），3（自提）
                receivingWay: 0,
                // 判断商品外送是否达到免运费
                isFreeSendPrice: false,
                shopId:'',
                goodsArr:'',
                //billInfoTypeList: ['不开发票', '电子发票', '普通发票', '增值税发票'],
                receivingInfo: {},
                // 页面数据结构
                orderInfo:{
                    coupon:[],
                    goods:[],
                    userAddress:{}
                },
            }
        },
        created () {
            this.setOrder();
            var query = this.query;
            this.shopId = query.shopId;
            this.goodsArr = query.goodsArr;
            console.log(this.shopId,'3232323232323232323232323232323232')
            console.log(this.goodsArr,'655555555555555555555')
        },
        methods: {
            // 获取页面数据
            setOrder: function () {
                var _this = this;

                // 初始化订单信息
                this.$axios.post(this.$api.setorder, $.param(this.orderParam))
                    .then(({data, status, msg}) => {

                        if (status === 1) {
                            this.orderInfo = data;
                        } else {

                            let _url = this.config.index, isNotRedirect = false;

                            // 不在营业时间、店铺缺少物流设置
                            if (status === -34) {
                                //_this.cancelCoupon();
                                isNotRedirect = true;
                            }
                            else if (status === -26) {
                                // 清空购物车缓存数据
                                //_this.clearCart(query.shopId);

                            }
                            else if ($.inArray(status, [-199, -200]) != -1) {
                                // _url = forward();
                            }

                            this.$vux.toast.show({
                                onHide () {
                                    if (!isNotRedirect) {
                                        _this.$router.replace({
                                            path: _url
                                        })
                                    }
                                },
                                type: 'text',
                                text: msg
                            });
                            return false;

                        }
                })

            },
            // 备注
            changeFn () {
                //this.setOrderStore();
            },
            // 收货方式
            receivingFn (receivingWay) {
                if (window.sessionStorage) {
                    window.sessionStorage.receiving = receivingWay
                }

                // 自提无货到付款方式
                if (receivingWay == 3) {
                    this.orderParam.payType = 2;
                    this.orderParam.orderType = 3;
                } else {
                    this.orderParam.orderType = 0;
                }

                this.setOrderStore()

            },
            // 提交生成订单
            submitFn () {
                var _this = this;

                if (this.isDisabled) return;
                this.isDisabled = true;

                // 除到店消费的地址检验
                if (this.orderInfo.shopTypeId != this.shopTypeId.ddxf) {
                    var userAddress = this.orderInfo.userAddress;

                    this.orderParam.addressId = userAddress && userAddress.userAddressId || '';

                    // 自提订单
                    if (this.isReceiving) {
                        this.orderParam.addressId = this.receivingInfo.siteId ? this.receivingInfo.siteId : null;
                    }

                    if (!this.orderParam.addressId) {
                        return this.$vux.toast.show({
                            onHide () {
                                _this.isDisabled = false
                            },
                            type: 'text',
                            text: '请您选择地址'
                        });
                    }
                }

                // 传统电商的物流检验
                if (this.orderInfo.shopTypeId == this.shopTypeId.synthe) {

                    if (!_this.orderParam.logisticsId) {
                        return this.$vux.toast.show({
                            onHide () {
                                _this.isDisabled = false
                            },
                            type: 'text',
                                text: '请您选择物流'
                        });
                    }
                }

                // 生成订单
                this.$axios.post(this.$api.createorder, $.param(this.orderParam))
                    .then(({data, msg, status}) => {

                        if (status === 1) {

                            // 清除购物车商品
                            if (window.sessionStorage) {
                                window.sessionStorage.cartList = JSON.stringify({})
                            }

                            if (_this.orderParam.payType !== _this.HDFK_VAL) {
                                // redirect_url('choose-pay-way.html?ordersId=' + data.ordersId)
                                _this.$router.push({
                                    path: '/mycenter/order'
                                })
                            }
                            // 货到付款
                            else {
                                this.$router.replace({
                                    path: '/mycenter/order'
                                })
                            }

                        } else {

                            this.$vux.toast.show({
                                onHide () {
                                    _this.isDisabled = false
                                },
                                type: 'text',
                                text: msg
                            });

                        }

                    })
            }
        },
        computed: {
            ...mapGetters(['config', 'orderParam']),
            location () {
                return window.location
            },
            // url查询
            query () {
                return this.$route.query
            },
            // 店铺类型
            shopTypeId () {
                let {shopTypeId} = this.config;
                return shopTypeId
            },
            // 店铺类型名称
            shopTypeName () {
                return this.config.shopTypeName
            },
            // 商品外送
            isSPWS () {
                return this.orderInfo.shopTypeId == this.shopTypeId.jsws;
            },
            // 商品外送并且是订单自提
            isReceiving () {
                return this.isSPWS && this.receivingWay == 3;
            },
            // 计算总价
            totalPrice () {
                var _orderInfo = this.orderInfo,
                    _totalPrice = _orderInfo.countPrice;

                // 商品外送
                if (this.isSPWS) {
                    // 如果手动选择是自提无配送费
                    if (this.isReceiving) {
                        _totalPrice -= _orderInfo.sendPrice;
                    }

                    // 是否开启满N元免运费（openStatus 0开启，1关闭； freeStatus 0否，1是）
                    this.isFreeSendPrice = false;
                    if (_orderInfo.openStatus === 0 && _orderInfo.freeStatus === 1) {

                        if (_orderInfo.fullMoney <= _totalPrice) {
                            //_totalPrice -= _orderInfo.sendPrice;
                            this.isFreeSendPrice = true
                        }

                    }
                }

                return _totalPrice
            }
        }


    }
</script>

<style lang="less" scoped>

</style>
