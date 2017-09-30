<template>
    <div class="viewbox-container native-bao">
        <div class="headerSearch">
            <!-- 导顶部导航 start -->
            <div class="header nav-header-search">
                <router-link :to="{name:'search',query:{'t':5}}" class="bfc-panel">
                    <i class="btn icos-sprite search-btn pull-right"></i>
                    <div class="header-search">
                        <p class="search-key lightgray pl10">输入搜索关键词</p>
                    </div>
                </router-link>
            </div>
            <!-- 导顶部导航 end -->

            <tabSlide v-model="value">
                <slideNav ref="slideNav" v-model="slideNavIndex" :slideChooseCb="slideChooseCbFn">
                    <slide-nav-item v-for="(item, idx) in categorys" :id="idx">{{ item.name }}</slide-nav-item>
                </slideNav>
            </tabSlide>
        </div>

        <div class="viewbox native-tong-bd">
            <div class="native-tong-list" v-if="infolist.length">
                <scroller
                    :on-infinite="infinite">
                    <div class="panel">
                        <div class="slide-panel" v-for="(item, index) in infolist">
                            <div class="slide-panel-inner">
                                <div class="slide-panel-item">
                                    <div class="container panel-item">
                                        <router-link :to="{name:'nactiveDetail',query:{'infoId':item.infoId}}" class="block panel-inner">
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
                                        </router-link>
                                    </div>
                                </div>
                                <a class="slide-panel-item center side-del-btn" href="javascript:;">删除</a>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>

            <empty v-else :msg="emptyMsg" style="margin-top: 95px">
                <img slot="icon" width="120px" height="120px" class="empty-tips-panel" src="../../../assets/images/no-data.png" alt=""/>
            </empty>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                value: false,
                itemid:'',
                slideNavIndex: 0,
                infolist:[],
                categorys:[],
                loading: true,
                emptyMsg: {
                    mainMsg:'暂无记录~',
                },
                noData: false,
                recordLeg:'',
                shopClassId:'',
                infoCategoryId:'',
                params: {
                    infoCategoryId:'',
                    page: 1
                },
            }
        },
        // 页面初始化
        created:function(){
            var _this = this;
            const query = _this.query;
            this.itemid = query.shopClassId;
            this.infoCategoryId = query.infoCategoryId;
            this.scoreLog();
            this.category();
        },
        methods:{
            slideChooseCbFn: function (newVal, oldVal) {
                var category = this.categorys[newVal]
                this.params.infoCategoryId = category.infoCategoryId;
                this.params.page = 1;
                this.scoreLog()
            },
            // 初始化分类
            category () {
                this.$axios.get(this.$api.infocategorylist, {params:{'shopClassId': this.shopClassId}})
                    .then(({data, status, msg}) => {

                        if (status === 1) {
                            this.categorys = data;
                            this.categorys.unshift({
                                infoCategoryId: '',
                                name: '全部'
                            })

                            this.$nextTick(() => {
                                this.slideNav.slideSetup();
                            })

                        } else {
                            // fail
                        }
                    })
            },
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

        },
        computed: {
            query() {
                return this.$route.query
            },
            slideNav: function () {
                return this.$refs.slideNav;
            },
        },
        watch: {

        }
    }
</script>

<style lang="less" scoped>
    .headerSearch{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 5;
    }

    .viewbox {
        padding-top: 89px;
    }

    .native-tong-list {
        height: 100%;
        position: relative;

        .slide-panel {
            margin-bottom: -1px;
        }

        .panel-tit {
            display: -webkit-box;
            height: 45px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            margin-bottom: 5px;
            overflow: hidden;
        }

        .panel-tit {
            display: -webkit-box;
            height: 45px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            margin-bottom: 5px;
            overflow: hidden;
        }

    }


</style>
