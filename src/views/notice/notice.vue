<template>
    <!-- 公告列表 start -->
    <div class="notices-list">
        <loading v-show="loading"></loading>
        <template v-if="!loading">
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
                _loadMore: null,
                emptyMsg: {
                    mainMsg: '暂无信息~'
                },
            }
        },
        mounted () {

            console.log('===========this.$route==========',this.$route)
            console.log('===========this.$router==========',this.$router)

            // 初始化信息列表
            this.getNoticeList();
        },
        methods: {
            // 信息列表
            getNoticeList: function (bConcat, cb) {
                var _this = this;

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = false;
                }

                !_this._loadMore && (_this.loading = true);

                // 信息列表
                _this.loading = true;
                this.$axios.get(this.$api.noticelist, {params: _this.params})
                    .then(({data, status}) => {

                        let noticeList = data;
                        _this.loading = false;

                        // 合并
                        if (bConcat) {
                            _this.noticeList = _this.noticeList.concat(noticeList);
                        } else {
                            _this.noticeList = noticeList
                        }

                        _this.$nextTick(function () {
                            // loadDown
                            if (!_this._loadMore) {
                                _this._loadMore = _this.loadMore();
                            }

                            _this._loadMore && _this._loadMore.update();

                            cb && cb(noticeList)
                        })

                })
                .catch(e => {
                    _this.loading = false;
                })

            },
            // 滚动底部加载
            loadMore: function() {
                /*var _this = this;

                return $('body').loadMore({
                    scrollArea : window,
                    loadDownFn: function (me) {
                        var data;
                        // 初始化全部促销分类商品
                        _this.param.page++;
                        _this.getNoticeList(true, function (noticeList) {

                            if (!noticeList.length) {
                                me.noData();
                            }
                            me.refresh();

                        });
                    }
                }).data('load-more');*/
            }
        }
    }
</script>
