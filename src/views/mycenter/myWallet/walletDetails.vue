<template>
    <!-- 钱包明细 start -->
    <div class="walle-detail-wrap" v-cloak>
        <!-- tap -->
        <!--<div class="panel tap-meun-nav">
                                            <nav class="mod-box tap-panel tab-panel-primary">
                                                <a data-type="0" class="box-flex tap-meun tap-meun-on" href="javascript:;">全部</a>
                                                <a data-type="1" class="box-flex tap-meun" href="javasript:;">收入</a>
                                                <a data-type="2" class="box-flex tap-meun" href="javasript:;">支出</a>
                                            </nav>
                                        </div>-->
        <!--<div class="ptb15 text-center orange f18">金额变动明细</div>-->
        <scroller
            :on-infinite="infinite">
            <div v-if="ordersList.length" class="panel panel-moneyloglist">
                <div v-for="moneyLog in ordersList" class="panel-chunk f16">
                    <p class="gray">{{ moneyLog.typeName }}</p>
                    <p class="mt5 lightgray f12">{{ moneyLog.ctime }}</p>
                    <span :class="[(moneyLog.change || '').indexOf('-') != -1 ? 'gray' : 'limegreen', 'pos-rt-middle']">{{ moneyLog.change }}</span>
                </div>
            </div>
            <empty v-else :msg="emptyMsg">
                <img slot="icon" width="180" src="images/empty/img_wumx@2x.png" alt="" />
            </empty>
        </scroller>
    </div>
    <!-- 钱包明细 end -->
</template>
<script>
//import qs from 'qs'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            _loadMore: null,
            emptyMsg: {
                mainMsg: '暂无明细记录'
            },
            ordersList: [],
            loading: true,
            noData: false,
            params: {
                page: 1,
            }

        }
    },
    created() {
        this.scoreLog();
    },
    methods: {

        scoreLog (bConcat, cb) {
            if ($.isFunction(bConcat)) {
                cb = bConcat;
                bConcat = null;
            }
            !bConcat  ? (this.loading = true) : '';

            this.$axios.post(this.$api.moneyloglist,$.param(this.params))
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
