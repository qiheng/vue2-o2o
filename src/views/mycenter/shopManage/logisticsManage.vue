<template>
    <div class="logistics-manage-wrap">
        <div class="panel logistics-manage-list">
            <div v-for="(logisticItem, index) in logisticList" class="panel-chunk" :key="logisticItem.id">
                <p class="pull-right">
                    <router-link :to="{name:'addUpdateLogistics',query:{'type':'edit','name':logisticItem.name,'price':logisticItem.price,'logisticsId':logisticItem.logisticsId}}" class="btn btn-primary">修改</router-link>
                    <a @click.prevent="delFn(index, logisticItem.logisticsId)" href="javascript:;" class="btn btn-default">删除</a>
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
import { mapGetters } from 'vuex'
import { Toast, Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
    directives: {
        TransferDom
    },
    components: {
        Confirm,
        Toast
    },
    data() {
        return {
            emptyMsg: {
                mainMsg: '暂无数据~'
            },
            shopId: '',
            logisticList: []
        }
    },
    beforeRouteEnter(to, form, next) {
        next(vm => {
            vm.getLogisticslist()
        })
    },
    created() {
        this.getLogisticslist();
    },
    methods: {
        getLogisticslist() {
            const query = this.query;
            this.shopId = this.query.shopId;
            // 物流数据
            this.$axios.get(this.$api.logisticslist, { params: { shopId: this.shopInfo.shop.shopId } })
                .then(({ data }) => {
                    this.logisticList = data;
                })
        },
        delFn(index, logisticsId) {
            let that = this;
            this.$vux.confirm.show({
                content: '是否确定要删除当前记录',
                onConfirm() {
                    that.$axios.post(that.$api.deletelogistics, $.param({ logisticsId: logisticsId }))
                        .then(({ msg }) => {
                            that.$vux.toast.show({
                                text: msg,
                                onHide() {
                                    that.logisticList.splice(index, 1)
                                }
                            })
                        })
                }
            })
        },
    },
    computed: {
        ...mapGetters(['shopInfo']),
        query() {
            return this.$route.query;
        }
    }
}
</script>

<style scoped>
.logistics-manage-list .btn {
    padding: 5px 15px;
    margin-left: 10px;
    font-size: .86rem
}

.logistics-manage-list .panel-chunk {
    line-height: 30px;
}
</style>
