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
        <div v-if="moneyLogs.length" class="panel panel-moneyloglist">
            <div v-for="moneyLog in moneyLogs" class="panel-chunk f16">
                <p class="gray">{{ moneyLog.typeName }}</p>
                <p class="mt5 lightgray f12">{{ moneyLog.ctime }}</p>
                <span :class="[(moneyLog.change || '').indexOf('-') != -1 ? 'gray' : 'limegreen', 'pos-rt-middle']">{{ moneyLog.change }}</span>
            </div>
        </div>
        <empty v-else :msg="emptyMsg">
            <img slot="icon" width="180" src="images/empty/img_wumx@2x.png" alt="" />
        </empty>
    </div>
    <!-- 钱包明细 end -->
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            _loadMore: null,
            emptyMsg: {
                mainMsg: '暂无明细记录'
            },
            moneyLogs: [],
            param: {
                page: 1,
                type: 0
            }

        }
    },
    created() {
        this.getMoneyLogList()
    },
    methods: {
        getMoneyLogList: function (bConcat, cb) {
            var _this = this;

            if ($.isFunction(bConcat)) {
                cb = bConcat;
                bConcat = false;
            }
            let param = qs.stringify(_this.param);
            // 初始化页面
            this.$axios.get(this.$api.moneyloglist + '?' + param)
                .then(res => {
                    this.moneyLogs = res.data
                })
        },
        
    }
}

</script>