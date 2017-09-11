<template>
    <div class="viewbox-container">
        <!-- 导顶部导航 start -->
        <header-top
                :headType="'link'"
                :posModel="'fixed'"
                v-nav-slide-changecolor:#e62739="{disabled: isTopNavDisabled, scrollEl:$refs.viewbox}">
            <span slot="headTxt" class="white pull-left nowrap" style="max-width: 25%">店铺精选</span>
        </header-top>
        <!-- 导顶部导航 end -->
        <div ref="viewbox" class="viewbox pb60" :style="viewPadding">
            <!-- 轮播图 start -->
            <swiper v-if="selfShopList.length >0" :options="swiperAdOption" class="slideAd">

                <swiper-slide v-for="selfShopItem in selfShopList" :key="selfShopItem.picpath">
                    <a :href="'shop-detail.html?shopId='+selfShopItem.shopId">
                        <img class="slide-img" width="100%" :src="selfShopItem.pic+'?x-oss-process=image/resize,m_fixed,h_255,w_720'" alt="" style="-webkit-filter: blur(8px);" />
                    </a>
                    <div class="white f12 auslese-shopInfo" style="text-align: center">
                        <a :href="'shop-detail.html?shopId='+selfShopItem.shopId"><img :src="selfShopItem.pic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt=""/></a>
                        <!--<a :href="'shop-detail.html?shopId='+selfShopItem.shopId"><img :src="selfShopItem.pic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt=""/></a>-->

                        <p class="f16 mt5"><em>{{ selfShopItem.name | cutstr(20) }}</em></p>
                        <!--<p>{{ JSON.stringify(selfShopList[0]) }}</p>-->
                        <p>{{ selfShopItem.shopCategoryName }}&nbsp;<i :class="'text-left star2 star-'+(Math.round(selfShopItem.score))"></i></p>
                    </div>
                </swiper-slide>

                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            <!-- 轮播图 end -->

            <div class="panel panel-list-nospace">
                <template v-if="recommendShopList.length">
                    <div class="panel-hd">
                        <img width="18" class="pull-left mr5" src="images/icons-v3/icons1/icon_tuijian.png">
                        <h2 class="f16">推荐店铺</h2>
                    </div>

                    <!--<a v-for="(recommendShopItem, index) in recommendShopList" class="container panel-item" :href="'shop-detail.html?shopId='+recommendShopItem.shopId">-->
                    <router-link v-for="(recommendShopItem, index) in recommendShopList" class="container panel-item" :to="{name:'shopDetail',query:{'shopId':recommendShopItem.shopId}}">
                        <div class="panel-inner">
                            <div class="panel-pic">
                                <img width="72" height="72"
                                     :src="recommendShopItem.pic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt=""/>
                                     <!--:src="(recommendShopItem.pic ? recommendShopItem.pic : config.defaultGoodsPic )+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt=""/>-->
                            </div>
                            <div class="gray f12 panel-info">
                                <h2 class="panel-tit">{{recommendShopItem.name | cutstr(16)}}
                                    <span v-if="recommendShopItem.self === 1" class="i-label ml10 f12">自营</span>
                                    <!--<i class="lv lv-1">v1</i>-->
                                </h2>
                                <p>
                                    <i :class="'star2 star-'+Math.round(recommendShopItem.score)"></i><span class="dib-middle ml5 orange">{{recommendShopItem.score}}</span>
                                    <span class="ml30 lightgray">月售：{{recommendShopItem.salesMonthCount}}单</span>
                                </p>
                                <p class="nowrap mt5">{{recommendShopItem.summary}}</p>
                                <div class="clearfix mt5">
                                    <p class="pull-left">
                                        <span class="i-label mr5">{{recommendShopItem.shopCategoryName}}</span>
                                        <!--<span class="i-label">{{shopTypeName[recommendShopItem.shopTypeId]}}</span>-->
                                    </p>
                                    <i class="pull-right ml5 mt5">
                                        {{ recommendShopItem.distance }}
                                    </i>
                                </div>

                                <ul v-if="recommendShopItem.saleList.length" class="panel-yhInfo">
                                    <li v-for="(saleItem, idx) in recommendShopItem.saleList"
                                        :class="saleClass[saleItem.salesType]">{{saleItem.name}}</li>
                                </ul>

                            </div>
                        </div>
                    </router-link>
                </template>
                <empty v-else :msg="emptyMsg" class="mt30"></empty>
            </div>
        </div>
        <!-- 主菜单 -->
        <main-nav :current-nav-index="currentNavIndex"></main-nav>
    </div>


</template>

<script>

    export default {

        data () {
            return {
                loaded:false,
                emptyMsg: {
                    mainMsg:'暂无数据~'
                },
                saleClass: {
                    "1": "jian",
                    "2": "te",
                    "3": "zeng",
                    "4": "jian",
                    "5": "te",
                    "6": "zeng"
                },
                swiperAdOption: {
                    pagination : '.slideAd .swiper-pagination',
                    autoplayDisableOnInteraction: false,
                    onInit: function (swiper) {

                        var $wrap = $(swiper.container[0]),
                            _height = $wrap.outerHeight();

                        $wrap.find('img').height(_height)

                    }
                },
                slideAd:null,
                currentNavIndex:3,
                selfShopList:[],
                recommendShopList:[]
            }
        },
        mounted: function () {
            var _this = this;

            this.$axios.get(this.$api.choiceness)
                .then(({data, status}) => {
                    this.loaded = true;

                    let result = data || [];

                    _this.selfShopList = result.selfShopList;
                    _this.recommendShopList = result.recommendShopList;

                    // 绑定事件
                    _this.$nextTick(function () {

                    })
                })

        },
        computed: {
            isTopNavDisabled () {
                return this.loaded && !this.selfShopList.length;
            },
            viewPadding () {
                return 'padding:' + (this.isTopNavDisabled ? '50px' : 0) + ' 0 60px 0'
            }
        }
    }


</script>

<style lang="less" scoped>
    .auslese-shopInfo {
        position: absolute; top: 50%; left: 0; width: 100%;
        -webkit-transform: translate(0,-50%);
        transform: translate(0,-50%);
        z-index: 11;
    }
    .slideAd .swiper-slide {
        height: 0;
        padding-bottom: 52.083333%;
        overflow: hidden;
    }
    .auslese-shopInfo {
        img {
            border-radius: 50%; width: 60px; height: 60px
        }
    }

</style>
