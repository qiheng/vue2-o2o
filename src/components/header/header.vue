<template>
    <!-- 导顶部导航 start -->
    <div class="header nav-header-search" :class="{'home-header': posModel == 'fixed'}">
        <slot name="headTxt">
            <!--<span class="white pull-left nowrap" style="max-width: 25%">店铺精选</span>-->
        </slot>

        <!--<a v-if="headType == 'link'" :href="'search.html?t='+searchType" class="bfc-panel">-->
            <!--<i class="btn icos-sprite search-btn pull-right"></i>-->
            <!--<div class="header-search">-->
                <!--<p class="search-key lightgray pl10">{{ placeholder }}</p>-->
            <!--</div>-->
        <!--</a>-->

        <router-link v-if="headType == 'link'" :to="{name:'search',query:{t:0}}" class="bfc-panel">
            <i class="btn icos-sprite search-btn pull-right"></i>
            <div class="header-search">
                <p class="search-key lightgray pl10">{{ placeholder }}</p>
            </div>
        </router-link>

        <template v-else>
            <a @click="searchFn(key)" href="javascript:;" class="btn icos-sprite search-btn pull-right"></a>
            <div class="header-search">
                <input type="search" class="search-key" v-model.trim="key" :placeholder="placeholder" />
            </div>
        </template>

    </div>
    <!-- 导顶部导航 end -->
</template>

<script>
    export default {
        props:{
            posModel: String,
            headTxt: [String, Number],
            headType: String,
            searchType: {
                type: [String, Number],
                default: 0
            }
        },
        data () {
            return {
                key:'',
                searchList: {
                    "0": {
                        url: "search-result.html",
                        placeholder: "输入搜索商家名称",
                        name: "home"
                    },
                    "1": {
                        url: "search-result.html",
                        placeholder: "输入搜索商品名称",
                        name: "favorite"
                    },
                    "2": {
                        url: "search-result.html",
                        placeholder: "输入搜索促销商品名称",
                        name: "sale"
                    },
                    "3": {
                        url: "search-result.html",
                        placeholder: "输入搜索商家名称",
                        name: "o2o"
                    },
                    "4": {
                        url: "search-result.html",
                        placeholder: "输入搜索商家名称",
                        name: "synthe"
                    },
                    "5": {
                        url: "search-result.html",
                        placeholder: "输入搜索关键词",
                        name: "bdt"
                    }
                },
                searchFn (key) {
                    if (key == '') {
                        this.$emit('fail', '请输入搜索关键词')
                    } else {
                        this.$emit('success', key);
                        console.log('success', key)
                        //location.href
                    }
                }
            }
        },
        computed: {
            placeholder () {
                return this.searchList[this.searchType] ? this.searchList[this.searchType].placeholder : ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {

    }
</style>
