<template>
      <div class="sales-goods-wrap pb60" v-cloak>
          <div class="getsales-list">
          <div class="panel">
            <!--数据区-->
            <template v-if="salesItem.goodsList">
              <div v-for="(goodsItem, index) in salesItem.goodsList" class="panel-chunk">
                <a class="panel-pic pull-left mr10" href="javascript:;">
                  <img width="72" height="72" :src="goodsItem.pics[0].picUrl+'?x-oss-process=image/resize,m_fixed,h_120,w_120'" alt="">
                </a>
                <div class="bfc-panel f12">
                  <h2 class="mb5 nowrap f16"><a href="javascript:;">{{ goodsItem.name }}</a></h2>
                  <p class="emb-red">
                    <span class="mr5 f12">&yen;<ins class="f18">{{ goodsItem.eprice }}</ins></span>
                  </p>
                  <p>
                    <span class="mr15">销量：{{ goodsItem.salesNum }}</span>
                    <span>库存：{{ goodsItem.inventory }}</span>
                  </p>
                  <!--<a class="J-add pos-rt-middle orange" href="javascript:;">添加</a>-->
                  <i @click="del(index)" class="i-del2 pos-rt-middle"></i>
                </div>
              </div>
            </template>
            <empty v-else :msg="emptyMsg"></empty>
          </div>
        </div>
        <div class="container mt30">
          <router-link :to="{name:'newSalesGood',query:{salesId:salesItem.salesId}}"  class="btn btn-block btn-primary btn-lg">
            添加参与商品
          </router-link>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      emptyMsg: {
        mainMsg: "暂无参与商品~"
      },
      salesItem: {
        goodsList: []
      }
    };
  },
  created() {
    var salesItem = window.localStorage.getItem("__salesItem");
    // 检测本地是否有缓存数据
    if (salesItem) {
      this.salesItem = JSON.parse(salesItem);
    }
  },
  methods: {
    del(index) {
      let goodsItem = this.salesItem.goodsList[index];
      this.$axios
        .post(
          this.$api.deletegoodstosales,
          $.param({
            salesId: this.salesItem.salesId,
            goodsId: goodsItem.goodsId
          })
        )
        .then(() => {
          this.salesItem.goodsList.splice(index, 1);
          window.localStorage.setItem("__salesItem", JSON.stringify(this.salesItem));
        });
    }
  }
};
</script>
