<template>
    <div class="logistics-wrap" v-cloak>
        <div class="panel panel-list">
            <div v-for="(logisticItem, index) in logisticList" class="panel-chunk J-radio">
                <h2 class="f16">{{ logisticItem.name }}</h2>
                <p class="lightgray mt5">运费：{{ logisticItem.price }}元</p>
                <i class="i-radio pos-rt-middle" :class="{checked: orderParam.logisticsId == logisticItem.logisticsId}" :data-index="index"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import {setRadio,utils} from '@/assets/js/common'
    import * as types from '@/store/mutation-types'
    export default {
        data() {
            return {
                shopId: '',
                logisticList: [],
                orderParams: {
                    logisticsId:''
                }
            }
        },
        created() {
            var __orderParam = JSON.parse(localStorage.getItem('__orderParam')) || {};
            // 获取本地提交订单需要的参数缓存
            this.orderParams = __orderParam;
            // 物流列表
            this.$axios.get(this.$api.logisticslist,{params:{shopId:this.orderParam.shopId}})
                .then(({data})=>{
                    this.logisticList = data;
                    this.$nextTick(function () {
                        bindEvent (this)
                    })
                });
        },
        methods:{
            ...mapMutations([types.UPDATE_ORDER_PARAM]),
        },
        computed:{
            ...mapGetters(['orderParam']),
            query(){
                return this.$route.query;
            }
        }
    }
    // 注册事件
    function bindEvent (_this) {

        // 设为默认地址
        setRadio(function (status) {
            var $radio = $(this),
                _index = $radio.data('index');
            if (status) {
                _this.$set(_this.orderParams, 'logisticsId', _this.logisticList[_index].logisticsId);
                _this.$set(_this.orderParams, 'logisticsName', _this.logisticList[_index].name);

                console.log($radio,'9999999999999999999999999999990');
                // 更新订单参数
                _this[types.UPDATE_ORDER_PARAM]({
                    logisticsId: _this.logisticList[_index].logisticsId,
                    logisticsName: _this.logisticList[_index].name,
                })
                _this.$router.back();
            };

        }, null, true)

    }
</script>

<style>

</style>
