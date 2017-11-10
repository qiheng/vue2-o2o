<template>
    <div class="viewbox-container">
        <!-- 头部分类信息筛选 -->
        <div class="server-mansge fm">
            <div class="category-list fm-group mb10 none-Tborder">
                <div class="panel none-Tborder">
                    <ul class="mod-box text-center tap-panel">
                        <li class="box-flex tap-meun">
                            <div class="self-slt">
                                <select class="slt slt1" name="type" v-model="param.status" @change="changeTypeFn($event)">
                                    <option v-for="option in allType" v-bind:value="option.value" :key="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                            </div>
                        </li>
                        <li class="box-flex tap-meun">
                            <div class="self-slt">
                                <select class="slt slt2" name="category" v-model="param.goodsCategoryId" @change="changeCategoryFn($event)">
                                    <option v-for="option in goodsCategory" v-bind:value="option.goodsCategoryId" :key="option.value">
                                        {{option.name}}
                                    </option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="viewbox">
            <div class="viewlist">
                <!-- 商品数据列表 -->
                <scroller :on-infinite="infinite">
                    <div class="panel">
                        <div class="server-list-wrap " v-if="goodList.length">
                            <div class="server-list">
                                <div class="slide-panel" :data-goods-id="goodItem.goodsId" v-for="(goodItem, index) in goodList" :key="goodItem.goodsId" @click.prevent="lookDetail(goodItem)">
                                    <div class="slide-panel-inner">
                                        <div class="slide-panel-item">
                                            <div class="container panel-item">
                                                <div class="panel-inner">
                                                    <div class="panel-pic">
                                                        <img width="72" height="72" :src="goodItem.pics[0].picUrl +'?x-oss-process=image/resize,m_fixed,h_100,w_100'" :alt="goodItem.name">
                                                    </div>
                                                    <div class="panel-info">
                                                        <div class="panel-tit clearfix">
                                                            <h2 class="pull-left nowrap">
                                                                <span>
                                                                    {{goodItem.name}}
                                                                </span>
                                                            </h2>
                                                        </div>
                                                        <p class="mt5">
                                                            <span class="mr5 emb-red">&yen;
                                                                <em class="f18">
                                                                    {{goodItem.price}}
                                                                </em>
                                                            </span>
                                                            <del class="lightgray f12">
                                                                {{goodItem.price}}
                                                            </del>
                                                        </p>
                                                        <p class="lightgray">
                                                            <span class="J-setup i5-setup" @click.stop="changeMenuFn(index)"></span>
                                                            <span class="mr15">销量： {{goodItem.salesNum}}</span>
                                                            <span>库存： {{goodItem.inventory}}</span>
                                                        </p>
                                                    </div>
                                                    <!-- 商品处理 start -->
                                                    <div class="server-handle-layer" :class="{open:isShow == index}">
                                                        <!-- <a class="J-share dib" href="javascript:;" @click.stop="creatQcode(goodItem.goodsId)">                                                                                                                                                                             <i class="i5-share"></i>分享</a> -->
                                                        <a class="dib" @click.stop="editDetail(goodItem)">
                                                            <i class="i5-edit"></i>编辑</a>
                                                        <a class="J-under-up dib" href="javascript:;" @click.stop="changeStatus(index)" :dataStatus="goodItem.status">
                                                            <i class="i5-soldOut"></i> {{goodItem.status == 1?'下架':'上架'}}
                                                        </a>
                                                        <a class="J-del dib" href="javascript:;" @click.stop="delGoogItem(index)">
                                                            <i class="i5-del"></i>删除</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
        <div class="fixed-footer text-right">
            <router-link :to="{name:'classifyManage'}" class="btn btn-default">
                分组管理
            </router-link>
            <router-link :to="{name:'goodsEdit',query:{type:'add'}}" class="btn btn-default btn-primary ml20">
                添加商品
            </router-link>
            <!-- <a id="add-goods-btn" class="btn btn-default btn-primary ml20" href="javascript:;">添加商品</a> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            allType: [{
                text: '全部状态',
                value: 0
            }, {
                text: '销售中',
                value: 1
            }, {
                text: '已下架',
                value: 2
            }, {
                text: '已售完',
                value: 3
            }],
            param: {
                goodsCategoryId: '',
                status: 0,
                page: 1
            },
            goodsCategory: [],
            goodList: [],
            isShow: -1,
            _loadMore: null,
            loading: true,
            emptyMsg: {
                mainMsg: '暂无商品信息赶添加吧~'
            },
            noData: false,
            hasFetchData: true
        }
    },
    created() {
        //获取列表
        this.goodsCategoryList();
        //获取列表
        this.getGoodList();
    },
    methods: {
        toastMsg(msg, type, fn) {
            let that = this;
            this.$vux.toast.show({
                text: msg,
                type: 'text',
                width: '24em',
                position: 'middle',
                onHide() {
                    if (type) {
                        that.$router.back();
                    }
                    fn()
                    that.isDisabled = false;
                }
            })
        },
        //状态分类
        changeTypeFn(e) {
            this.param.page = 1;
            this.getGoodList()
        }, //商品分组
        changeCategoryFn(e) {
            this.param.page = 1;
            this.getGoodList()
        },
        goodsCategoryList() {
            //获取分组数据
            this.$axios.get(this.$api.goodscategorylist)
                .then(({ data }) => {
                    data.splice(0, 0, {
                        goodsCategoryId: "",
                        name: "全部分组",
                        sort: 0
                    })
                    this.goodsCategory = data
                })
        },
        getGoodList(bConcat, cb) {
            //获取商品数据

            if ($.isFunction(bConcat)) {
                cb = bConcat;
                bConcat = null;
            }
            !bConcat ? (this.loading = true) : '';

            this.$axios.get(this.$api.goodslist, { params: this.param }).
                then(({ data }) => {
                    let goodList = data;
                    this.loading = false;
                    // 返回空列表，表示无数据
                    if (!goodList.length) {
                        this.noData = true
                    }
                    // 合并
                    if (bConcat) {
                        this.goodList = this.goodList.concat(goodList)
                    } else {
                        this.goodList = goodList
                    }
                    this.$nextTick(function() {
                        cb && cb(goodList)
                    })
                }).catch((err) => {
                    console.log(err)
                })
        },
        changeMenuFn(index) {
            //显示隐藏菜单
            this.isShow == index ? (this.isShow = -1) : (this.isShow = index)
        },
        lookDetail() {
            //查看商品详情
        },
        editDetail(goodItem) {
            this.$router.push({ name: 'goodsEdit', query: { type: 'edit', goodsId: goodItem.goodsId } })
        },
        changeStatus(index) {
            let that = this,
                status = this.goodList[index].status,
                goodsId = this.goodList[index].goodsId;
            this.$vux.confirm.show({
                content: status == 1 ? '您确定要下架此商品吗' : '您确定要上架此商品吗',
                onConfirm() {
                    that.$axios.post(status == 1 ? that.$api.undergoods : that.$api.normalgoods, $.param({ goodsId }))
                        .then(({ msg }) => {
                            that.toastMsg(msg, false, () => {
                                status == 1 ? that.goodList[index].status = 2 : that.goodList[index].status = 1
                                that.isShow = -1;
                            })
                        })
                }
            })
        },
        delGoogItem(index) {
            //删除商品数据
            let that = this;
            let goodsId = this.goodList[index].goodsId;
            this.$vux.confirm.show({
                content: '是否确定要删除当前记录',
                onConfirm() {
                    that.$axios.post(that.$api.deletegoods, $.param({ goodsId }))
                        .then(({ msg }) => {
                            that.toastMsg(msg, false, () => {
                                that.goodList.splice(index, 1)
                            })
                        })
                }
            })
        },
        infinite(done) {
            clearTimeout(this.timeId);
            if (this.noData) {
                setTimeout(() => {
                    console.log('come over')
                    done(true)
                }, 500)
                return;
            }
            this.timeId = setTimeout(() => {
                this.param.page++;

                this.getGoodList(true, () => {
                    done()
                })

            }, 1500)
        },
    }
}
</script>

<style scoped>
.viewbox-container,
.viewbox {
    padding-top: 0;
    height: calc(100vh - 10px);
    overflow: hidden;
}

.viewlist {
    height: 100%;
    position: relative
}

.server-mansge {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
}

._v-container[data-v-ecaca2b0] {
    top: 66px;
    bottom: 60px
}
</style>
