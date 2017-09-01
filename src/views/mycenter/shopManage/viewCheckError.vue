<template>
    <!-- 查看投诉 start -->
    <div class="check-error" v-cloak>
        <div class="check-error-info">
            <ins class="num">{{ errorInfo.todayCount }}</ins>
            <span>今日新增投诉</span>
        </div>
        <div class="panel">
            <div class="p10 bg-gray lightgray">
                {{errorInfo.list.length}}
                投诉列表（{{errorInfo.list.length}}）
            </div>
            <!--<loading v-show="loading"></loading>-->
            <template v-if="errorInfo.list.length">
                <div v-for="(errorItem, index) in errorInfo.list" class="panel-chunk">
                    <span class="pull-right lightgray">{{ errorItem.username }}</span>
                    <span>{{ errorItem.content }}</span>
                </div>
            </template>
            <empty v-else :msg="emptyMsg"></empty>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
//                loading:true,
                emptyMsg: {'mainMsg':'暂无数据~'},
                errorInfo: {
                    list: []
                }
            }
        },
        mounted: function() {
            var _this = this;

            // 初始化查看投诉
            this.$axios.get(this.$api.manageSeterrorlist)
            .then(function (errorInfo) {
//                _this.loading = false;
                _this.errorInfo = errorInfo.data;
            });
        }
    }
</script>

<style>
    .check-error-info {
        padding: 30px 10px;
        background: #e62b3d url(../../../assets/images/icons-v3/img_ts_bg.png) no-repeat 50% 100%;
        background-size: cover;
        color: #fff;
    }

    .check-error-info .num {
        margin-right: 20px;
        font-size: 60px;
    }
</style>
