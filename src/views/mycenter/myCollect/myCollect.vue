<template>
    <!-- 我的收藏 start -->
    <div class="animsition myfavorityshop-wrap pb60" v-cloak>
        <div class="myfavorityshop-list panel-list">
            <loading v-show="loading"></loading>
            <template v-if="myfavorityshopslist.length">
                <div class="bg-white p10"><img class="pull-left mr5" width="18"  src="../../../assets/images/icons-v3/icons1/icon_shop2.png" alt=""/>收藏店铺</div>
                <!--普通-->
                <div v-for="myfavorityshop in myfavorityshopslist" class="container panel-item">
                    <!--<router-link class="block panel-inner" :to="'shop-detail.html?shopId='+ myfavorityshop.shopId">-->
                    <router-link class="block panel-inner" :to="{name:'shopDetail',query:{'shopId':myfavorityshop.shopId}}">
                        <img class="panel-pic" width="70" height="70"
                        :src="(myfavorityshop.pic ? myfavorityshop.pic : config.defaultGoodsPic)+'?x-oss-process=image/resize,m_fixed,h_140,w_140'" alt="">

                        <div class="gray panel-info f12">
                            <h2 class="panel-tit">
                                {{ myfavorityshop.name }}
                                <span v-if="myfavorityshop.license == 2" class="i-label ml10 f12">未认证</span>
                                <span v-if="myfavorityshop.license == 3" class="i-label-default ml10 f12">认证</span>
                            </h2>

                            <p>
                                <i :class="'star2 star-'+Math.round(myfavorityshop.score)"></i><span class="dib-middle ml5 orange">{{ myfavorityshop.score }}</span>
                            </p>
                            <p class="nowrap mt5">{{ myfavorityshop.summary }}</p>
                            <div class="clearfix mt5">
                                <p class="pull-left">
                                    <span class="i-label mr10">{{ myfavorityshop.shopCategoryName }}</span>
                                    <span class="i-label mr10">{{ myfavorityshop.shopTypeName }}</span>
                                </p>
                                <i class="pull-right ml5 mt5 lightgray">{{ myfavorityshop.distance }}</i>
                            </div>
                        </div>
                    </router-link>
                </div>
            <!--普通-->
            </template>
            <empty v-else :msg="emptyMsg">
                <img slot="icon" width="180" src="../../../assets/images/empty/img_shouc@2x.png" alt=""/>
                <router-link slot="button" :to="{name:'home'}" class="btn btn-default mt20">返回首页</router-link>
            </empty>
        </div>
    </div>
        <!--我的收藏 end -->
</template>

<script>
    export default {
        data(){
            return{
                emptyMsg: {
                    mainMsg: '您还没有收藏的店铺哦~',
                    subMsg: '赶快去收藏您心仪的店铺吧~'
                },
                myfavorityshopslist:[],
                loading: true,
                _loadMore: null,
                params: {
                    page:1
                },
                config:{
                    defaultGoodsPic:'',
                    index:''
                }

            }
        },
        created: function () {
            this.getMyFavorityShop();
        },
        methods: {
            // 收藏数据
            getMyFavorityShop: function (bConcat, cb) {
                var _this = this;

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = false;
                }
                _this.loading = true;
                //收藏页面
                this.$axios.get(this.$api.myfavorityshop,{params:_this.params})
                .then(({data,status})  => {
                   this.myfavorityshopslist = data;
                    console.log(data,'+++++++++++++++++++++');
                    // 合并
                    if (bConcat) {
                        _this.myfavorityshopslist = _this.myfavorityshopslist.concat(myfavorityshopslist);
                    } else {
                        _this.myfavorityshopslist = myfavorityshopslist
                    }

                    // loadDown
                    if (!_this._loadMore) {
                        _this._loadMore = _this.loadMore();
                    }

                    _this._loadMore && _this._loadMore.update();

                    cb && cb(myfavorityshopslist)
                })
                .catch(e =>{
                    _this.loading = false;
                })
            },
            // 滚动底部加载
            loadMore: function loadMore() {
//                var _this = this;
//
//                return $('.myfavorityshop-wrap').loadMore({
//                    scrollArea : window,
//                    loadDownFn: function (me) {
//                        //初始化全部促销分类商品
//                        _this.param.page += 1;
//                        _this.getMyFavorityShop(true, function (myfavorityshopslist) {
//
//                            if (!myfavorityshopslist.length) {
//                                me.noData();
//                            }
//                            me.refresh();
//
//                        });
//                    }
//                }).data('load-more');
            }
        }
    }

</script>
