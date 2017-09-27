<template>
    <div >
        <scroller
            :on-infinite="infinite">
            <div class="panel">
                <div class="slide-panel" v-for="item in infolist">
                    <div class="slide-panel-inner">
                        <div class="slide-panel-item">
                            <div class="container panel-item">
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
            </div>
        </scroller>
    </div>
</template>

<!--<script>-->
    <!--import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'-->
    <!--export default {-->
        <!--components: {-->
            <!--Scroller,-->
            <!--Divider,-->
            <!--Spinner,-->
            <!--XButton,-->
            <!--Group,-->
            <!--Cell,-->
            <!--LoadMore-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--showList1: true,-->
                <!--scrollTop: 0,-->
                <!--onFetching: false,-->
                <!--bottomCount: 20,-->


                <!--infolist:[],-->
                <!--noData: false,-->
                <!--params: {-->
                    <!--page: 1-->
                <!--},-->
            <!--}-->
        <!--},-->
        <!--created(){-->
          <!--this.sub();-->
        <!--},-->
        <!--methods:{-->
            <!--sub(){-->
                <!--var _this = this;-->
                <!--_this.$axios.get(_this.$api.infolist)-->
                    <!--.then(function (infolist) {-->
                        <!--_this.infolist = infolist.data;-->
                        <!--if (!infolist.length) {-->
                            <!--_this.noData = true;-->
                        <!--}-->
                        <!--console.log(_this.infolist,'5644444444444444444444');-->
                    <!--})-->
            <!--},-->
            <!--onScrollBottom () {-->
                <!--if (this.onFetching) {-->
                    <!--// do nothing-->
                <!--} else {-->
                    <!--this.onFetching = true-->
                    <!--setTimeout(() => {-->
                        <!--this.bottomCount += 10-->
                        <!--this.$nextTick(() => {-->
                            <!--this.$refs.scrollerBottom.reset()-->
                        <!--})-->
                        <!--this.onFetching = false-->
                    <!--}, 2000)-->
                <!--}-->
            <!--},-->
            <!--onScroll (pos) {-->
                <!--this.scrollTop = pos.top-->
            <!--},-->
            <!--onCellClick () {-->
                <!--window.alert('cell click')-->
            <!--},-->
            <!--onClickButton () {-->
                <!--window.alert('click')-->
            <!--},-->
            <!--changeList () {-->
                <!--this.showList1 = false-->
                <!--this.$nextTick(() => {-->
                    <!--this.$refs.scroller.reset({-->
                        <!--top: 0-->
                    <!--})-->
                <!--})-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style>-->
<!--</style>-->



<!--<template>-->
    <!--&lt;!&ndash; 积分记录 start &ndash;&gt;-->
    <!--<div class="score-record">-->
        <!--<scroller-->
            <!--:on-infinite="infinite">-->
            <!--<div class="panel">-->
                <!--&lt;!&ndash; 数据区 &ndash;&gt;-->
                <!--<div class="f16 panel-chunk" v-for="(scoreRe,index) in infolist">-->
                    <!--<h3>{{scoreRe.summary}}</h3>-->
                    <!--<p class="f14 lightgray mt5">{{scoreRe.ctime}}</p>-->
                    <!--<ins class="pos-rt-middle limegreen">{{scoreRe.change}}</ins>-->
                <!--</div>-->
            <!--</div>-->
        <!--</scroller>-->
    <!--</div>-->
<!--</template>-->
<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                infolist:[],
                loading: true,
                noData: false,
                recordLeg:'',
                params: {
                    page: 1
                },
            }
        },
        // 页面初始化
        created:function(){
            this.scoreLog();
        },
        methods:{
            scoreLog (bConcat, cb) {
                var _this = this;

                if ($.isFunction(bConcat)) {
                    cb = bConcat;
                    bConcat = null;
                }
                !bConcat  ? (this.loading = true) : '';

                this.$axios.post(this.$api.infolist,$.param(this.params))
                    .then(({data, status}) => {
                        let infolist = data;
                        this.loading = false;
                        // 返回空列表，表示无数据
                        if (!infolist.length) {
                            this.noData = true
                        }

                        // 合并
                        if (bConcat) {
                            this.infolist = this.infolist.concat(infolist)
                        } else {
                            this.infolist = infolist
                        }

                        this.$nextTick(function () {
                            cb && cb(infolist)
                        })
                    })
            },
            infinite (done) {
                clearTimeout(this.timeId);
                if (this.noData) {
                    setTimeout(() => {
                        console.log('come over')
                        done(true)
                    }, 500)
                    return;
                }
                this.timeId = setTimeout(() => {
                    this.params.page++;

                    this.scoreLog(true, () => {
                        done()
                    })

                }, 1500)
            },
        }
    }
</script>

<style>

</style>
