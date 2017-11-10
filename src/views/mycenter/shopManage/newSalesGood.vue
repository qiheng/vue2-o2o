<template>
  <!-- 添加商品 start -->
<div class="add-salesGoods-forDb pb60">
    <div class="getsales-list">
		<div class="panel">
			<!--数据区-->
			<template v-if="salesList.length">
				<div v-for="(goodsItem, index) in salesList" class="panel-chunk">
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
						<i @click="add(index,$event)" data-has-add="0" class="i-radio pos-rt-middle">+</i>
					</div>
				</div>
			</template>
			<empty v-else :msg="emptyMsg"></empty>
		</div>
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
      salesList: [],
      salesItem: {
        goodsList: []
      },
      param: {
        page: 1
      }
    };
  },
  created() {
    let salesItem = window.localStorage.getItem("__salesItem");

    // 检测本地是否有缓存数据
    if (salesItem) {
      this.salesItem = $.extend(this.salesItem, JSON.parse(salesItem));
    }

    this.$axios
      .get(this.$api.goodsforsales, { params: this.param })
      .then(({ data, msg }) => {
        this.salesList = data;
      });
  },
  methods: {
    add: function(index, ev) {
      let salesItem = this.salesList[index],
        dataset = ev.target.dataset;

      if (dataset.hasAdd == "1") {
        return this.$notiejs({
          state: 2,
          msg: "已添加过了"
        });
      }
      this.$axios
        .post(
          this.$api.addgoodstosales,
          $.param({
            salesId: this.query.salesId,
            goodsId: salesItem.goodsId
          })
        )
        .then(({ data, status, msg }) => {
          if (status == 1) {
            this.$notiejs({ state: 1, msg: "商品添加成功" });
            dataset.hasAdd = 1;
            ev.target.innerHTML = "-";
            this.salesItem.goodsList.push(salesItem);
            window.localStorage.setItem('__salesItem',JSON.stringify(this.salesItem))
          }
        })
        .catch(() => {
          this.$notiejs({ state: 2, msg: "商品添加异常" });
          dataset.hasAdd = 0
        });
    }
  },
  computed: {
    query() {
      return this.$route.query;
    }
  }
};
</script>
<style scoped>
.add-salesGoods-forDb .i-radio {
  border-color: #e62739;
  font-size: 18px;
  text-align: center;
  line-height: 16px;
  color: #e62739;
}
</style>
