<template>
    <div class="msg-list mt10" v-cloak>
        <!-- 数据区 -->
        <scroller
                  :on-refresh="infinite"
                  :on-infinite="infinite">
            <div class="slide-panel" v-for="(items,index) in systemList" :key="items.messageId">
                <div class="slide-panel-inner">
                    <div class="slide-panel-item">
                        <div class="container panel-item">
                            <div class="panel-inner">
                                <i class="pull-left mr10" :class="items.messageType === '系统消息'?'i5-serverMsg':'i5-sysMsg' "></i>
                                <i class="pull-left mr10"></i>
                                <div class="panel-info f12">
                                    <div class="clearfix">
                                        <time class="pull-right lightgray time">
                                            {{items.ctime}}
                                        </time>
                                        <h2 class="panel-tit nowrap">
                                            {{items.messageType}}
                                        </h2>
                                    </div>

                                    <div class="lightgray">
                                        {{items.content}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="slide-panel-item center side-del-btn" href="javascript:;">删除</a>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            systemList: [],
            timeId: null,
            _loadMore: null,
            noData: false,
            timeId:null,
            index:-1,
        }
    },
    created() {
        this.messagelist();
    },
    methods: {
        messagelist:function () {
            this.$axios.get(this.$api.messagelist)
                .then((data, state) => {
                    this.systemList = data.data;
                    this.index = this.systemList.length;
                    console.log(this.index,'++++++++++++++++++++++++++++');
                    console.log(data.data)
                    // 返回空列表，表示无数据
                    if (this.systemList.length) {
                        this.index = this.systemList.length;
                    }
                });
        },
        // 上拉加载更多
        infinite (done) {
            clearTimeout(this.timeId);
            if (this.index) {
                setTimeout(() => {
                    console.log('come over')
                    done(true)
                }, 500)
               //  return;
            }

            this.timeId = setTimeout(() => {
                this.messagelist(true, () => {
                    done()
                })
            }, 1500)

        },
    }
}
</script>
