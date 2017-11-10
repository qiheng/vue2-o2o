<template>
    <div class="viewbox-container" v-cloak>
        <div class="product-detail viewbox pb60">
            <!-- 商品 start -->
            <div class="panel product-info" style="border-top: 0">

                <template v-if="goodsInfo.pics">
                    <!-- 轮播图 start -->
                    <!--<div class="swiper-container slideAd">
                        <div class="swiper-wrapper">
                            <div v-for="(picItem, index) in goodsInfo.pics" v-if="index === 0" class="swiper-slide text-center">
                                <a href="javascript:;">
                                    <img width="100%" :src="picItem.picUrl + '?x-oss-process=image/resize,m_fixed,h_600,w_600'" alt="" />
                                </a>
                            </div>
                        </div>
                        &lt;!&ndash;<div class="swiper-pagination"></div>&ndash;&gt;
                    </div>-->
                    <!-- 轮播图 end -->

                    <!-- 轮播图 start -->
                    <swiper ref="slideAd" v-if="goodsInfo.pics && goodsInfo.pics.length" :not-next-tick="notNextTick" :options="swiperAdOption" class="slideAd" style="padding-bottom:100%">

                        <swiper-slide v-for="(picItem, index) in goodsInfo.pics" :key="picItem.picUrl">
                            <a href="javascript:;">
                                <img width="100%" :src="picItem.picUrl + '?x-oss-process=image/resize,m_fixed,h_600,w_600'" alt="" />
                            </a>
                        </swiper-slide>

                    </swiper>
                    <!-- 轮播图 end -->

                </template>

                <div class="panel-bd f24"
                     :data-rel-cart="goodsInfo.goodsId"
                     :data-sendsale="goodsInfo.sales && (goodsInfo.sales.salesType == 3 || goodsInfo.sales.salesType == 6) ? goodsInfo.sales.value : '1,0'"
                     :data-rel-shop-type-id="goodsInfo.shop.shopTypeId"
                     :data-rel-shop-id="goodsInfo.shopId">
                    <h2 class="product-tit f32" data-rel-tit="true">
                        {{ goodsInfo.name }}
                        <a :href="'qrcode.html?type=goods&name='+goodsInfo.name+'&url='+encodeURIComponent(location.href)" class="qrcode-btn ml5"></a>
                    </h2>
                    <p class="lightgray mt5"><span class="mr10">库存{{ goodsInfo.inventory }}</span>已售出{{ goodsInfo.salesNum }}份，好评率{{ goodsInfo.greatPoint }}</p>
                    <p class="mt5">
                        <span class="orange mr5">&yen; <i :data-rel-price="goodsInfo.eprice" class="f32">{{ goodsInfo.eprice | toFixed }}/{{goodsInfo.format}}</i></span>
                        <del v-if="goodsInfo.eprice != goodsInfo.price" class="lightgray mr5">&yen; {{ goodsInfo.price | toFixed }}/{{goodsInfo.format}}</del>
                        <!--类型 1平台限时折扣，2平台N元专区，3平台买一送一，4商家限时折扣，5商家N元专区，6商家买一送一-->
                        <!--<span v-if="goodsInfo.salesType" class="i-label">买1送1</span>-->
                    </p>

                    <a v-if="isFlashSale && !totalNum" @click="buyFn"
                       href="javascript:;"
                       class="btn btn-primary goBuy">立即购买
                    </a>

                    <buy-to-cart ref="buyEl" :cart-list="cartList"
                              :goods-item="goodsInfo"
                              :shop-id="goodsInfo.shopId"
                              :key="goodsInfo.goodsId"
                              @add-cart="addCartFun"
                              @reduce-cart="reduceCartFun">
                    </buy-to-cart>
                </div>
            </div>
            <!-- 商品 start -->

            <!-- 店铺信息 start -->
            <div class="container panel-item merchant-info-panel">
                <div class="panel-inner">
                    <div class="panel-pic">
                        <router-link :to="{name: 'shopDetail', query: {shopId: goodsInfo.shop.shopId}}">
                            <img width="72" height="72" :src="goodsInfo.shop.pic" alt="">
                        </router-link>
                    </div>
                    <!--<div class="merchant-btns" style="z-index: 1">-->
                    <!--<a class="J-qrcode qrcode-btn" href="javascript:;"></a>-->
                    <!--&lt;!&ndash;<a class="J-share share-btn" href="javascript:;" data-ajax="false"></a>&ndash;&gt;-->
                    <!--<a @click="fav" :data-user-fav="goodsInfo.userFav" class="like-btn" :class="{'like-btn-on': goodsInfo.userFav}" href="javascript:;"></a>-->
                    <!--</div>-->
                    <div class="gray panel-info">
                        <h2 class="panel-tit two-thirds nowrap">
                            <router-link :to="{name: 'shopDetail', query: {shopId: goodsInfo.shop.shopId}}">
                                {{ goodsInfo.shop.name }}
                            </router-link>
                        </h2>
                        <p class="f12">
                            <i :class="['star2', 'star-'+Math.round(goodsInfo.shop.score)]"></i>
                        </p>

                        <ul v-if="goodsInfo.sales" class="panel-yhInfo" style="margin-top: 5px">
                            <li :class="saleClass[goodsInfo.sales.salesType]">{{goodsInfo.sales.name}}</li>
                        </ul>
                        <a :href="'tel:'+goodsInfo.shop.phone" class="i-phone pos-rt-middle" style="right: 0;"></a>
                    </div>
                    <div class="lightgray merchant-info-address" @click="shopGps(goodsInfo.shop)">
                        <template v-if="goodsInfo.shop.shopTypeId == shopTypeId.o2o">
                            <img class="pull-left" width="19" src="../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>
                            <span class="pull-right">服务范围<ins class="gray">{{goodsInfo.shop.reangName}}</ins></span>
                            <p class="nowrap">{{ wholeAddress }}</p>
                        </template>
                        <template v-else>
                            <img class="pull-right" width="19" src="../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>
                            <p class="nowrap">{{ wholeAddress }}&nbsp;&nbsp;{{goodsInfo.shop.distance}}</p>
                        </template>
                    </div>
                </div>
            </div>
            <!-- 店铺信息 end -->

            <!-- 商品详情 start -->
            <div class="panel">
                <div class="panel-hd">
                    <h3>商品详情</h3>
                </div>
                <div class="panel-bd custom-con-panel bwrd">
                    <div class="bwrd" v-html="goodsInfo.content"></div>
                    <div class="mt10" v-if="goodsInfo.pics && goodsInfo.pics.length">
                        <img class="img-responsive" v-for="pic in goodsInfo.pics" :src="pic.picUrl" alt=""/>
                    </div>
                </div>
            </div>
            <!-- 商品详情 end -->
        </div>

        <!-- 购物车 -->
        <min-cart :cart-list="cartList" :shop="goodsInfo.shop"
                  @total-num="onTotalNum">
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

        <!--  主菜单 -->
        <!--<main-nav :current-nav-index="currentNavIndex" :meun-list="mainMeunsList"></main-nav>-->

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import utils from '@/utils/utils'
    import cartMixin from '@/mixin/cartMixin'

    export default {
        data() {
            return {
                totalNum: 0,
                notNextTick: true,
                swiperAdOption: {
                    //autoplay: 3000,
                    observeParents:true,
                    grabCursor : true,
                    pagination : '.slideAd .swiper-pagination',
                    autoplayDisableOnInteraction: false,
                    onInit: function (swiper) {

                        var $wrap = $(swiper.container[0]),
                            _height = $wrap.outerHeight();

                        $wrap.find('img').height(_height)

                    }
                },
                goodsInfo: {
                    pics:[],
                    shop:{
                        opentime:{}
                    }
                }
            }
        },
        mixins: [cartMixin],
        created () {
            var _this = this;

            this.$axios.post(this.$api.goodsview, $.param({goodsId: this.query.goodsId}))
                .then(({data, status, msg}) => {
                this.goodsInfo = data;

                this.$nextTick(function () {

                    // 代开发
                    // _this.getWxConfig();

                    // 主菜单
                    //_this.getMainMeuns()
                })

            })

        },
        methods: {
            // app端导航
            shopGps (shop) {
                if (!utils.isWeixin) {
                    redirect_url('/shopgps?latitude='+shop.latitude+'&longitude='+shop.longitude+'&address='+shop.address)
                }
            },
            buyFn () {
                //this.isBuyBtn = false;
                this.$refs.buyEl.$refs.madd.click();
                // console.log(this.$refs.buyEl.$refs.madd)
            },
            onTotalNum (num) {
                this.totalNum = num;
            }
        },
        computed: {
            ...mapGetters(['config']),
            location () {
                return window.location
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
            // 店铺类型
            shopTypeId () {
                let {shopTypeId} = this.config;
                console.log('============shopTypeId====',shopTypeId);
                return shopTypeId
            },
            // 详细地址
            wholeAddress () {
                var shop = this.goodsInfo.shop;

                return shop.provinceName + shop.cityName + shop.areaName + shop.address
            },
            // 限时抢购
            isFlashSale () {
                return this.goodsInfo.sales &&
                    (this.goodsInfo.sales.salesType === 1 ||
                    this.goodsInfo.sales.salesType === 5)
            }
        },
        watch: {
            wxConfig (val) {
                var _this = this,
                    goodsInfo = this.goodsInfo,
                    shareCon = {
                        title: '商品详情',
                        desc: goodsInfo.content,
                        link: this.location.href,
                        imgUrl: (goodsInfo.pics && goodsInfo.pics.length && goodsInfo.pics[0].picUrl ) || config.defaultGoodsPic,
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    };

                // 代开发
                // this.wxShare(shareCon)
            }
        }
    }
</script>

<style lang="less" scoped>
    .product-detail {

        .qrcode-btn{
            width: 16px;
            height: 16px;
        }

    }
</style>
