<template>
    <div class="viewbox-container">
        <div class="viewbox classify-panel pb60">
            <div v-for="(list, index) in categoryList" :key="index" :data-i="index" class="classify-item" v-if="list.shopCategoryList">
                <div class="classify-hd">
                    <img class="pull-left radius50 mr5" width="20" height="20" :src="list.pic+'?x-oss-process=image/resize,m_fixed,h_40,w_40'" :alt="list.name"/>
                    <h2 v-text="list.name"></h2>
                </div>
                <div class="classify-bd">
                    <ul class="list-fl">
                        <li><a :href="'shop-all-class.html?shopClassId='+list.shopClassId">全部</a></li>
                        <li v-for="(subList, idx) in list.shopCategoryList" :key="idx" v-if="subList.name" :class="{hidden:idx >= initShowSize && list.isHidden}">
                            <a class="nowrap" :href="'shop-all-class.html?shopCategoryId='
                            +subList.shopCategoryId+'&shopClassId='
                            +list.shopClassId+'&shopClassName='+subList.name" v-text="subList.name"></a>
                        </li>
                        <li v-if="list.shopCategoryList.length > initShowSize">
                            <a @click="showMore(index)" href="javascript:;">
                                <i :class="!list.isHidden ? 'icon-up-gray' : 'icon-down-gray'"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <!-- 主导航 -->
        <main-nav :current-nav-index="currentNavIndex"></main-nav>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentNavIndex:2,
                initShowSize:6,
                categoryList:[]
            }
        },
        created: function () {
            var _this = this;

            // 获取分类数据
            this.$axios.get(this.$api.sitecategory)
                .then(function ({status, data}) {
                    var categoryList = data || [];
                    console.log('categoryList:',categoryList)

                    if (categoryList.length) {
                        // 对数据加工处理(增加一个显示字段，默认不显示)
                        categoryList.map(function (item) {
                            return item.isHidden = true;
                        });

                        _this.categoryList = categoryList;
                    }
                })

        },
        mounted: function () {
            // 事件注册
            //bindEvent()
        },
        methods: {
            showMore: function (index) {
                this.categoryList[index].isHidden = !this.categoryList[index].isHidden;
            }
        }
    }
</script>

<style>

</style>
