<template>
    <div class="comment-wrap" v-cloak>
        <!-- 整体评价 start -->
        <div class="global-comment table-type">
            <!-- 整体评价 start -->
            <div class="tbl-cell-mid text-center col-lt">
                <span class="global-score">{{ query.score | toFixed(1) }}</span>
                <p class="gray">综合评分</p>
            </div>
            <div class="tbl-cell-mid col-rt">
                <p>质量<i :class="'ml10 star2 star-' + Math.round( shopCommen.avgScore01 )"></i></p>
                <p class="mt5">速度<i :class="'ml10 star2 star-' + Math.round( shopCommen.avgScore02 )"></i></p>
                <p class="mt5">服务<i :class="'ml10 star2 star-' + Math.round( shopCommen.avgScore03 )"></i></p>
                <p class="mt5">态度<i :class="'ml10 star2 star-' + Math.round( shopCommen.avgScore04 )"></i></p>
            </div>
            <!-- 整体评价 end -->
        </div>
        <!-- 整体评价 end -->

        <!-- 用户评价 start -->
        <div class="panel comment-panel">
            <div class="f12 comment-con">
                <div class="user-info-panel">
                    <template v-if="shopCommen.commentlist.length">
                        <div v-for="(shopCommenItem, index) in shopCommen.commentlist" class="panel-chunk user-info">
                            <img class="pull-left user-header" width="35" height="35" :src="shopCommenItem.headpic" alt="" />

                            <div class="bfc-panel">
                                <div class="clearfix f12">
                                    <span class="pull-right lightgray">{{ shopCommenItem.ctime }}</span>
                                    <span class="dib nowrap user-name">{{ shopCommenItem.username }}</span>
                                </div>
                                <i :class="'star2 star-'+Math.round(shopCommenItem.score)"></i>
                                <p class="mt5">{{ shopCommenItem.content }}</p>
                                <div class="zan-list" v-if="shopCommenItem.orderDetailList && shopCommenItem.orderDetailList.length">
                                    <i class="i-zan i-zan-on"></i>
                                    <span v-for="goodsItem in shopCommenItem.orderDetailList" class="i-label-default">{{ goodsItem.goodsName }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <empty v-else :msg="emptyMsg"></empty>
                    <!-- 用户评价 end -->
                </div>
            </div>
        </div>
        <!-- 用户评价 end -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                emptyMsg:{
                    mainMsg:'暂无数据~'
                },
                shopId:'',
                score:'',
                shopCommen: {
                    commentlist:[]
                }
            }
        },
        created() {
            var query = this.query;
            this.score = query.score;
            this.shopId = query.shopId;
            this.$axios.get(this.$api.shopcommentlist,{params:{shopId: query.shopId}})
                .then(({data})=>{
                    this.shopCommen.commentlist = data;
                })
        },
        computed: {
            query() {
                return this.$route.query
            }
        }
    }
</script>

<style>
    .zan-list .i-label-default {
        vertical-align: middle;
        margin-top: 8px;
        margin-left: 5px;
    }
</style>
