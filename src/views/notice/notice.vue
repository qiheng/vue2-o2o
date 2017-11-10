<template>
    <!-- 公告列表 start -->
    <scroller
        :on-infinite="infinite">
        <div class="notices-list panel">
            <!--<loading v-show="loading"></loading>-->
            <template>
                <template v-if="noticeList.length">
                    <div v-for="notice in noticeList" class="container panel-item">
                        <div class="panel-inner">
                            <router-link :to="{name: 'noticeDetail', params: {noticeId: notice.noticeId}}">
                                <ins class="time">{{ notice.ctime | timeFormat }}</ins>
                                <h2 class="panel-tit">{{ notice.title }}</h2>
                                <div class="lightgray"><div class="nowrap">{{ notice.content }}</div></div>
                            </router-link>
                         </div>
                    </div>
                </template>
                <empty v-else :msg="emptyMsg"></empty>
            </template>
        </div>
        <!-- 公告列表 end -->
    </scroller>
</template>


<script>

    export default {
        data () {
            return {
                noticeList: [],
                params: {
                    page: 1,
                    type: (this.$route.type != undefined ? this.$route.type : 0)
                },
                loading: true,
                noData: false,
                emptyMsg: {
                    mainMsg: '暂无信息~'
                },
            }
        },
        mounted () {
            // 初始化信息列表
            this.getNoticeList();
        },
        methods: {
            // 信息列表
            getNoticeList(bConcat, cb) {
                var _this = this;

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = false;
                }
                !bConcat  ? (this.loading = true) : '';

                // 信息列表
                this.$axios.get(this.$api.noticelist, {params: _this.params})
                    .then(({data, status}) => {

                        let noticeList = data;
                        _this.loading = false;

                        // 返回空列表，表示无数据
                        if (!noticeList.length) {
                            this.noData = true
                        }
                        // 合并
                        if (bConcat) {
                            _this.noticeList = _this.noticeList.concat(noticeList);
                        } else {
                            _this.noticeList = noticeList
                        }

                        _this.$nextTick(function () {
                            cb && cb(noticeList)
                        })

                })
                .catch(e => {
                    _this.loading = false;
                })

            },
            // 滚动底部加载
            infinite (done) {
                clearTimeout(this.timeId);
                if (this.noData) {
                    setTimeout(() => {
                        done(true)
                    }, 500)
                    return;
                }
                this.timeId = setTimeout(() => {
                    this.params.page++;

                    this.getNoticeList(true, () => {
                        done()
                    })

                }, 1500)
            },
        }
    }
</script>
