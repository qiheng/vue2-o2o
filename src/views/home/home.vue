<template>
    <div class="home11 viewbox-container">
        <!-- 导顶部导航 start -->
        <div ref="searchNav">
            <header-top
                :headType="'link'"
                :posModel="'fixed'"
                v-nav-slide-changecolor:#e62739="{disabled: isTopNavDisabled, scrollEl:$refs.viewbox}">
                <router-link slot="headTxt"
                             :to="{name:'chooseCity', query: {currentCity: indexData.geoCode}}"
                             class="J-chose-city-toggle1 select-place pull-left">{{ indexData.geoCode }}</router-link>
            </header-top>
        </div>
        <!-- 导顶部导航 end -->

        <div ref="viewbox" class="viewbox" :style="viewPadding">
            <!-- 轮播图 start -->
            <swiper v-if="indexData.slide && indexData.slide.length" :options="swiperAdOption" class="slideAd" style="padding-bottom:47%">

                <swiper-slide v-for="slide in indexData.slide" :key="slide.picpath">
                    <a href="shop-detail.html?shopId=40288afe5aebae43015aebc222c60000&amp;type=0">
                        <img width="100%" :src="slide.picpath+'?x-oss-process=image/resize,m_fixed,h_720,w_320'" alt="">
                    </a>
                </swiper-slide>

                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            <!-- 轮播图 end -->

            <!-- 公告 start -->
            <dl v-if="indexData.notice.length > 0" class="broadcast-msg home-broadcast-msg">
                <dt>公告：</dt>
                <dd>
                    <swiper :options="swiperMsgOption" class="swiper-container slideMsg" style="height: 20px;">

                        <swiper-slide v-for="notice in indexData.notice" :key="notice.title" class="nowrap">
                            <!-- <a href="notice.html?type=0"></a> -->
                            <router-link :to="{name:'notice'}">{{notice.title}} </router-link>
            </swiper-slide>

                    </swiper>
                </dd>

            </dl>
            <!-- 公告 end -->

            <!-- 服务类别 start -->
            <div v-if="indexData.menu.length" class="panel services-category-panel">
                <div class="panel-bd">
                    <!-- Swiper -->
                    <swiper :options="swiperServiceOption" class="swiper-container f12">

                        <swiper-slide v-for="(slideMenus, index) in indexData.menu" :key="index">
                            <div class="clearfix">

                                <a v-for="(menu, index) in slideMenus"
                                   :key="index"
                                   :class="{mt10: index >= 4}"
                                   :href="'#/'+(linkUrl[menu.type] || '') + menu.line + (menu.type == 0 ? '&shopClassName=' + menu.name : '' )">
                                    <img class="radius50" width="48" height="48" :src="menu.pic" :alt="menu.name">
                                    <p class="mt5 nowrap">{{ menu.name }}</p>
                                </a>
                            </div>
                        </swiper-slide>

                        <!-- Add Pagination -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
            </div>
            <!-- 服务类别 end -->

            <a class="block flashSale-panel" href="sales-promotion.html?salesType=1&amp;salesId=3db0e8068a414972bd41d8d8697b0d5c">
                <div class="clearfix flashSale-hd">
                    <img class="flashSale-xsqg" width="120" src="../../assets/images/index/flash-sale.png" alt="">
                    <div class="bfc-panel">
                        <h2 class="f18 dib icon-go">
                            春季大酬宾
                        </h2>
                        <div class="flashSale-dwtime" data-time="260942.144" data-format="1">
                            距离结束时间
                            <count-down @end-time="endTime" :times="120" :format="1"></count-down>
                        </div>

                    </swiper-slide>

                    <!-- Add Pagination -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
        </div>
        <!-- 服务类别 end -->

        <!--<a class="block flashSale-panel" href="sales-promotion.html?salesType=1&amp;salesId=3db0e8068a414972bd41d8d8697b0d5c">-->
            <!--<div class="clearfix flashSale-hd">-->
                <!--<img class="flashSale-xsqg" width="120" src="../../assets/images/index/flash-sale.png" alt="">-->
                <!--<div class="bfc-panel">-->
                    <!--<h2 class="f18 dib icon-go">-->
                        <!--春季大酬宾-->
                    <!--</h2>-->
                    <!--<div class="flashSale-dwtime" data-time="260942.144" data-format="1">-->
                        <!--距离结束时间-->
                        <!--<count-down @end-time="endTime" :times="120" :format="1"></count-down>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="flashSale-img">-->
                <!--<img class="img-responsive" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201704/14/14921508961554984.jpg?x-oss-process=image/resize,m_fixed,h_720,w_300" alt="">-->
            <!--</div>-->
        <!--</a>-->

        <router-link class="block flashSale-panel" :to="{name:'salesPromotion'}">
            <div class="clearfix flashSale-hd">
                <img class="flashSale-xsqg" width="120" src="../../assets/images/index/flash-sale.png" alt="">
                <div class="bfc-panel">
                    <h2 class="f18 dib icon-go">
                        春季大酬宾
                    </h2>
                    <div class="flashSale-dwtime" data-time="260942.144" data-format="1">
                        距离结束时间
                        <count-down @end-time="endTime" :times="120" :format="1"></count-down>

                    </div>
                </div>

            </div>
            <div class="flashSale-img">
                <img class="img-responsive" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201704/14/14921508961554984.jpg?x-oss-process=image/resize,m_fixed,h_720,w_300" alt="">
            </div>
        </router-link>

                <div class="flashSale-img">
                    <img class="img-responsive" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201704/14/14921508961554984.jpg?x-oss-process=image/resize,m_fixed,h_720,w_300" alt="">
                </div>
            </a>


        <div class="panel clearfix home-promotion-panel">

            <div class="panel clearfix home-promotion-panel">


                <a class="pull-left" href="sales-promotion.html?salesType=2&amp;salesId=5f9b0356a5ee4f96ab71c5666cf39123">
                    <div class="home-promotion-hd">
                        <h2 class="f18 icon-go go-2">9.9元专&nbsp;</h2>
                        <h3 style="color: #ff9700"></h3>
                    </div>
                    <img class="img-responsive home-promotion-img" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201703/21/14900591936962118.png" alt="">
                </a>

                <a class="pull-left" href="sales-promotion.html?salesType=3&amp;salesId=4df557624a5d4f6f97441cbd95bd597f">
                    <div class="home-promotion-hd">
                        <h2 class="f18 icon-go go-2">今天半价&nbsp;</h2>
                        <h3 style="color: #ff9700"></h3>
                    </div>
                    <img class="img-responsive home-promotion-img" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201703/21/14900591576829285.png" alt="">
                </a>

            </div>

            <!-- 商家列表 start -->
            <div v-if="indexData.shops.length" class="panel panel-list-nospace">
                <div class="panel-hd">
                    <!--<i class="i3-active pull-left mr5"></i>-->
                    <img width="22" class="pull-left mr5" src="../../assets/images/icons-v3/icons1/icon_shop.png">
                    <h2 class="f16">附近店铺</h2>
                </div>

                <a v-for="shopItem in indexData.shops" class="container panel-item"
                   :href="'shop-detail.html?shopId='+shopItem.shopId">
                    <div class="panel-inner">

                        <div class="panel-pic">
                            <img width="72" height="72"
                                 :src="(shopItem.pic ? shopItem.pic + '?x-oss-process=image/resize,m_fixed,h_100,w_100' : config.defaultGoodsPic)" alt="">

                        </div>
                        <div class="gray f12 panel-info">
                            <h2 class="panel-tit">{{ shopItem.name | cutstr(16) }}

                                <span v-if="shopItem.self" class="i-label ml10 f12">自营</span>

                                <!--<i class="lv lv-1">v1</i>-->
                            </h2>
                            <p>
                                <i :class="'star2 star-'+Math.round(shopItem.score)"></i><span class="dib-middle ml5 orange">{{ shopItem.score }}</span>
                                <span class="ml30 lightgray">月售：{{ shopItem.salesMonthCount }}单</span>
                            </p>
                            <p class="nowrap mt5">{{ shopItem.summary }}</p>
                            <div class="clearfix mt5">
                                <!--<span class="pull-left mr5"><ins class="orange"><%- data.shopCategoryName %></ins></span>-->
                                <p class="pull-left">
                                    <span class="i-label mr5">{{ shopItem.shopCategoryName }}</span>
                                    <!--<span class="i-label">{{ shopTypeName[shopItem.shopTypeId] }}</span>-->
                                </p>
                                <i class="pull-right ml5 mt5">
                                    <!--<i class="i-dwei"></i>&lt;-->
                                    {{ shopItem.distance }}
                                </i>
                            </div>

                            <ul v-if="shopItem.saleList.length" class="panel-yhInfo f12">
                                <li v-for="saleItem in shopItem.saleList" :class="saleClass[saleItem.salesType]">{{ saleItem.name }}</li>
                            </ul>


                        </div>
                    </div>
                </a>

            </div>
            <!-- 商家列表 end -->

        </div>

        <!-- 主导航 -->
        <main-nav></main-nav>
    </div>
</div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data () {
            return {
                //currentNavIndex:2,
                loaded:false,
                saleClass: {
                    '1': 'jian',
                    '2': 'te',
                    '3': 'zeng',
                    '4': 'jian',
                    '5': 'te',
                    '6': 'zeng'
                },
                linkUrl: ['service?shopClassId=','shopdetail?shopId=','productdatail?goodsId='],
                indexData:{
                    areaIsOpen: 1,
                    geoCode:'',
                    slide:[],
                    notice:[],
                    menu:[],
                    sales:[],
                    shops:[]
                },
                swiperAdOption: {
                    autoplay: 3000,
                    pagination : '.slideAd .swiper-pagination',
                    autoplayDisableOnInteraction: false,
                    onInit: function (swiper) {

                        var $wrap = $(swiper.container[0]),
                            _height = $wrap.outerHeight();

                        $wrap.find('img').height(_height)

                    }
                },
                swiperMsgOption: {
                    autoplay: 3000,
                    direction: 'vertical'
                },
                swiperServiceOption: {
                    pagination: '.services-category-panel .swiper-pagination',
                    slidesPerView : 1,
                    //slidesPerGroup:4,
                    paginationClickable: true
                    //spaceBetween: 10,
                    //slidesPerColumn: 2
                    //,freeMode: true
                },
                params: {
                    longitude: 118.91251988,
                    latitude: 39.42564104
                }
            }
        },
        mounted () {
            let _this = this;

            //console.log('userInfo:',this.userInfo)


            // 获取首页数据
            if (this.query.longitude != null) {
                for (let key in this.params) {
                    this.params[key] = this.query[key]
                }
            }

            this.$axios.get(this.$api.index, {params:this.params}).then(({data, status}) => {
                this.loaded = true;

                if (status == 1 ) {
                    this.indexData = Object.assign(this.indexData, data);
                    this.indexData.slide = [];

                    // 对服务菜单导航特殊处理
                    const num = 8;
                    let len = this.indexData.menu.length;
                    let pages = 0

                    if (len) {
                        let meunList = [];
                        pages = Math.ceil(len / num)

                        for(let i = 0; i < pages; i++) {
                            meunList.push(this.indexData.menu.splice(0, 8))
                        }

                        this.indexData.menu = meunList;

                        console.log('meunList--',meunList)

                    }

                }

            })
        },
        methods: {
            endTime () {
                console.log('edn!!')
            }
        },
        computed: {
            query () {
                return this.$route.query
            },
            isTopNavDisabled () {
                return this.loaded && !(this.indexData.areaIsOpen && this.indexData.slide.length)
            },
            viewPadding () {
                return 'padding:' + (this.isTopNavDisabled ? '50px' : 0) + ' 0 55px 0'
                //return 'padding:' + (this.isTopNavDisabled ? this.$refs.searchNav.offsetHeight + 'px' : 0) + ' 0 55px 0'
            },
            ...mapGetters(['userInfo', 'config'])
        }

    };

    // 事件注册
    function bindEvent(vm) {
        //alert(Swiper)
        //vm.$notiejs.top({state:2, msg: '失败了', end () {}})

        // 导航滚动到一定位置变色
        /*$(window).on('scroll.nav resize.nav', function () {
            var top = $(window).scrollTop(),
                    opacity = 0,
                    _target = 200;

            if (top <= _target) {
                opacity = (1/_target) * top;
            } else {
                opacity = 1;
            }

            $('.home-header').css({'background-color': 'rgba(230, 39, 57, '+ opacity +')'})
        });*/


        // 轮播广告
        const slideAd = new Swiper(document.querySelector('.slideAd'),{
            autoplay: 3000,
            pagination : '.slideAd .swiper-pagination',
            autoplayDisableOnInteraction: false,
            onInit: function (swiper) {
                var $wrap = $(swiper.wrapper.context),
                        _height = $wrap.outerHeight();

                $wrap.find('img').height(_height);
            }
        });

        // 轮播公告
        var slideMsg = new Swiper(document.querySelector('.slideMsg'), {
            autoplay: 3000,
            direction: 'vertical'
        })

        // 服务分类
        var slideService = new Swiper(document.querySelector('.services-category-panel .swiper-container'), {
            pagination: '.services-category-panel .swiper-pagination',
            slidesPerView : 1,
            //slidesPerGroup:4,
            paginationClickable: true
            //spaceBetween: 10,
            //slidesPerColumn: 2
            //,freeMode: true
        });

    }

</script>

<style scoped>
    .home-promotion-panel{
        margin-bottom: 55px;
    }
</style>
