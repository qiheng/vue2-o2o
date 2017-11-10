<template>
    <div class="goodsdepot-wrap">
        <!-- 导顶部导航 start -->
        <div class="header nav-header-search">
            <i class="btn icos-sprite search-btn pull-right" @click="search"></i>
            <div class="header-search">
                <input type="text" class="search-key" placeholder="输入商品名称" v-model.trim="keyword"/>
            </div>
        </div>
        <!-- 导顶部导航 end -->

        <!-- tab chose -->
        <!--<div class="J-tab-expand tab-slide-container gray hidden">-->
            <!--&lt;!&ndash; 数据区 &ndash;&gt;-->
            <!--<p class="tab-slide-hd">切换分类</p>-->
            <!--<div class="tab-slide-inner">-->
                <!--<div class="J-slide-nav tab-slide-bd">-->
                    <!--<ul class="tab-slide-list">-->
                        <!--<% _.each(goodsDepotCategorys, function (goodsDepotCategory) { %>-->
                        <!--<li data-goods-depot-category-id="<%- goodsDepotCategory.goodsDepotCategoryId %>"><a href="javascript:;"><%- goodsDepotCategory.name %></a></li>-->
                        <!--<% }) %>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</div>-->
            <!--<i class="arr-down"></i>-->
            <!--<% _.each(goodsdepots, function (goodsdepot) { %>-->
            <!--<div class="panel-chunk">-->
                <!--<img class="panel-pic pull-left mr10" width="72" height="72" src="<%- goodsdepot.pic %>" alt="<%- goodsdepot.name %>">-->
                <!--<div class="bfc-panel">-->
                    <!--<h2 class="mb15 mt10 three-fourths nowrap f16"><%- goodsdepot.name %></h2>-->
                    <!--<p class="nowrap three-fourths lightgray"><%- goodsdepot.content %></p>-->
                    <!--<a class="J-add pos-rt-middle btn btn-primary" data-goods-depot-id="<%- goodsdepot.goodsDepotId %>" data-name="<%- goodsdepot.name %>" data-content="<%- goodsdepot.content %>" href="add-goods.html?name=<%- goodsdepot.name %>&goodsDepotId=<%- goodsdepot.goodsDepotId %>">导入</a>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->


        <div class="panel mt10 tab-content">
            <div class="add-goods-list">
                <!-- 数据区 -->
                <template v-if="goodsdepotlist.length">
                    <div v-for="goods in goodsdepotlist" class="panel-chunk">
                        <img class="panel-pic pull-left mr10" width="72" height="72" :src="(goods.pics.length ? goods.pics[0].picUrl : config.defaultGoodsPic)+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" :alt="goods.name">
                        <div class="bfc-panel">
                            <h2 class="mb15 mt10 three-fourths nowrap f16" v-text="goods.name"></h2>
                            <p class="nowrap three-fourths lightgray" v-text="goods.content"></p>
                            <a class="J-add pos-rt-middle btn btn-primary" @click.prevent="importFn(goods)" href="javascript:;">导入</a>
                        </div>
                    </div>
                </template>
                <empty v-else :msg="emptyMsg"></empty>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            keyword:'',
            emptyMsg: {
                mainMsg:'商品库暂无商品~',
                subMsg:'赶快去添加吧~'
            },
            goodsdepotlist:[]
        }
    },
    created() {
        // 从商品库获取商品列表
        this.getGoodsDepotList(this.keyword, this)
    },
    methods: {
        search(){
            // 从商品库获取商品列表
            this.getGoodsDepotList(this.keyword, this)
        },
        importFn(goods){
            localStorage.setItem('__goodsdepot', goods);
            this.$router.back();
        },
        // 从商品库获取商品列表
        getGoodsDepotList(keyword, vm){
            vm.$axios.get(vm.$api.goodsdepotlist,{params:{keyword: keyword}})
                .then(({data})=>{
                    vm.goodsdepotlist = data;
                    if (!data.length) {
                        vm.emptyMsg = {
                            mainMsg: '暂无<ins class="emb-red"> ' + keyword + ' </ins>搜索记录~',
                            subMsg: '换个关键词搜索吧~'
                        }
                    }
                })
        }
    }
}
</script>
