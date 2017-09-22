<template>
    <div class="merchant-detail" v-cloak>
        <!-- 店铺信息 start -->
        <div class="container panel-item merchant-info-panel">
            <div class="panel-inner">
                <div class="panel-pic">
                    <a :href="'picture-manage.html?type=preview&shopId='+shopViewData.shop.shopId">
                        <img width="72" height="72" :src="(shopViewData.shop.pic ? shopViewData.shop.pic : 'images/empty/default_shop_logo.png') +'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt="">
                    </a>
                </div>
                <div class="merchant-btns" style="z-index: 1">
                    <a @click="fav" :data-user-fav="shopViewData.userFav" class="like-btn" :class="{'like-btn-on': shopViewData.userFav}" href="javascript:;"></a>
                    <a @click="showDropDown" class="i-more" href="javascript:;"></a>
                    <!--<a class="J-qrcode qrcode-btn" href="javascript:;"></a>-->
                    <!--<a class="J-share share-btn" href="javascript:;" data-ajax="false"></a>-->
                    <div v-show="isShowDropDown" class="more-dropdown">
                        <!--<router-link :to="{name:'shopQrcode',query:{'name':shopViewData.shop.name,'url'}}" class="drop-item">二维码</router-link>-->
                        <router-link :to="{name:'shopQrcode',query:{'name':shopViewData.shop.name}}" class="drop-item">二维码</router-link>
                        <router-link :to="{name:'shopComplain',query:{'shopId':shopViewData.shop.shopId,'name':shopViewData.shop.name,'wholeAddress':shopViewData.wholeAddress}}" class="drop-item">店铺投诉</router-link>


                        <!--<a :href="'tel:'+ shopViewData.shop.phone" @click="isShowDropDown = !1" class="drop-item">联系商家</a>-->
                    </div>
                </div>
                <div class="gray panel-info">
                    <h2 class="panel-tit two-thirds nowrap">{{ shopViewData.shop.name }}</h2>
                    <p class="f12">
                        <i :class="['star2', 'star-'+Math.round(shopViewData.shop.score)]"></i>
                    </p>

                    <ul v-if="shopViewData.saleList && shopViewData.saleList.length" class="panel-yhInfo">
                        <li v-for="saleItem in shopViewData.saleList"
                            :class="saleClass[saleItem.salesType]">{{saleItem.name}}</li>
                    </ul>
                </div>
                <div class="lightgray merchant-info-address">
                    <img class="pull-left" width="19" src="../../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>

                    <template v-if="shopViewData.shop.shopTypeId == shopTypeId.o2o || shopViewData.shop.shopTypeId == shopTypeId.jsws">
                        <span class="pull-right">服务范围<ins class="gray">{{shopViewData.shop.reangName}}</ins></span>
                    </template>
                    <!--<template v-else-if="shopViewData.shop.shopTypeId == shopTypeId.ddxf">-->
                        <!--<a class="pull-right f16" :href="'order-verify-book.html?shopId='+shopViewData.shop.shopId+'&forward=shop-detail.html'">预约</a>-->
                    <!--</template>-->
                    <p class="nowrap">{{shopViewData.wholeAddress}}</p>
                </div>
            </div>
        </div>
        <!-- 店铺信息 end -->

        <!--  商品、商家 start -->
        <div class="merchant-tabbox-panel" style="height: 334px;">
            <div class="panel merchant-tabbox-meun">
                <nav class="mod-box tap-panel tab-panel-primary">
                    <a data-type="sp" class="box-flex tap-meun tap-meun-on" href="javascript:;">商品</a>
                    <a data-type="sj" class="box-flex tap-meun" href="javascript:;">商家</a>
                </nav>
            </div>

            <div class="merchant-tabbox scroll-wrap" style="top: 41px;">
                <div id="J-scroll-sideNav" class="pull-left scroll-side">
                    <div class="side-inner">
                        <ul class="side-nav">
                            <li @click="toggleCategory(index)" v-for="(categoryItem, index) in shopViewData.categoryList"
                                :class="{on: currentCategoryIndex === index}"
                                :key="categoryItem.salesId || categoryItem.goodsCategoryId"
                                :categoryId="categoryItem.salesId || categoryItem.goodsCategoryId">
                                <a href="javascript:;">{{ (categoryItem.name || '').substring(0,4) }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="J-scroll-con" class="pull-right scroll-con">
                    <div class="scroll-con-inner">
                        <p class="bg-gray p10 f12">{{ categoryName }}</p>
                        <div class="product-list" :data-len="goodsList.length">
                            <loading v-show="goodsLoading"></loading>
                            <div v-show="!goodsLoading && !goodsList.length" class="mt30 text-center">暂无商品~</div>
                            <template v-if="goodsList.length">
                                <div v-for="(goodsItem, index) in goodsList" class="panel-item"
                                     :key="goodsItem.goodsId"
                                     :data-rel-cart="goodsItem.goodsId"
                                     :data-rel-shop-id="goodsItem.shopId"
                                     :data-rel-shop-type-id="shopViewData.shop.shopTypeId"
                                     :data-sendsale="goodsItem.sales && (goodsItem.sales.salesType == 3 || goodsItem.sales.salesType == 7) ? goodsItem.sales.value : '1,0'">
                                    <!--(goodsItem.sales && goodsItem.sales.salesType == 3 || goodsItem.sales.salesType == 6 ? 1 : 0)-->

                                    <div class="panel-inner">
                                        <a class="panel-pic" :href="'product-datail.html?goodsId='+goodsItem.goodsId">
                                            <img width="70" height="70" :src="(goodsItem.pics.length ? goodsItem.pics[0].picUrl : config.defaultGoodsPic)+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt="">
                                        </a>
                                        <div class="panel-info f12">
                                            <h2 class="panel-tit nowrap"><a data-rel-tit="true" :href="'product-datail.html?goodsId='+goodsItem.goodsId">{{ goodsItem.name }}</a></h2>
                                            <div class="mt5 clearfix">
                                                <!--<div class="add-cart" :data-inventory="goodsItem.inventory">
                                                    <span class="minus hide">-</span>
                                                    <span data-num="0" class="num hide">0</span>
                                                    <span class="plus">+</span>
                                                </div>-->
                                                <!--<buy-cart :cart-list="cartList"-->
                                                          <!--:goods-item="goodsItem"-->
                                                          <!--:shop-id="goodsItem.shopId"-->
                                                          <!--:key="goodsItem.goodsId"-->
                                                          <!--@add-cart="addCartFun"-->
                                                          <!--@reduce-cart="reduceCartFun"></buy-cart>-->
                                                销量：{{ goodsItem.salesNum }}
                                            </div>
                                            <p class="mt5 orange">
                                                <span class="price mr5">¥ <i :data-rel-price="(Number(goodsItem.eprice) || 0).toFixed(2)" class="f18">{{ goodsItem.eprice | toFixed }}</i></span>
                                                <del class="lightgray">{{ goodsItem.price | toFixed }}</del>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>

                        <!-- 加载更多 -->
                        <div id="pullUp" class="hidden">
                            <span class="pullUpIcon"></span><span class="pullUpLabel">向上拉获取更多数据...</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="merchant-tabbox hidden" style="height: 293px; overflow-y: auto;">
                <!-- 优惠券 start -->
                <div v-if="shopViewData.shopCoupon && shopViewData.shopCoupon.length" class="panel-nobrd">
                    <h2 class="pl10 pt10 f14">优惠券</h2>
                    <ul class="coupons-list">
                        <li v-for="(coupon, index) in shopViewData.shopCoupon" class="coupons-option mb10">
                            <div class="coupons-num">
                                <p class="yh-price mt20">¥<i class="f30">{{ coupon.sub }}</i>
                                </p>
                                <p class="f12">满{{ coupon.attain }}减{{ coupon.sub }}</p>
                            </div>
                            <div class="bfc-panel coupons-info">
                                <div class="four-fifths">
                                    <h3 class="nowrap mt10 f16">{{ coupon.name }}</h3>
                                    <p class="nowrap mt5 f12 lightgray">{{ coupon.summary }}</p>
                                </div>
                                <!--<p class="lightgray f12 mt5">已领取1000张，剩余500张</p>-->
                                <a @click="receiveCoupon(index, coupon.couponId)" href="javascript:;" class="get-btn">立即领取</a>
                            </div>
                        </li>
                        <li class="panel-chunk text-center f12">
                            <a class="block lightgray"
                               :href="'coupons-list.html?type=preview&shopId='+shopViewData.shop.shopId">
                                查看全部优惠券 &gt;
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- 优惠券 end -->


                <!-- 服务人员 start -->
                <div v-if="shopViewData.servicerList.length" class="panel-nobrd shop-servicer-panel">
                    <h2 class="pl10 pt10 f14">服务人员</h2>
                    <ul class="f12">
                        <li v-for="(servicerItem, index) in shopViewData.servicerList" class="panel-chunk">
                            <div class="table-type">
                                <div class="tbl-cell-mid" style="width: 46px">
                                    <img width="36" height="36" alt="" :src="servicerItem.pic1 || 'images/default-empty.png'">
                                </div>
                                <div class="tbl-cell-mid">
                                    <h3 class="f14">{{servicerItem.name}}</h3>
                                    <p class="lightgray">{{servicerItem.position}}</p>
                                </div>
                            </div>
                            <div class="mt5">{{ servicerItem.summary }}</div>
                        </li>
                        <li class="panel-chunk text-center">
                            <a class="block lightgray"
                               :href="'service-person-manage.html?type=preview&shopId='+shopViewData.shop.shopId">
                                查看全部服务人员 &gt;
                                <!--<i class="dib icon-down-gray"></i>-->
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- 服务人员 end -->

                <!-- 店铺简介 start -->
                <div v-if="shopViewData.shop.summary" class="panel-nobrd shop-info-panel">
                    <div class="panel-bd">
                        <h2 class="f14 mb10">店铺简介</h2>
                        <div class="gray f12 lineclamp2">{{ shopViewData.shop.summary }}</div>
                    </div>
                </div>
                <!-- 店铺简介 end -->

                <!-- 营业时间 start -->
                <div class="panel-nobrd shop-hours-panel f12">
                    <div class="panel-bd">
                        <h2 class="f14">营业时间</h2>
                        <p>{{shopViewData.shop.opentime.st}}-{{shopViewData.shop.opentime.et}}</p>
                        <ul class="list-fl mt10">
                            <li v-for="(day, key) in weekDay"><a class="day" :class="{disabled:shopViewData.shop.opentime[key] === '0'}" href="javascript:;">{{ day }}</a></li>

                        </ul>
                    </div>
                </div>
                <!-- 营业时间 end -->

                <!-- 评分 start -->
                <div v-if="shopViewData.commentList.length" class="panel-nobrd">
                    <div class="panel-hd">
                        <i :class="'star star-'+Math.round(shopViewData.shop.score)"></i><span>{{ shopViewData.shop.score }}分</span>
                    </div>
                    <div class="user-info-panel">
                        <div v-for="(commentItem, index) in shopViewData.commentList" class="panel-chunk user-info">
                            <img class="pull-left user-header" width="35" height="35" :src="commentItem.headpic" alt=""/>
                            <div class="bfc-panel">
                                <div class="clearfix f12">
                                    <span class="pull-right lightgray">{{ commentItem.ctime }}</span>
                                    <span class="dib nowrap user-name">{{ commentItem.username }}</span>
                                </div>
                                <i :class="['star2','star-'+Math.round(commentItem.score)]"></i>
                                <p class="mt5">{{ commentItem.content }}</p>
                            </div>
                        </div>
                        <a class="block panel-chunk text-center"
                           :href="'comments.html?shopId='+shopViewData.shop.shopId+'&score='+shopViewData.shop.score">
                            <span class="lightgray f12">查看更多评价&gt;</span>
                        </a>
                    </div>
                </div>
                <!-- 评分 end -->

                <!-- 店铺动态 start -->
                <dl v-if="shopViewData.noticeList.length" class="panel-nobrd">
                    <dt class="panel-hd">店铺动态</dt>
                    <dd class="gray f12">
                        <a v-for="(noticeItem, index) in shopViewData.noticeList" class="panel-chunk" :href="'shop-notice-detail.html?shopNoticeId='+noticeItem.shopNoticeId">
                            <time class="pull-right lightgray">{{ noticeItem.ctime }}</time>
                            <p class="nowrap">{{ noticeItem.title }}</p>
                        </a>
                        <a v-if="shopViewData.noticeList.length" class="panel-chunk lightgray text-center" :href="'shop-notice.html?type=list&shopId='+shopViewData.shop.shopId">查看更多店铺动态&gt;</a>
                    </dd>
                </dl>
                <!-- 店铺动态 end -->

            </div>
        </div>
        <!--  商品、商家 end -->

        <!-- 投诉列表 strat -->
        <div class="check-error-list text-center hidden">
            <div class="panel lh-22 gray f16" style="margin-bottom:0;">

            </div>
        </div>

        <!-- 投诉列表 end -->
        <a href="index.html" class="go-back"></a>

        <!--<min-cart :cart-list="cartList" :shop-id="query.shopId" :shop="shopViewData.shop">-->
            <!--<template slot="buyCart" scope="props">-->
                <!--<buy-cart :cart-list="props.cartList"-->
                          <!--:goods-item="props.goodsItem"-->
                          <!--:shop-id="props.shopId"-->
                          <!--:key="props.goodsItem.goodsId"-->
                          <!--@add-cart="addCartFun"-->
                          <!--@reduce-cart="reduceCartFun"></buy-cart>-->
            <!--</template>-->
        <!--</min-cart>-->

    </div>
</template>
<script type="text/x-template" id="minCart">
    <div id="minCartPanel" class="minCartPanel2" style="bottom:-1px" :class="{expanded: showCartList && totalNum}">
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
                    <p v-if="deliveryFee" class="txt-line lightgray">配送费：&yen;<i class="send-price">{{ deliveryFee | toFixed }}</i></p>
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
                                <span class="price emb-red mr5">&yen; <i data-rel-price="true" class="f18">{{ goodsItem.price }}</i></span>
                                <slot name="buyCart" :cart-list="cartList"
                                      :goods-item="goodsItem"
                                      :shop-id="shop.shopId"
                                      :key="goodsItem.goodsId"></slot>
                            </div>
                            <h2 data-rel-tit="true" class="nowrap f16">{{ goodsItem.name }}</h2>
                        </li>
                        <!-- 购买列表 end -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- 购买商品 end -->
</script>
<script>
 import config from '@/config/index';
 export  default {
     data(){
         return{
             config,
             shopTypeId:{},
             goodsLoading: false,
             isShowDropDown: false,
             // 营业时间
             weekDay:{
                 w1: '周一',
                 w2: '周二',
                 w3: '周三',
                 w4: '周四',
                 w5: '周五',
                 w6: '周六',
                 w0: '周日'
             },
             saleClass: {
                 '1': 'jian',
                 '2': 'te',
                 '3': 'zeng',
                 '4': 'jian',
                 '5': 'te',
                 '6': 'zeng'
             },
             // 当前默认分类
             currentCategoryIndex:-1,
             shopViewData:{
                 // 店铺信息
                 shop:{
                     opentime:{},
                     // 促销活动
                     saleList:[]
                 },
                 // 服务人员列表
                 servicerList:[],
                 // 评价列表
                 commentList:[],
                 // 商品分类列表
                 categoryList:[],
                 // 店铺动态列表
                 noticeList:[]
             },
             // 商品列表
             goodsList: [],
             sideNav: null,
             shopId:'',
             scrollCon: null
         }
     },
     created:function(){
         this.shopTypeId = this.config.shopTypeId;
         console.log(this.config.shopTypeId,'我是ID')
         var _this = this;
         _this.shopId = _this.query.shopId;
         console.log(_this.query.shopId,'6666666666666666666666666666667777777777777777')
         // 初始化订单信息
//         this.getOrders();
          //商家详情
         _this.$axios.get(_this.$api.shopview,{params:{'shopId': _this.shopId}})
             .then(function (shopView) {
                 _this.shopViewData = shopView.data;
                    console.log(shopView.data,'--------------------------------------------------------------')
//                 _this.$nextTick(function () {
//                     vm.sideNav && vm.sideNav.refresh();
//
//                     _this.toggleCategory(0);
//
//                     bindEvent(_this);
//                 });
         })
     },
     mounted(){},
     components:{},
     methods:{},

     methods: {
             showDropDown:function () {
                 this.isShowDropDown = !this.isShowDropDown;
             },
             toggleCategory:function () {
                 var _this = this,
                     categoryItem = {},
                     param = {
                         page: 1
                     };

                 if (this.currentCategoryIndex == index) return;

                 this.currentCategoryIndex = index;
                 categoryItem = this.shopViewData.categoryList[index];

                 if (categoryItem.goodsCategoryId) {
                     // 分类商品
                     param.categoryId = categoryItem.goodsCategoryId
                     param.shopId = _this.query.shopId
                     console.log(_this.query.shopId,'saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2111111111111111');
                 } else {
                     // 活动促销商品
                     param.salesId = categoryItem.salesId
                 }

                 this.getGoodsListById(param, false, function () {

                 })
             },
         // 切换分类获取商品
         getGoodsListById: function (param, bConcat, cb) {
             var _this = this;

             if (param == null) {
                 console.log('---- param is not empty -----');
                 return;
             }

             if (bConcat != null && $.isFunction(bConcat)) {
                 cb = bConcat;
                 bConcat = false;
             }

             // 回调函数
             var successFn = function (goodsList) {
                 if (bConcat) {
                     _this.goodsList = _this.goodsList.concat(goodsList)
                 } else {
                     _this.goodsList = goodsList;
                 }

                 console.log('--goodsList--',_this.goodsList)

                 _this.$nextTick(function () {
                     _this.scrollCon && _this.scrollCon.refresh();
                     _this.goodsLoading = false;

                     cb && cb(goodsList);
                 })
             };

             _this.goodsList = [];
             _this.goodsLoading = true;

             if (param.categoryId) {
                 // 分类商品
//                 _A.getGoodsListByCategoryData(param, function (goodsList) {
//                     //console.log('goodsList------',goodsList[0].ctime)
//                     successFn(goodsList)
//                 });

                 _this.$axios.get(_this.$api.getgoodslistbycategory,{params:param})
                     .then(function (goodsList) {
                        successFn(goodsList)
                 })
             } else {
                 // 活动促销商品
//                 _A.getgoodslistbysalesidData(param, function (goodsList) {
//                     successFn(goodsList)
//                 });

                 _this.$axios.get(_this.$api.salegoods,{params:param})
                    .then(function (goodsList) {
                        successFn(goodsList)
                 })
             }

         },
         toggleCategory:function (index) {
             var _this = this,
                 categoryItem = {},
                 param = {
                     page: 1
                 };

             if (this.currentCategoryIndex == index) return;

             this.currentCategoryIndex = index;
             categoryItem = this.shopViewData.categoryList[index];

             if (categoryItem.goodsCategoryId) {
                 // 分类商品
                 param.categoryId = categoryItem.goodsCategoryId
                 param.shopId = _this.query.shopId
             } else {
                 // 活动促销商品
                 param.salesId = categoryItem.salesId
             }


             this.getGoodsListById(param, false, function () {
                 // 此回调是为了确保切换分类时,商品列表还能保留加入购物车的数据
                 /*var cartGoods = store.get('cartGoods'), $item;
                 if (cartGoods) {
                     $.each(cartGoods.goodsList, function (index, cartItem) {
                         console.log('detail:', cartItem)
                         $item = $('[data-rel-cart="' + cartItem.uuid + '"]');
                         $item.find('.num').data('num', cartItem.num).text(cartItem.num);
                         $item.find('.minus').show()

                     })
                 }*/

             })

         },
         fav:function ($e) {
             var _this = this;
             _this.$axios.get(_this.$api.setshopfavo,{params:{'shopId': _this.query.shopId}})
                 .then(function (result) {
                     if (result.status === 21) { // 收藏
                         _this.shopViewData.userFav = 1;
//                         alert('收藏成功');
                         return false;
                     } else if (result.status === 22) { // 取消收藏
                         _this.shopViewData.userFav = 0;
//                         alert('取消收藏');
                         return false;
                     }
                 })
         },
         receiveCoupon: function (index, couponId) {
             var _this = this;

             if (couponId != null && index != null) {
                 _this.$axios.get(_this.$api.couponlist,{params:{couponId: couponId}})
                     .then(function () {
                         layer.msg('恭喜！优惠券领取成功', {shift: 0}, function () {
                             //_this.shopViewData.shopCoupon.splice(index, 1);
                         })
                     })
//                 _A.receiveCouponData({couponId: couponId}, function () {
//
//                     layer.msg('恭喜！优惠券领取成功', {shift: 0}, function () {
//                         //_this.shopViewData.shopCoupon.splice(index, 1);
//                     })
//
//                 }, function (result) {
//                     layer.msg(result.msg);
//                     return false
//                 })
             }
         }

     },
     computed:{
         isHdfk: function () {
             // return this.ordersItem.shop.shopTypeId == config.shopTypeId.spws && this.ordersItem.payType === this.HDFK_VAL
         },
         query () {
             return this.$route.query
         },
//         query () {
//             return this.$route.query
//         },
         categoryName() {
             var _name = '',
                 item;

             if (item = this.shopViewData.categoryList[this.currentCategoryIndex]) {
                 _name = item.name
             }
             console.log(this.shopViewData.categoryList,'7777777777777777777777777777777777777777777777777')
             //return _name;
         }
     },
 }

// function bindEvent(vm) {
//     $(function () {
//
//         var $tabPanel = $('.merchant-tabbox-panel'),
//             _windowViewHeight = $(window).height(),
//             _tapMeunHeight = $('.merchant-tabbox-meun').height(),
//             _panelViewTop = $tabPanel.offset().top,
//             _panelViewHeight = _windowViewHeight - _panelViewTop,
//             _scrillViewHeight = _panelViewHeight - _tapMeunHeight;
//
//         $tabPanel.height(_panelViewHeight);
//         $('.merchant-tabbox').eq(1).height(_scrillViewHeight);
//
//         // 分类导航
//         vm.sideNav = creatSroll('#J-scroll-sideNav');
//         // 右侧内容
//         vm.scrollCon = creatSroll('#J-scroll-con', {'probeType':2});
//
//
//         // 分享二维码
//         //$('.J-qrcode').createQrcode();
//
//         $('.tap-panel a').on('click', function (e) {
//             var $self = $(this),
//                 _type = $self.data('type'),
//                 _index = $self.index();
//
//             if ($self.hasClass('tap-meun-on')) return;
//             $self.addClass('tap-meun-on').siblings().removeClass('tap-meun-on');
//
//             $('.merchant-tabbox').eq(_index).show().siblings('.merchant-tabbox').hide()
//
//             if (_type === 'sp') {
//                 //vm.sideNav.refresh();
//                 //vm.scrollCon.refresh();
//
//                 $('#minCartPanel').show();
//             } else {
//                 $('#minCartPanel').hide();
//             }
//         })
//
//     });
// }

</script>


<style>
    .merchant-info-panel .like-btn-on {background:url(../../../assets/images/i-like-on.png) no-repeat 100% 50%; background-size:30px;}
    #qrcode {width: 200px; height: 200px; overflow: hidden;}
    /**
     *
     * Pull down styles
     *
     */
    #pullDown, #pullUp {
        background:#fff;
        height:40px;
        line-height:40px;
        padding:5px 10px;
        font-weight:bold;
        font-size:14px;
        color:#888;
    }
    #pullDown .pullDownIcon, #pullUp .pullUpIcon  {
        display:block; float:left;
        width:30px; height:30px;
        /*background:url(images/pull-icon@2x.png) 0 0 no-repeat;*/
        -webkit-background-size:40px 80px; background-size:30px 60px;
        -webkit-transition-property:-webkit-transform;
        -webkit-transition-duration:250ms;
    }
    #pullDown .pullDownIcon {
        -webkit-transform:rotate(0deg) translateZ(0);
    }
    #pullUp .pullUpIcon  {
        -webkit-transform:rotate(-180deg) translateZ(0);
    }

    #pullDown.flip .pullDownIcon {
        -webkit-transform:rotate(-180deg) translateZ(0);
    }

    #pullUp.flip .pullUpIcon {
        -webkit-transform:rotate(0deg) translateZ(0);
    }

    #pullDown.loading .pullDownIcon, #pullUp.loading .pullUpIcon {
        background-position:0 100%;
        -webkit-transform:rotate(0deg) translateZ(0);
        -webkit-transition-duration:0ms;

        -webkit-animation-name:loading;
        -webkit-animation-duration:2s;
        -webkit-animation-iteration-count:infinite;
        -webkit-animation-timing-function:linear;
    }

    @-webkit-keyframes loading {
        from { -webkit-transform:rotate(0deg) translateZ(0); }
        to { -webkit-transform:rotate(360deg) translateZ(0); }
    }

    .coupons-list .coupons-option {
        box-shadow: 0px 0px 12px rgba(0,0,0,.1);
    }

    .coupons-list > li:last-child {
        padding-bottom: 0;
        border-top: 0;
    }

</style>

