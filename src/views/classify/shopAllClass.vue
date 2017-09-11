<template>
    <div class="animsition pb60" v-cloak>
        <!-- 导顶部导航 start -->
        <div class="header nav-header-search">
            <span id="categoryName" class="white pull-left nowrap" style="max-width: 25%">{{ shopClassName }}</span>
            <router-link :to="{name:'search',query:{'t':4}}" class="bfc-panel">
                <i class="btn icos-sprite search-btn pull-right"></i>
                <div class="header-search">
                    <p class="search-key lightgray pl10">输入综合服务商家名称</p>
                </div>
            </router-link>
        </div>
        <!-- 导顶部导航 end -->

        <!-- 分类 start -->
        <div class="panel-nobrd classify-wrap">
            <ul class="mod-box gray text-center">
                <li @click="tabSortMeun" data-rel="classify" class="box-flex panel-bd"><span class="mr5">全部分类</span><i class="icon-down-gray"></i></li>
                <li @click="tabSortMeun" data-rel="sort" class="box-flex panel-bd"><span class="mr5">{{ currentOrder }}</span><i class="icon-down-gray"></i></li>
            </ul>
        </div>

        <!-- 分类 end -->

        <!-- 热门应用 start -->
        <div class="panel-list-nospace hot-apply-list">
            <div class="hot-apply-bd">
                <!-- 加载数据区 -->
                <!--<loading v-show="loading"></loading>-->
                <template>
                    <template v-if="shopList.length">
                        <a v-for="(shopItem, index) in shopList" class="container panel-item" :href="'shop-detail.html?shopId='+shopItem.shopId">
                            <div class="panel-inner">
                                <div class="panel-pic">
                                    <img width="72" height="72" :src="shopItem.pic || 'images/default-empty.png'" alt="">
                                </div>
                                <div class="gray f12 panel-info">
                                    <h2 class="panel-tit">
                                        {{ shopItem.name | cutstr(20) }}
                                        <span v-if="shopItem.self" class="i-label ml10 f14">自营</span>
                                    </h2>

                                    <p>
                                        <i :class="['star2', 'star-'+Math.round(shopItem.score)]"></i><span class="dib-middle ml5 orange">{{ shopItem.score }}</span>
                                        <span class="ml30 lightgray">月售：{{ shopItem.salesMonthCount }}单</span>
                                    </p>
                                    <p class="nowrap mt5">{{ shopItem.summary }}</p>
                                    <div class="clearfix mt5">
                                        <p class="pull-left">
                                            <span class="i-label mr5">{{ shopItem.shopCategoryName }}</span>
                                            <span class="i-label">{{ shopTypeName[shopItem.shopTypeId] }}</span>
                                        </p>
                                        <i class="pull-right ml5 mt5">
                                            {{ shopItem.distance }}
                                        </i>
                                    </div>

                                    <ul v-if="shopItem.saleList.length" class="panel-yhInfo f12">
                                        <li v-for="(saleItem, index) in shopItem.saleList" :class="saleObj[saleItem.salesType]">{{ saleItem.name }}</li>
                                    </ul>

                                    <ul v-if="shopItem.goodsList && shopItem.goodsList.length" class="list-fl mt10 tui-goods-list">
                                        <li v-for="subgoods in shopItem.goodsList">
                                            <img width="100%" height="100%" class="img-responsive"
                                                 :src="(subgoods.pics ? subgoods.pics[0].picUrl : config.defaultGoodsPic) + '?x-oss-process=image/resize,m_fixed,h_50,w_50'" alt=""/>
                                            <b>&yen;{{ subgoods.price }}</b>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </a>
                    </template>
                    <empty v-else :msg="emptyMsg"></empty>
                </template>

            </div>
        </div>
        <!-- 热门应用 end -->

        <!--- 分类&排序层 start -->
        <div @click.stop="closeSortLayer" v-show="isSortLayerShow" class="classify-sort-layer" style="display: block">
            <div v-show="isClassifyShow" class="classify-con" style="display: block">
                <div class="classify-level-1" style="display: none">
                    <div class="classify-level-inner">
                        <ul><!-- 加载数据区 --></ul>
                    </div>
                </div>
                <div class="classify-level-2" style="width: 100%">
                    <div class="classify-level-inner">
                        <div class="classify-list">
                            <ul class="sub-tpl">
                                <!-- 加载数据区 -->
                                <li @click="chooseCategory(categoryItem, index)" v-for="(categoryItem, index) in categoryItem" class="level-2"
                                    :class="{on: currentCategoryIndex === index}"
                                    :key="categoryItem.shopCategoryId">
                                    <a href="javascript:;" :data-num="categoryItem.shopCount">{{ categoryItem.name }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="isSortShow" class="sort-con" style="display: block">
                <ul>
                    <li v-for="(orderItem, index) in order" @click="orderBy(index)"
                        :class="{on:currentSortIndex == index}"
                        :data-order="index">
                        <a href="javascript:;">{{ orderItem }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 分类&排序层 end -->

        <!-- 主导航 -->
        <!--<main-nav :current-nav-index="currentNavIndex"></main-nav>-->
    </div>
</template>

<script>
    var _order = ['智能排序','离我最近','好评优先','人气最高'];
    export default {
        data() {
            return {
                emptyMsg: {
                    mainMsg: '暂无店铺列表'
                },
                saleObj:{
                    '1': 'jian',
                    '2': 'te',
                    '3': 'zeng',
                    '4': 'jian',
                    '5': 'te',
                    '6': 'zeng'
                },
                currentCategoryIndex: -1,
                currentSortIndex: 0,
                _loadMore: null,
                param: {
                    page: 1,
                    shopClassId: '', // 必须参数
                    shopCategoryId: '',
                    order: 0
                },
                s1:null,
                order: _order,
                currentOrder: _order[0],
                isClassifyShow: false,
                isSortShow: false,
                loading: false,
                shopClassName: '',
                categoryList: [],
                categoryItem:[],
                shopList: []
            }
        },
        created: function () {
            var _this = this;
            const query = this.query;
            _this.param.shopClassId = _this.query.shopClassId;
            _this.param.shopCategoryId = _this.query.shopCategoryId;
            // 分类名称
            _this.shopClassName = _this.query.shopClassName;

            // 获取店铺列表
//            _this.getShopList()
//                .done(function () {
//
//                    // 获取分类
                    _this.$axios.get(_this.$api.getshopcategorylist,{params:{shopClassId: _this.query.shopClassId}})
                        .then(function (categoryList) {
                            _this.categoryItem = categoryList.data;
                            console.log(_this.categoryItem,'+++++++++++++++++++++++++++++++++++++++66666666666')
                        })
////                    _A.getClassData({shopClassId: query.shopClassId}, function (categoryList) {
////                        _this.categoryList = categoryList;
////                    });
//                });
        },
        mounted: function () {
//            bindEvent(this)
        },
        methods: {
            // tab 导航切换
            tabSortMeun: function ($e) {
                var _this = this,
                    dataset = $e.currentTarget.dataset;
                if (dataset.rel == 'classify') {
                    this.isClassifyShow = !this.isClassifyShow;
                    this.isSortShow = false;

                    this.$nextTick(function () {
//                        this.isClassifyShow && _this.s1.refresh()
                    });

                } else {
                    this.isSortShow = !this.isSortShow;
                    this.isClassifyShow = false;
                }

                this.overflowBody();
            },
            // 关闭层
            closeSortLayer: function () {
                this.isClassifyShow = this.isSortShow = false;
                this.overflowBody();
            },
            // 防止页面滚动
            overflowBody: function () {

                if (this.isClassifyShow || this.isSortShow) {
                    $('html, body').addClass('overflow-body');
                } else {
                    $('html, body').removeClass('overflow-body');
                }

            },
            /**
             * 获取店铺列表数据
             * @param cover { boolean } 是否覆盖原来的店铺数据 默认 true
             * @param cb { function } 回调函数
             * @returns { jq.xhr }
             */
            getShopList: function (cover, cb) {
                var _this = this;

                if (arguments.length === 1 && $.isFunction(cover)) {
                    cb = cover;
                    cover = true;
                }

                if (cover == null) cover = true;

                this.loading = cover ? true : false;

                return this.$axios.get(this.$api.shoplist,{params:_this.param})
                    .then(function (shopList) {
                        // 覆盖
                        if (cover) {
                            _this.shopList = shopList;
                        }
                        // 追加
                        else {
                            _this.shopList = _this.shopList.concat(shopList)
                        }
                        // 加载更多
                        !_this._loadMore && shopList.length && (_this._loadMore = _this.loadMore());
                        _this._loadMore && _this._loadMore.update();

                        cb && cb(shopList, _this)
                    })
            },
            // 获取该分类下的店铺列表
            chooseCategory: function (categoryItem, index) {
                var _this = this;
                _this.param.shopCategoryId = categoryItem.shopCategoryId;
                _this.shopClassName = categoryItem.name;
                _this.param.page = 1;
                _this.currentCategoryIndex = index;

                // 获取店铺列表
                _this.getShopList()

            },
            // 排序
            orderBy: function (index) {
                var _this = this;
                _this.currentSortIndex = this.param.order = index;
                _this.param.page = 1;
                _this.currentOrder = _order[index];
                // 获取店铺列表
                _this.getShopList();
            },
            // 滚动底部加载
            loadMore: function loadMore() {
                var _this = this;

                return $('.hot-apply-list').loadMore({
                    scrollArea : window,
                    loadDownFn: function (me) {
                        // 初始化全部促销分类商品
                        _this.param.page += 1;

                        _this.getShopList(false, function (shopList) {
                            if (!shopList.length) {
                                me.noData();
                            }
//                            me.refresh();
                        });

                    }
                }).data('load-more');
            }
        },
        computed: {
            // 排序分类层 显示控制字段
            isSortLayerShow: function () {
                return this.isClassifyShow || this.isSortShow;
            },
            query() {
                return this.$route.query
            }
        }
    }
    // 注册事件
//    function bindEvent(vm) {
//        vm.s1 = creatSroll('.classify-level-2');
//
//        var _threshold = $('.classify-wrap').offset().top + $('.classify-wrap').outerHeight() + 2;
//        $('.classify-sort-layer').css('top', _threshold);
//
//        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//
//        // 渲染主导航 (给个没有的，当前就没有菜单按钮选中了)
////		tpl.showMeun({'on': 10});
//    }
</script>

<style>

</style>
