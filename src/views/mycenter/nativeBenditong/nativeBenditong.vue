<template>
    <div>
        <scroller lock-x height="100vh" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="20">
            <div>
                <div class="slide-panel" v-for="item in infolist">
                    <div class="slide-panel-inner">
                        <div class="slide-panel-item">
                            <div class="container panel-item">
                                <!--<a href="nactive-detail.html?infoId=<%- data.infoId %>" class="block panel-inner">-->
                                <a href="nactive-detail.html>" class="block panel-inner">
                                    <p class="panel-pic">
                                        <img width="72" height="72" :src="item.pic" alt="">
                                    </p>
                                    <div class="panel-info f12">
                                        <div class="panel-tit">
                                            {{ item.title }}
                                        </div>
                                        <div class="clearfix">
                                            <span class="pull-right lightgray time">{{ item.ctime }}</span>
                                            <span class="emb-red">{{ item.infoCategoryName }}</span>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>
                        <a class="slide-panel-item center side-del-btn" href="javascript:;">删除</a>
                    </div>
                </div>
                <load-more tip="loading"></load-more>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'
    export default {
        components: {
            Scroller,
            Divider,
            Spinner,
            XButton,
            Group,
            Cell,
            LoadMore
        },
        data() {
            return {
                showList1: true,
                scrollTop: 0,
                onFetching: false,
                bottomCount: 20,


                infolist:[],
                noData: false,
                params: {
                    page: 1
                },
            }
        },
        created(){
          this.sub();
        },
        methods:{
            sub(){
                var _this = this;
                _this.$axios.get(_this.$api.infolist)
                    .then(function (infolist) {
                        _this.infolist = infolist.data;
                        if (!infolist.length) {
                            _this.noData = true;
                        }
                        console.log(_this.infolist,'5644444444444444444444');
                    })
            },
            onScrollBottom () {
                if (this.onFetching) {
                    // do nothing
                } else {
                    this.onFetching = true
                    setTimeout(() => {
                        this.bottomCount += 10
                        this.$nextTick(() => {
                            this.$refs.scrollerBottom.reset()
                        })
                        this.onFetching = false
                    }, 2000)
                }
            },
            onScroll (pos) {
                this.scrollTop = pos.top
            },
            onCellClick () {
                window.alert('cell click')
            },
            onClickButton () {
                window.alert('click')
            },
            changeList () {
                this.showList1 = false
                this.$nextTick(() => {
                    this.$refs.scroller.reset({
                        top: 0
                    })
                })
            }
        }
    }
</script>

<style>
</style>
