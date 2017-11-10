<template>
    <!-- 店铺动态列表 start -->
    <div class="shop-notices-detail">
        <dl class="panel-bd">
            <dt class="pb10">
                <h2>{{ noticeDetail.title }}</h2>
                <time class="lightgray">{{ noticeDetail.ctime }}</time>
            </dt>

            <dd class="gray f12">
                {{ noticeDetail.content }}
            </dd>
        </dl>
    </div>
    <!-- 店铺动态列表 end -->
</template>

<script>
export default {
    data() {
        return {
            noticeDetail: [],
            shopNoticeId: '',
        }
    },
    deactivated() {
        this.$destroy(true)
    },
    created() {
        this.$axios.get(this.$api.getshopnotice, { params: { shopNoticeId: this.query.shopNoticeId } })
            .then(({ data }) => {
                this.noticeDetail = data;
            });
    },
    computed: {
        query() {
            return this.$route.query;
        }
    }
}
</script>
