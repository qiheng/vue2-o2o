<template>
    <div class="merchant-detail" v-cloak>
        <!--<div class="hidden">-->
        <!--<img src="images/icons-v3/icons1/logo_new.jpg" alt="">-->
        <!--</div>-->
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
                        <a :href="'qrcode.html?type=shop&name='+shopViewData.shop.name+'&url='+encodeURIComponent(location.href)" class="drop-item">二维码</a>
                        <a :href="'shop-complain.html?shopId='+shopViewData.shop.shopId+'&name=' + shopViewData.shop.name+'&wholeAddress='+shopViewData.wholeAddress" class="drop-item">店铺投诉</a>
                        <a v-if="shopViewData.shop.phone"
                           @click="isShowDropDown = !1"
                           :href="'tel:'+ shopViewData.shop.phone"  class="drop-item">联系商家</a>
                    </div>
                </div>
                <div class="gray panel-info">
                    <h2 class="panel-tit two-thirds nowrap">{{ shopViewData.shop.name }}</h2>
                    <p class="f12">
                        <i :class="['star2', 'star-'+Math.round(shopViewData.shop.score)]"></i>
                    </p>

					<span class="opentime i-label pos-rt-middle"
                          :class="{'i-label-default': !shopViewData.shopOpenStatus}">{{ shopViewData.shopOpenStatus ? '营业' : '已休业' }}</span>

                    <ul v-if="shopViewData.saleList && shopViewData.saleList.length" class="panel-yhInfo">
                        <li v-for="saleItem in shopViewData.saleList"
                            :class="saleClass[saleItem.salesType]">{{saleItem.name}}</li>
                    </ul>

                </div>
                <div class="lightgray merchant-info-address" >
                    <img class="pull-left" width="19" src="../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>

                    <template v-if="shopViewData.shop.shopTypeId == shopTypeId.o2o || shopViewData.shop.shopTypeId == shopTypeId.jsws">
                        <span class="pull-right">服务范围<ins class="gray">{{shopViewData.shop.reangName}}</ins></span>
                    </template>
                    <template v-else-if="shopViewData.shop.shopTypeId == shopTypeId.ddxf">
                        <a class="pull-right f16" :href="'order-verify-book.html?shopId='+shopViewData.shop.shopId+'&forward=shop-detail.html'">预约</a>
                    </template>

                    <p @click="shopGps(shopViewData.shop)" class="nowrap lightgray">{{shopViewData.wholeAddress}}</p>

                    <!--<template v-if="shopViewData.shop.shopTypeId == shopTypeId.o2o">
						<img class="pull-left" width="19" src="images/icons-v3/icons1/icon_adress.png" alt=""/>
						<span class="pull-right">服务范围<ins class="gray">{{shopViewData.shop.reangName}}</ins></span>
						<p class="nowrap">{{shopViewData.wholeAddress}}</p>
					</template>
					<template v-else>
						<img class="pull-right" width="19" src="images/icons-v3/icons1/icon_adress.png" alt=""/>
						<p class="nowrap">{{shopViewData.wholeAddress}}&nbsp;&nbsp;{{shopViewData.shop.distance}}</p>
					</template>-->
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
                <div id="J-scroll-sideNav" class="pull-left scroll-side" style="position: relative">
                    <scroller class="side-inner">
                        <ul class="side-nav">
                            <li @click="toggleCategory(index)" v-for="(categoryItem, index) in shopViewData.categoryList"
                                :class="{on: currentCategoryIndex === index}"
                                :key="categoryItem.salesId || categoryItem.goodsCategoryId"
                                :categoryId="categoryItem.salesId || categoryItem.goodsCategoryId">
                                <a href="javascript:;">{{ (categoryItem.name || '').substring(0,4) }}</a>
                            </li>
                        </ul>
                    </scroller>
                </div>
                <div id="J-scroll-con" class="pull-right scroll-con" style="position: relative">
                    <scroller class="scroll-con-inner" style="padding: 0 10px">
                        <p class="bg-gray p10 f12">{{ categoryName }}</p>
                        <div class="product-list" :data-len="goodsList.length">
                            <loading v-show="goodsLoading"></loading>
                            <template v-if="!goodsLoading">
                                <template v-if="goodsList.length">
                                    <div v-for="(goodsItem, index) in goodsList" class="panel-item"
                                         :key="goodsItem.goodsId"
                                         :data-rel-cart="goodsItem.goodsId"
                                         :data-rel-shop-id="goodsItem.shopId"
                                         :data-rel-shop-type-id="shopViewData.shop.shopTypeId"
                                         :data-sendsale="goodsItem.sales && (goodsItem.sales.salesType == 3 || goodsItem.sales.salesType == 7) ? goodsItem.sales.value : '1,0'">
                                        <!--(goodsItem.sales && goodsItem.sales.salesType == 3 || goodsItem.sales.salesType == 6 ? 1 : 0)-->

                                        <div class="panel-inner">
                                            <router-link class="panel-pic" :to="{name: 'productDetail', query: {goodsId: goodsItem.goodsId}}">
                                                <img width="70" height="70" :src="(goodsItem.pics.length ? goodsItem.pics[0].picUrl : config.defaultGoodsPic)+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt="">
                                            </router-link>
                                            <div class="panel-info f12">
                                                <h2 class="panel-tit nowrap">
                                                    <router-link data-rel-tit="true" :to="{name: 'productDetail', query: {goodsId: goodsItem.goodsId}}">{{ goodsItem.name }}</router-link>
                                                </h2>
                                                <div class="mt5 clearfix">
                                                    <!--<div class="add-cart" :data-inventory="goodsItem.inventory">
                                                        <span class="minus hide">-</span>
                                                        <span data-num="0" class="num hide">0</span>
                                                        <span class="plus">+</span>
                                                    </div>-->
                                                    <buy-to-cart :cart-list="cartList"
                                                              :goods-item="goodsItem"
                                                              :shop-id="goodsItem.shopId"
                                                              :key="goodsItem.goodsId"
                                                              @add-cart="addCartFun"
                                                              @reduce-cart="reduceCartFun"></buy-to-cart>
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
                                <div v-else class="mt30 text-center">暂无商品~</div>
                            </template>

                        </div>

                        <!-- 加载更多 -->
                        <div id="pullUp" class="hidden">
                            <span class="pullUpIcon"></span><span class="pullUpLabel">向上拉获取更多数据...</span>
                        </div>
                        <!-- 遮罩层 -->
                        <div v-if="isPreview" class="fullPage"></div>
                    </scroller>
                </div>
            </div>

            <div class="merchant-tabbox hidden" style="position: relative; height: 293px; overflow-y: auto;">
                <!-- 优惠券 start -->
                <div v-if="shopViewData.shopCoupon && shopViewData.shopCoupon.length" class="panel-nobrd">
                    <h2 class="pl10 pt10 f14">优惠券</h2>
                    <ul class="coupons-list">
                        <li v-for="(coupon, index) in shopViewData.shopCoupon"
                            v-if="!(index >= 2 && isFold)" class="coupons-option mb10"
                            :class="{'coupons-noused': !checkValidCoupon(coupon)}">
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
                                <a @click="receiveCoupon(coupon)" href="javascript:;" class="get-btn">立即领取</a>
                            </div>
                        </li>
                        <li v-if="shopViewData.shopCoupon.length > 2" class="panel-chunk text-center f12">
                            <a class="block lightgray"
                               @click.prevent="toggleFold"
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
                            <a :href="'delivery-staff.html?servicerId=' + servicerItem.servicerId">
                                <div class="table-type">
                                    <div class="tbl-cell-mid" style="width: 46px">
                                        <img width="36" height="36" alt="" :src="servicerItem.pic1 || 'images/default-empty.png'">
                                    </div>
                                    <div class="tbl-cell-mid">
                                        <h3 class="f14">{{servicerItem.name}}</h3>
                                        <p class="lightgray">{{servicerItem.position}}</p>
                                    </div>
                                </div>
                            </a>
                            <div class="mt5 nowrap">{{ servicerItem.summary }}</div>
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
                        <div class="gray f12 lineclamp2 bwrd">{{ shopViewData.shop.summary }}</div>
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

                <!-- 遮罩层 -->

                <div v-if="isPreview" class="fullPage"></div>

            </div>
        </div>
        <!--  商品、商家 end -->

        <!-- 投诉列表 strat -->
        <div class="check-error-list text-center hidden">
            <div class="panel lh-22 gray f16" style="margin-bottom:0;">

            </div>
        </div>

        <!-- 投诉列表 end -->
        <!--<a :href="backUrl" class="go-back"></a>-->

        <min-cart :cart-list="cartList" :shop="shopViewData.shop">
            <template slot="buyCart" scope="props">
                <buy-to-cart :cart-list="props.cartList"
                      :goods-item="props.goodsItem"
                      :shop-id="props.shopId"
                      :key="props.goodsItem.goodsId"
                      @add-cart="addCartFun"
                      @reduce-cart="reduceCartFun">
                </buy-to-cart>
            </template>
        </min-cart>

    </div>
</template>

<script>
 import {mapGetters} from 'vuex'
 import utils from '@/utils/utils';
 import cartMixin from '@/mixin/cartMixin';

 export  default {
     data () {
         return{
             backUrl: 'index.html',
             wxConfig: {},
             isFold: true,
             goodsLoading: false,
             isShowDropDown: false,
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
             scrollCon: null
         }
     },
    mixins: [cartMixin],
    created () {
         var _this = this;

         // 商家详情
        this.$axios.get(_this.$api.shopview,{params:{shopId: this.query.shopId}})
            .then(({data, status, msg}) => {

                if (status === 1) {

                     this.shopViewData = data;

                     this.$nextTick(function () {

                         this.toggleCategory(0);

                         this.$nextTick(function () {

                             bindEvent(this);

                            // 微信分享待开发
                            // this.getWxConfig();

                         })

                     });

                } else {

                     // 出错跳转首页
                     this.$vux.toast.text(msg)
                     /*layer.msg(result.msg, function () {
                         redirect_url(config.index)
                     });*/

                }

         });

    },
    mounted () {
        var _this = this;

        // 处理商户端的店铺预览，只看，不能跳转其它用户端页面
        if (this.isPreview) {
            // 返回上一页
            this.backUrl = 'javascript:history.go(-1);';

            // 购物车清空
            if (window.sessionStorage) {

                if (window.sessionStorage.cartList) {
                    delete  window.sessionStorage['cartList']
                }

            }
            // 链接阻止
            $('body').on('click', 'a:not(".go-back")', function (e) {
                e.preventDefault();
            })
        }

    },
    methods: {
        // app端导航
        shopGps (shop) {
            if (!utils.isWeixin && !this.isPreview) {
                //redirect_url('/shopgps?latitude='+shop.latitude+'&longitude='+shop.longitude+'&address='+shop.address)
            }
        },
        // 展开隐藏查看更多优惠券
        toggleFold () {
            this.isFold = !this.isFold;
        },
        // 更多功能菜单展示隐藏
        showDropDown () {
            var _this = this;

            setTimeout(function () {
                _this.isShowDropDown = !_this.isShowDropDown;
            }, 0)

        },
        // 切换分类获取商品
        getGoodsListById (param, bConcat, cb) {
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
                    _this.goodsLoading = false;

                    cb && cb(goodsList);
                })
            };

            _this.goodsList = [];
            _this.goodsLoading = true;

            if (param.categoryId) {
                // 分类商品
                this.$axios.get(this.$api.getgoodslistbycategory, {params: param})
                    .then(({data, status, msg}) => {
                        successFn(data)
                    })

            } else {
                // 活动促销商品
                this.$axios.get(this.$api.getgoodslistbysalesid, {params: param})
                    .then(({data, status, msg}) => {
                        successFn(data)
                    })
            }

        },
        toggleCategory (index) {
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
                param.shopId = this.query.shopId
            } else {
                // 活动促销商品
                param.salesId = categoryItem.salesId
            }

            this.getGoodsListById(param, false)

        },
        fav ($e) {
            var _this = this;

            // 预览模式，不能收藏
            if (!!this.isPreview) return;

            _A.setShopFavoData({'shopId': this.query.shopId}, null, function (result) {
                if (result.status === 21) { // 收藏
                    userFav = 1;
                    _this.shopViewData.userFav = 1;
                    return false;
                } else if (result.status === 22) { // 取消收藏
                    userFav = 0;
                    _this.shopViewData.userFav = 0;
                    return false;
                }
            })
        },
        // 检查优惠券是否可领取
        checkValidCoupon (coupon) {
            // 0：未过期，1：已过期，2：领完了（发放优惠券总数量已被领取完）,3:可领取（未达到领取数量限制，可继续领取），4：当前用户已领取（已达到限制的领取数量）
            return coupon.outTimeStatus === 0 || coupon.outTimeStatus === 3;
        },
        // 领取优惠券
        receiveCoupon (coupon) {
            var _this = this;

            // 当前优惠券不可领取
            if (!this.checkValidCoupon(coupon)) {
                return layer.msg('该优惠券不可领取', {shift: 0})
            };

            if (coupon != null) {
                /* 代开发功能
                _A.receiveCouponData({couponId: coupon.couponId, chooseType: 0}, null, function (result) {

                    if (result.status == -91) return;

                    // 1020 领取成功，不能再领取优惠券了
                    if (result.status == -1020) {
                        coupon.outTimeStatus = 4
                    }
                    // 1021 领取成功，仍可继续领取
                    else if (result.status == -1021) {
                        // todo
                    }

                    layer.msg(result.msg, {area:['60%']});
                    return false

                })*/
            }
        }
    },
    computed: {
        ...mapGetters(['config']),
        location () {
            return window.location
        },
        // 营业时间
        weekDay () {
            let {weekDay} = this.config;
            return weekDay;
        },
        // 店铺类型
        shopTypeId () {
            let {shopTypeId} = this.config;
            return shopTypeId
        },
        // 促销活动icon类
        saleClass () {
            let {saleClass} = this.config;
            return saleClass
        },
        // url查询
        query () {
            return this.$route.query
        },
        // 预览模式
        isPreview () {
            return this.query.preview
        },
        // 获取分类的名称
        categoryName () {
            var _name = '',
                item;

            if (item = this.shopViewData.categoryList[this.currentCategoryIndex]) {
                _name = item.name
            }

            return _name;
        }
    },
    watch: {
        wxConfig (val) {
            var _this = this,
                shop = this.shopViewData.shop,
                shareCon = {
                    title: '店铺详情',
                    desc: shop.summary,
                    link: location.href,
                    imgUrl: shop.pic || this.config.defaultShopPic,
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                        console.log('====fail===', res)
                    }
                };

            // 暂时不处理
            //this.wxShare(shareCon)
        }
    }
 }

 // 注册事件
 function bindEvent(vm) {
     $(function () {

         var $tabPanel = $('.merchant-tabbox-panel'),
             _windowViewHeight = $(window).height(),
             _tapMeunHeight = $('.merchant-tabbox-meun').height(),
             _panelViewTop = $tabPanel.offset().top,
             _panelViewHeight = _windowViewHeight - _panelViewTop,
             _scrillViewHeight = _panelViewHeight - _tapMeunHeight;

         $tabPanel.height(_panelViewHeight);
         $('.merchant-tabbox').eq(1).height(_scrillViewHeight);

         // 分类导航
         //vm.sideNav = creatSroll('#J-scroll-sideNav');
         // 右侧内容
         //vm.scrollCon = creatSroll('#J-scroll-con', {'probeType':2});


         // 分享二维码
         //$('.J-qrcode').createQrcode();

         $('.tap-panel a').on('click', function (e) {
             var $self = $(this),
                 _type = $self.data('type'),
                 _index = $self.index();

             if ($self.hasClass('tap-meun-on')) return;
             $self.addClass('tap-meun-on').siblings().removeClass('tap-meun-on');

             $('.merchant-tabbox').eq(_index).show().siblings('.merchant-tabbox').hide()

             if (_type === 'sp') {
                 $('#minCartPanel').show();
             } else {
                 $('#minCartPanel').hide();
             }
         })

     });

     //$(document).on('touchmove', function (e) { e.preventDefault();});

 }


</script>


<style lang="less" scoped>
    .merchant-info-panel .like-btn-on {
        /*background1:url(../assets/images/i-like-on.png) no-repeat 100% 50%;*/
        background-size:30px;
    }
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


    .merchant-info-panel {

        .panel-info {
            min-height: 70px;
        }

        /* 营业状态 */
        .opentime {
            top: 45px;
            right: 0;
            font-size: .86rem;
        }

    }

</style>

