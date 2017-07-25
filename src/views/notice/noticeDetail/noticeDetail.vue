<template>
    <!-- 公告详情 start -->
    <div class="notice-detail">
        <div class="container">
            <div class="mb10">
                <h2 class="text-center f16">{{ notice.title }}</h2>
                <p class="text-right lightgray f12">{{ notice.ctime | timeFormat }}</p>
            </div>
            <div class="notice-txt">
                <div class="mb20" v-html="notice.content"></div>
            </div>
        </div>
    </div>
    <!-- 公告详情 end -->

</template>

<script>
    export default {
        data () {
            return {
                notice: {},
                params: {
                    noticeId: this.$route.params.noticeId
                }
            }
        },
        mounted () {
            var _this = this;

            // 页面加载效果
            //loadPage.pageload();

            // 渲染信息详情
            this.$axios.get(this.$api.getnotice, {params: this.params}).then(({data, status}) => {
                let notice = data;

                //loadPage.unpageload();

                if (notice) {
                    _this.notice = notice;
                }

            });
        }
    }
</script>

<style scoped lang="scss">
    .notice-txt {
        overflow: hidden;

        img {
            width: 100% !important;
        }
    }
</style>
