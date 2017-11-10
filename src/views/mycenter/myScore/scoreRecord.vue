<template>
    <!-- 积分记录 start -->
    <div class="score-record">
        <scroller
            :on-infinite="infinite">
            <div class="panel">
                <!-- 数据区 -->
                <div class="f32 panel-chunk" v-for="(scoreRe,index) in ordersList">
                    <h3>{{scoreRe.summary}}</h3>
                    <p class="f28 lightgray mt5">{{scoreRe.ctime}}</p>
                    <ins class="pos-rt-middle limegreen">{{scoreRe.change}}</ins>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
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

                this.$axios.post(this.$api.scorelog,$.param(this.params))
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
