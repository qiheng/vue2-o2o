<template>
    <div id="minCartPanel" class="minCartPanel2" :class="{expanded: showCartList && totalNum}">
        <!-- 购物车模板 start -->
        <div @click="toggleCartList" class=" minCartMask"></div>
        <div class="minCartInfo" :class="{empty: totalNum <= 0}">
            <a @click="toggleCartList" class="min-cart" href="javascript:;"><ins class="counter nums">{{ totalNum }}</ins></a>
            <!-- 空 -->
            <div class="empty-cart">

                <!--
					1.有起步配送费和有电话号码时，优先显示起送配送费
					2.只有电话号码时，显示联系卖家
				-->

                <a v-if="shop.priceBeginSend" class="btn btn-primary disabled" href="javascript:;">&yen;{{ shop.priceBeginSend | toFixed }}起送</a>
                <p class="p-empty lightgray">购物车是空的</p>
            </div>
            <!-- 非空 -->
            <div class="non-empty-cart">
                <!--
					1.有起步配送费,且到不到起步配送费是，显示 差xxx元配送
					反之 显示 选好了
				-->

                <a v-if="shop.priceBeginSend && minimumOrderAmount > 0" class="btn btn-ok btn-primary" href="javascript:;"
                   :class="{disabled: minimumOrderAmount > 0}">差&yen; {{ minimumOrderAmount }}元配送</a>
                <a v-else @click="chooseOk" class="btn btn-ok btn-primary" href="javascript:;">选好了</a>

                <div class="bfc-panel f12">
                    <p class="txt-line">共：&yen;<i class="f16 total-price">{{ totalPrice }}</i></p>
                    <p v-if="shop.openStatus === 0" class="txt-line lightgray">配送费：&yen;<i class="send-price">{{ deliveryFee | toFixed }}</i></p>
                </div>
            </div>
        </div>
        <!-- 购买商品 start -->
        <div class="minCartGoods panel">
            <div class="panel-hd"><a @click="clearCartFun(shop.shopId)" class="pull-right clear-all-btn" href="javascript:;"><i class="btn-del-sm"></i>清除全部</a>
                <p class="title">购物车</p>
            </div>
            <div class="minCart-bd">
                <div id="J-cart-list" class="goodsListWrap">
                    <ul class="goodsList">
                        <!-- 购买列表 -->
                        <li class="panel-chunk" v-for="goodsItem in shopCart">
                            <div class="pull-right" :data-num="goodsItem.num">
                                <span class="price emb-red mr5">&yen; <i data-rel-price="true" class="f18">{{ goodsItem.eprice }}</i></span>
                                <slot name="buyCart" :cart-list="cartList"
                                      :goods-item="goodsItem"
                                      :shop-id="shop.shopId"></slot>
                            </div>
                            <h2 data-rel-tit="true" class="nowrap f16">{{ goodsItem.name }}</h2>
                        </li>
                        <!-- 购买列表 end -->
                    </ul>
                </div>
            </div>
        </div>
        <!-- 购买商品 end -->
    </div>
</template>

<script>

	export default {
		data () {
            return {
                totalNum: 0,
                totalPrice: 0,
                showCartList: false
            }
        },
        props: ['cartList', 'shop'],
        created () {
            this.initCartNumAndPrice();
        },
        methods: {
            // 初始化购物车的总价、总数
            initCartNumAndPrice (){
                var num, price, goodsItem = {}, tmpPrice;

                num = price = tmpPrice = 0;

                for (key in this.shopCart) {
                    goodsItem = this.shopCart[key];
                    tmpPrice = goodsItem.eprice * goodsItem.num;

                    // 促销活动类型
                    if (goodsItem.sales.salesType) {
                        switch (goodsItem.sales.salesType) {
                            // 满减
                            case 4:
                            case 8:

                                if (tmpPrice >= parseFloat(goodsItem.sales.fullMoney)) {
                                    tmpPrice -= parseFloat(goodsItem.sales.declineMoney);
                                }
                                break;
                            // 满折
                            case 10:

                                if (tmpPrice >= parseFloat(goodsItem.sales.fullMoney)) {
                                    tmpPrice *= (parseFloat(goodsItem.sales.declineMoney) / 100);
                                }
                                break;
                        }
                    }

                    num += (goodsItem.num + goodsItem.sendNum);
                    price += tmpPrice;
                }

                this.totalNum = num;

                // 配送费
                // price += this.deliveryFee;
                // 总价
                this.totalPrice = price.toFixed(2);
            },
            // 送的商品数量计算方式
            getSendNum (num, sendsale) {
                num = num || 0;
                sendsale = sendsale || '1,0';
                aRule = sendsale.split(',');
                console.log('=====送的商品数量=====', num);
                return Math.floor(num / aRule[0]) * aRule[1];
            },
            // 清空购物车
            clearCartFun (shopId) {
                if (shopId) {
                    delete this.cartList[shopId];
                    this.toggleCartList();

                    this.$parent.cartList = $.extend({}, this.cartList);

                    // 保存本地
                    store.set('cartList', this.cartList);

                    if (window.sessionStorage) {
                        window.sessionStorage.cartList = JSON.stringify(this.cartList)
                    }
                }
            },
            // 控制购物列表是否显示
            toggleCartList () {
                this.totalNum > 0 ? this.showCartList = !this.showCartList : true;
            },
            // 选好了
            chooseOk () {
                var _goodsArr = [],
                    _this = this,
                    shop = this.shop;

                //alert(JSON.stringify(this.shopCart))
                _A.getTheUserData(function () {

                    store.set('__orderParam', {});

                    for (var key in _this.shopCart) {
                        _goodsArr.push({goodsId: key, count: _this.shopCart[key].num})
                    }

                    _returnurl = ('order-verify.html?shopId='+ shop.shopId +'&shopTypeId='+ shop.shopTypeId +'&goodsArr=' + JSON.stringify(_goodsArr));

                    // 删除对应店铺下的商品
                    //this.clearCartFun(shop.shopId);

                    // 删除确认订单下的一些缓存数据
                    if (window.sessionStorage) {

                        ['receiving', 'receivingInfo'].forEach(function (item) {
                            delete window.sessionStorage[item];
                        })
                        //delete window.sessionStorage.receiving;
                        //delete window.sessionStorage.receivingInfo;
                    }

                    // 跳转到确认订单页面
                    window.location.href = _returnurl;
                })

            }
        },
        computed: {
            // 当前商店购物信息
            shopCart (){
                return this.cartList[this.shop.shopId] || null
            },
            // 配送费
            deliveryFee () {
                var shop = this.shop, val = shop.priceSend;

                // 是否开启 0:开启,1:关闭
                if (this.shop.openStatus === 0 && this.shop.freeStatus === 1) {
                    if (shop.fullMoney <= this.totalPrice) {
                        val = 0;
                    }
                }

                return val;

            },
            // 还差多少元起送，为负数时显示去结算按钮
            minimumOrderAmount () {
                if (this.shop.priceBeginSend) {
                    return (this.shop.priceBeginSend - this.totalPrice).toFixed(2);
                }else{
                    return null;
                }
            }
        },
        watch: {
            totalNum (value) {
                if (value <= 0) {
                    this.showCartList = false
                }

                this.$emit('total-num', value)
            },
            shopCart (value) {
                console.log('============购物车商品列表(shopCart)===============', value);
                this.initCartNumAndPrice();
            }
        }
	}
</script>

<style lang="less" scoped>
    #minCartPanel {
        bottom: -1px;
    }
</style>
