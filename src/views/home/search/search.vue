<template>
    <div class="search" v-cloak>
        <!-- 导顶部导航 start -->
        <div class="header nav-header-search">
            <a @click="searchHandle(keywrod)" href="javascript:;" class="btn icos-sprite search-btn pull-right"></a>
            <div class="header-search"><input type="search" class="search-key" v-model="keywrod" :placeholder="search[query.t].placeholder" /></div>
        </div>
        <!-- 导顶部导航 end -->

        <!-- 搜索 start -->
        <div class="search-wrap">
            <dl v-if="hotSearchList.length" class="search-keys mb20 panel-item1">
                <dt>热门搜索</dt>
                <dd>
                    <ul class="key-list list-fl">
                        <li @click="searchHandle(hotsearch.name)" v-for="hotsearch in hotSearchList"><a href="javascript:;">{{ hotsearch.name }}</a></li>
                    </ul>
                </dd>
            </dl>

            <dl v-if="historysearches.length" id="history-panel" class="search-keys panel-item1">
                <dt>历史搜索</dt>
                <dd>
                    <ul class="key-list">
                        <li @click="searchHandle(historysearch)" v-for="historysearch in historysearches"><a href="javascript:;">{{ historysearch }}</a></li>
                    </ul>

                    <a @click="clearHistory" href="javascript:;" class="clear-history text-center lightgray">清空历史记录</a>
                </dd>
            </dl>
        </div>
        <!-- 搜索 end -->
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import validator from '@/assets/js/validator'

    export default {
        data(){
            return{
//                query: query,
                keywrod: '',
                historysearches: [],
                hotSearchList: [],
                search: {
                    '0': {
                        url: 'search-result.html',
                        placeholder: '输入搜索商家、商品名称',
                        name: 'home'
                    },
                    '1': {
                        url: 'search-result.html',
                        placeholder: '输入搜索商品名称',
                        name: 'favorite'
                    },
                    '2': {
                        url: 'search-result.html',
                        placeholder: '输入搜索促销商品名称',
                        name: 'sale'
                    },
                    '3': {
                        url: 'search-result.html',
                        placeholder: '输入搜索商家名称',
                        name: 'o2o'
                    },
                    '4': {
                        url: 'search-result.html',
                        placeholder: '输入搜索商家名称',
                        name: 'synthe'
                    },
                    '5': {
                        url: 'search-result.html',
                        placeholder: '输入搜索关键词',
                        name: 'bdt'
                    }
                }
            }
        },
        created: function () {
            this.getHotSearch();
            this.getHistory();
            var _this = this;
            let query = _this.query;
            query.t;
            if(_this.query.t == _this.search){
                _this.query.t.placeholder = _this.search.placeholder
            }
            console.log(_this.query.t,'4114454455454');
        },
        methods: {
            // 历史记录
            getHistory: function () {
                this.historysearches = JSON.parse(localStorage.getItem('historysearches')) || [];

            },
            // 热门
            getHotSearch: function () {
                var _this = this;

                this.$axios.get(this.$api.hotsearch)
                    .then(function(hotSearchList){
                    _this.hotSearchList = hotSearchList.data;
                            console.log(hotSearchList.data,'66666666666666666666666');
                })
            },
            // 判断是否存在该历史记录
            hasHistorySearche: function (key) {
                var historysearches = this.historysearches;
                console.log(historysearches)
                return historysearches.some(function (searche) {
                    return searche == key
                })
            },
            // 搜索操作
            searchHandle: function (key) {
                var _this = this;
                var historysearches = this.historysearches;

                if (key === undefined || key === '') {
                    this.$notiejs({
                        state: 2,
                        msg: '请输入搜索关键词',
                    });
                    return false
                }

                // 不存在，则缓存
                if (!this.hasHistorySearche(key)) {
                    historysearches.push(key);

                    if (historysearches.length >10) historysearches.length = 10;
                    localStorage.setItem('historysearches', JSON.stringify(historysearches));

                }

                // 跳转结果页
                _this.$router.push({path:'searchResult',query:{'key':key,'t':_this.query.t}})
            },
            // 清空历史记录操作
            clearHistory: function () {
                this.historysearches = [];
                localStorage.removeItem('historysearches');
            }
        },
        computed: {
            query() {
                return this.$route.query;
            }
        }
    }
</script>

<style>

</style>
