<template>
    <div class="logistics-manage-wrap">
        <div class="panel logistics-manage-list">
            <div v-for="(logisticItem, index) in logisticList" class="panel-chunk">
                <p class="pull-right">
                    <router-link
                        :to="{name:'addUpdateLogistics',query:{'type':'edit','name':logisticItem.name,'price':logisticItem.price,'logisticsId':logisticItem.logisticsId}}" class="btn btn-primary">修改</router-link>
                    <a @click.prevent="del(index, logisticItem.logisticsId)" href="javascript:;" class="btn btn-default">删除</a>
                </p>
                <span>{{ logisticItem.name }}</span>
                <span class="lightgray ml10">运费：{{ logisticItem.price }}元</span>
            </div>
            <!--<empty v-else :msg="emptyMsg"></empty>-->

        </div>

        <div class="container mt30">
            <router-link class="btn btn-lg btn-block btn-primary" :to="{name:'addUpdateLogistics',query:{'type':'add'}}">添加</router-link>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                emptyMsg: {
                    mainMsg: '暂无数据~'
                },
                //shopId:'f898cbc15c344cf7015c428a8b460091',
                show:false,
                logisticList: []
            }
        },
        created: function () {
            var _this = this;

            // 物流数据
            _this.$axios.get(_this.$api.logisticslist,{params:{shopId: this.$route.query.shopId}})
                .then(function (logisticList) {
                    _this.logisticList = logisticList.data;
                    console.log(logisticList,'46555655466666666666666666666666666666666666666666666')
                })
        },
        methods: {
            // 删除物流
            del: function (index, logisticsId) {
                var _this = this;
                // 删除询问
//                layer.open({
//                    title: '温馨提示',
//                    shift: 1,
//                    content:'您确定要删除吗？',
//                    btn: ['确定', '取消'],
//                    yes: function (idx, layerEl) {
//                        layer.close(idx);
//
//                        // ajax 提交数据
                        _this.$axios.get(_this.$api.deletelogistics,{params:{logisticsId: logisticsId}})
                            .then(function () {
//                                layer.msg('删除成功', function () {
                                    _this.logisticList.splice(index, 1)
//                                })
                            })
//                    }
//                });
            }
        }
    }
</script>

<style>
    .logistics-manage-list .btn {padding: 5px 15px; margin-left: 10px; font-size: .86rem}
    .logistics-manage-list .panel-chunk {line-height: 30px;}
</style>
