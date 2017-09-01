<template>
    <div class="sales-list-panel pb60" v-cloak>
        <div class="panel">
            <nav @click.capture="tabMeun" class="mod-box tap-panel tab-panel-primary">
                <!--1未开始，2进行中，3已结束-->
                <a v-for="(tapmeun, index) in tapmeuns"
                   :data-type="(index+1)" class="box-flex tap-meun"
                   :class="{'tap-meun-on': tabIndex === (index+1)}" href="javascript:;">{{ tapmeun }}
                </a>
            </nav>
        </div>
        <div class="sales-list">
            <!--数据区-->
            <loading v-show="loading"></loading>
            <template v-if="salesList.length">
                <a v-for="(salesItem, index) in salesList" @click.prevent="goDetail(salesItem)" href="javascript:;" class="block panel-nobrd">
                    <div class="panel-hd">
                        <h2 class="f16">{{ salesItem.name }}</h2>
                        <p class="lightgray f12">{{ salesItem.stimer | timeFormat('yyyy-MM-dd hh:mm') }} — {{ salesItem.etimer | timeFormat('yyyy-MM-dd hh:mm') }}</p>
                    </div>
                    <div class="panel-bd">
                        <ul v-if="salesItem.goodsList" class="pb10 btm-brd-gray f12 lh-22">
                            <li v-for="(goodsItem, i) in salesItem.goodsList" class="clearfix">
                                <p class="pull-left one-half nowrap">{{ goodsItem.name }}{{ goodsItem.format }}</p>
                                <p class="pull-right">
                                    <span class="emb-red">&yen;{{ goodsItem.eprice }}</span>
                                    <del class="lightgray ml10">&yen;{{ goodsItem.price }}</del>
                                </p>
                            </li>
                        </ul>
                        <div class="mt10 text-right">
                            <span @click.stop="edit(index)" class="btn btn-primary">编辑</span>
                            <span @click.stop="del(index)" class="btn btn-default">删除</span>
                        </div>
                    </div>
                </a>
            </template>
            <empty v-else :msg="emtypMsg"></empty>
        </div>
        <div class="fixed-footer">
            <!--<a class="btn btn-block btn-primary" :href="'set-goods-sales.html?type=add&salesType=' + query.salesType">添加</a>-->
            <a class="btn btn-block btn-primary" :href="'set-goods-sales.html?'">添加</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
//                query: query,
                loading: true,
                // tab 默认第一个选中
                tabIndex: 1,
                title:{'4':'限时折扣','5':'N元专区','6':'买N送N'},
                tapmeuns: ['未开始', '进行中', '已结束'],
                _loadMore: null,
                emtypMsg: {
                    mainMsg: '暂无数据~'
                },
                param: {
                    salesType: '',
                    salesStatus: 1,
                    page: 1
                },
                salesList: []
            }
        },
        mounted: function () {
            // 促销类型，4限时，5N元，6买N送N
            var _this = this;

//            if (!query.salesType) {
//                redirect_url(forward())
//            }

            // 查询参数设置
//            this.param.salesType = query.salesType;

            // 设置title
//            document.title = this.title[query.salesType];

            this.getSales();
        },
        methods: {
            // 获取促销商品列表（ps:适用于重新拉取数据）
            getSales: function () {
                var _this = this;

                _this.loading = true;
                _this.$axios.get(_this.$api.getsales,{prams:_this.param})
                    .then(function (salesList) {
                        _this.salesList = salesList.data;

                        // loadDown
                        if (!_this._loadMore) {
                            _this._loadMore = _this.loadMore();
                        }

                        _this._loadMore && _this._loadMore.update();
                })
//                    .always(function () {
//                        _this.loading = false
//                    })
//                    .fail(function () {
//
//                    })
            },
           // 切换 tab 菜单
            tabMeun: function (e) {
                var tab = e.target;

                this.tabIndex = Number(tab.dataset.type) || 1;
                // 查询参数设置
                this.param.salesStatus = this.tabIndex;
                this.param.page = 1;

                this.getSales();
            },
//            // 编辑
            edit: function (index) {
                var _this = this,
                    salesItem = this.salesList[index];

                // 缓存本地，以便编辑页面适用
//               store.set('__salesItem', salesItem);
                localStorage.setItem('__salesItem', salesItem);
//                redirect_url('set-goods-sales.html?type=edit&salesType=' + query.salesType)

            },
           // 删除
            del: function (index) {
                var _this = this,
                    salesItem = this.salesList[index];

                // 删除询问
                layer.open({
                    title: '温馨提示',
                    shift: 1,
                    content:'您确定要该促销活动吗？',
                    btn: ['确定', '取消'],
                    yes: function (idx, layerEl) {
                        layer.close(idx);

                        // 删除促销商品
                        _this.$axios.get(_this.$api.deletegoodstosales,{params:{salesId: salesItem.salesId}})
                            .then( function () {
                            _this.salesList.splice(index, 1)
                        })
                            .fail(function () {
                                layer.msg('删除失败')
                            })
                    }
                });
            },
//            // 活动详情
            goDetail: function (salesItem) {
                // 缓存本地，以便编辑页面适用
                localStorage.setItem('__salesItem', salesItem);
                redirect_url('sales-detail.html')
            },
            // 滚动底部加载
            loadMore: function loadMore() {
                var _this  = this;

                return $('body').loadMore({
                    scrollArea : window,
                    loadDownFn: function (me) {
                        var data;
                        // 初始化全部促销分类商品
                        _this.param.page += 1;
                        _this.$axios.get(_this.$api.getsales,{prams:_this.param})
                            .then(function (salesList) {

                            if (salesList.length) {
                                _this.salesList = vm.salesList.concat(salesList)
                            } else {
                                me.noData();
                            }

                            me.refresh();

                        });
                    }
                }).data('load-more');
            },
            computed: {
                query() {
                    return this.$route.query;
                }
            }
        }
    }
</script>

<style>

</style>
