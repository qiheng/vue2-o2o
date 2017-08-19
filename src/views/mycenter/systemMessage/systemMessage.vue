<template>
        <!-- 数据区 -->
        <scroller
                  :on-infinite="infinite">
            <div class="msg-list mt10">
                <div class="slide-panel" v-for="(items,index) in ordersList" :key="items.messageId">
                    <div class="slide-panel-inner">
                        <div class="slide-panel-item">
                            <div class="container panel-item">
                                <div class="panel-inner">
                                    <i class="pull-left mr10" :class="items.messageType === '系统消息'?'i5-serverMsg':'i5-sysMsg' "></i>
                                    <i class="pull-left mr10"></i>
                                    <div class="panel-info f12">
                                        <div class="clearfix">
                                            <time class="pull-right lightgray time">
                                                {{items.ctime}}
                                            </time>
                                            <h2 class="panel-tit nowrap">
                                                {{items.messageType}}
                                            </h2>
                                        </div>

                                        <div class="lightgray">
                                            {{items.content}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </scroller>

</template>



<script>
//import { mapActions } from 'vuex'
//export default {
//    data() {
//        return {
//            ordersList:[],
//            loading: true,
//            noData: false,
//            params: {
//                page: 1,
//            },
//        }
//    },
//    created:function() {
//        this.scoreLog();
//    },
//    methods: {
//        scoreLog (bConcat, cb) {
//            if ($.isFunction(bConcat)) {
//                cb = bConcat;
//                bConcat = null;
//            }
//            !bConcat ? (this.loading = true) : '';
//                //this.$axios.post(this.$api.messagelist,$.param(this.params))
//            this.$axios.post(this.$api.messagelist,$.param(this.params))
//                .then(({data, status}) => {
//                    let ordersList = data;
//                    this.loading = false;
//                    // 返回空列表，表示无数据
//                    if (!ordersList.length) {
//                        this.noData = true
//                    }
//
//                    // 合并
//                    if (bConcat) {
//                        this.ordersList = this.ordersList.concat(ordersList)
//                    } else {
//                        this.ordersList = ordersList
//                    }
//
//                    this.$nextTick(function () {
//                        cb && cb(ordersList)
//                    })
//                })
//        },
//            // 上拉加载更多
//            infinite (done) {
//                clearTimeout(this.timeId);
//                if (this.noData) {
//                    setTimeout(() => {
//                        console.log('come over')
//                        done(true)
//                    }, 500)
//                    return;
//                }
//                this.timeId = setTimeout(() => {
//                    this.params.page++;
//                    this.scoreLog(true, () => {
//                        done()
//                    })
//
//                }, 1500)
//            },
//        }
//    }


import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            ordersList:[],
            loading: true,
            noData: false,
            recordLeg:'',
            params: {
                page: 1
            },
        }
    },
    // 页面初始化
    created:function(){
        this.scoreLog();
    },
    methods:{
        scoreLog (bConcat, cb) {
            var _this = this;

            if ($.isFunction(bConcat)) {
                cb = bConcat;
                bConcat = null;
            }
            !bConcat  ? (this.loading = true) : '';

            this.$axios.post(this.$api.messagelist ,$.param(this.params))
                .then(({data, status}) => {
                    let ordersList = data;
                    this.loading = false;
                    // 返回空列表，表示无数据
                    if (!ordersList.length) {
                        this.noData = true
                    }

                    // 合并
                    if (bConcat) {
                        this.ordersList = this.ordersList.concat(ordersList)
                    } else {
                        this.ordersList = ordersList
                    }

                    this.$nextTick(function () {
                        cb && cb(ordersList)
                    })
                })
        },
        infinite (done) {
            clearTimeout(this.timeId);
            if (this.noData) {
                setTimeout(() => {
                    console.log('come over')
                    done(true)
                }, 500)
                return;
            }
            this.timeId = setTimeout(() => {
                this.params.page++;

                this.scoreLog(true, () => {
                    done()
                })

            }, 1500)
        },
    }
}
</script>
<style>
</style>
