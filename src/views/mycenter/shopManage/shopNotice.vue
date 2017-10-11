<template>
    <div>
        <!-- 店铺动态列表 start -->
        <div class="shop-notices-list" v-cloak>
            <div class="panel">
                <template v-if="noticesList.length">
                    <router-link v-for="(noticeItem, index) in noticesList" :key="noticeItem.shopNoticeId" :to="{name:'shopNoticeInfo',query:{shopNoticeId:noticeItem.shopNoticeId}}">
                        <div class="panel-chunk">
                            <h2 class="f16">{{ noticeItem.title }}</h2>
                            <div class="mt5 clearfix">
                                <time class="pull-left mt5 lightgray">{{ noticeItem.ctime }}</time>
                                <!-- 根据不同页面来源 是否显示该区块 -->
                                <p v-if="query.type != 'list'" class="pull-right handler-btns">
                                    <span @click.prevent="editFn(index)" class="btn btn-primary">编辑</span>
                                    <span @click.prevent="delFn(index)" class="btn btn-default">删除</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </template>
                <empty v-else :msg="emptyMsg"></empty>
            </div>
            <!-- 添加 -->
            <div v-if="query.type != 'list'" class="fixed-footer">
                <router-link :to="{name:'shopNoticeDetail'}">
                    <span class="btn btn-block btn-primary">添加</span>
                </router-link>
            </div>
        </div>
        <!-- 店铺动态列表 end -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    data() {
        return {
            emptyMsg: {
                mainMsg: '当前页暂无店铺动态~'
            },
            param: {
                shopId: '',
                page: 1,
            },
            noticesList: []
        }
    },
    beforeRouteEnter(to, form, next) {
        next(vm => {
            vm.getNoticesList()
        })
    },
    created() {
        this.param.shopId = this.shopInfo.shop.shopId
        this.getNoticesList()
    },
    methods: {
        getNoticesList() {
            this.$axios.get(this.$api.shopnoticelist, { params: this.param })
                .then(({ msg, data, state }) => {
                    this.noticesList = data
                }).catch(({ msg, data, state }) => { })
        },
        editFn(index) {
            let shopNoticeId = this.noticesList[index].shopNoticeId;
            this.$router.push({ path: 'shopNoticeDetail', query: { shopNoticeId: shopNoticeId, type: 'edit' } })
        },
        delFn(index) {
            let that = this;
            this.$vux.confirm.show({
                content: '是否确定要删除当前记录',
                onConfirm() {
                    that.$axios.post(that.$api.delshopnotice, $.param({ shopNoticeId: that.noticesList[index].shopNoticeId }))
                        .then(({ msg }) => {
                            that.$vux.toast.show({
                                text: msg,
                                onHide() {
                                    that.noticesList.splice(index, 1)
                                }
                            })
                        })
                }
            })
        }
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
    .panel-chunk{
        border-top: 1px solid #e5e5e5 !important;
    }
</style>
