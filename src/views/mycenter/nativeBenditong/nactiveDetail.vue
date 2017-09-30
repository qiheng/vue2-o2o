<template>
    <div class="beiditong-detail" v-cloak>
        <!-- 本地通详情 start -->
        <div class="panel-nobrd ptb1000">
            <div class="panel-bd">
                <h1 class="f16">{{ infoview.title }}</h1>
                <p class="lightgray ptb5">{{ infoview.ctime }}</p>
            </div>
        </div>

        <div class="panel-nobrd bdtInfo-panel">
            <div v-if="infoview.author" class="panel-chunk">
                <span class="lightgray bdtInfo-tit">发布者</span>
                <span>{{ infoview.author }}</span>
            </div>
            <a href="tel:18615897614" class="panel-chunk">
                <img class="pull-right" width="19" src="../../../assets/images/icons-v3/icons1/icon_phone.png" alt=""/>
                <span class="lightgray bdtInfo-tit">联系人</span>
                <span>{{ infoview.linkman }} {{ infoview.phone }}</span>
            </a>
            <div class="panel-chunk">
                <span class="lightgray bdtInfo-tit">类型</span>
                <span>{{ infoview.infoCategoryName }}</span>
            </div>
            <div v-if="infoview.address" class="panel-chunk">
                <img class="pull-right" width="19" src="../../../assets/images/icons-v3/icons1/icon_adress.png" alt=""/>
                <span class="lightgray bdtInfo-tit">地址</span>
                <span>{{ infoview.address }}</span>
            </div>
        </div>

        <div class="panel-nobrd">
            <div class="panel-hd">
                详细信息
            </div>
            <div class="panel-bd content">
                {{ infoview.content }}
            </div>
        </div>
        <!-- 本地通详情 end -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                infoview: {}
            }
        },
        created: function () {
            var _this = this;
            const query = _this.query;
            // 获取本地通详情
            _this.$axios.get(_this.$api.infoview,{params:{'infoId': query.infoId}})
                .then(function (infoview) {
                    _this.infoview = infoview.data;
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

</style>
