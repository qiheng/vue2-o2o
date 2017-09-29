<template>
    <div class="panel panel-list-nospace">
        <template v-if="recommendShopList.length">
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
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data () {
            return {
                loaded:false,
                emptyMsg: {
                    mainMsg:'暂无数据~'
                },
                swiperAdOption: {
                    pagination : '.slideAd .swiper-pagination',
                    autoplayDisableOnInteraction: false,
                    onInit: function (swiper) {

                        /*var $wrap = $(swiper.container[0]),
                            _height = $wrap.outerHeight();

                        $wrap.find('img').height(_height)
                        */
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

            this.$axios.get(this.$api.infosearch)
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
            ...mapGetters(['config']),
            // 促销活动icon类
            saleClass () {
                let {saleClass} = this.config;
                return saleClass
            },
            isTopNavDisabled () {
                return this.loaded && !this.selfShopList.length;
            },
            viewPadding () {
                return 'padding:' + (this.isTopNavDisabled ? '50px' : 0) + ' 0 60px 0'
            }
        }
    }


</script>
<style>

</style>
