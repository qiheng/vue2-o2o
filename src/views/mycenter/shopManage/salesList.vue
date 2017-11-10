<template>
    <!-- 促销商品 start -->
    <div class="sales-list-panel pb60" v-cloak>
        <div class="panel">
            <nav @click.capture="tabMeun" class="mod-box tap-panel tab-panel-primary">
                <!--1未开始，2进行中，3已结束-->
                <a v-for="(tapmeun, index) in tapmeuns" :data-type="(index+1)" class="box-flex tap-meun" :class="{'tap-meun-on': tabIndex === (index+1)}" href="javascript:;">{{ tapmeun }}</a>
            </nav>
        </div>

        <div class="sales-list">
            <!--数据区-->
            <loading v-model="loading"></loading>
            <template v-if="salesList.length">
                <!--<scroller-->
                <!--:on-infinite="infinite">-->
                <div class="msg-list mt10 panel">
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
                                <span class="btn btn-default" @click.stop.prevent="delAddressData(index)">删除</span>
                            </div>
                        </div>
                    </a>
                </div>
                <!--</scroller>-->
            </template>
            <empty v-else :msg="emtypMsg"></empty>
        </div>
        <!-- 添加 -->
        <div class="fixed-footer">
            <router-link class="btn btn-block btn-primary" :to="{name:'goodSales',query:{salesType:query.salesType}}">添加</router-link>
            <!-- <a class="btn btn-block btn-primary" :href="'set-goods-sales.html?type=add&salesType=' + query.salesType">添加</a> -->
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // tab 默认第一个选中
      loading: true,
      tabIndex: 1,
      title: { "4": "限时折扣", "5": "N元专区", "6": "买N送N" },
      tapmeuns: ["未开始", "进行中", "已结束"],
      emtypMsg: {
        mainMsg: "暂无数据~"
      },
      param: {
        salesType: "",
        salesStatus: 1,
        page: 1
      },
      salesItem: "",
      salesList: []
    };
  },
  created() {
    var query = this.query;
    this.getSales();
    this.param.salesType = query.salesType;
  },
  mounted() {
    // 促销类型，4限时，5N元，6买N送N
    if (!this.query.salesType) {
      //this.$router.back();
    }
    // 查询参数设置
    this.param.salesType = this.query.salesType;
    // 设置title
    document.title = this.title[this.query.salesType];
    this.getSales();
  },
  methods: {
    // 获取促销商品列表（ps:适用于重新拉取数据）
    getSales() {
      this.loading = true;
      this.$axios
        .get(this.$api.getsales, { params: this.param })
        .then(({ data }) => {
          this.salesList = data;
        });
      this.loading = false;
    },
    // 切换 tab 菜单
    tabMeun: function(e) {
      var tab = e.target;
      this.tabIndex = Number(tab.dataset.type) || 1;
      // 查询参数设置
      this.param.salesStatus = this.tabIndex;
      this.param.page = 1;

      this.getSales();
    },
    // 编辑
    edit(index) {
      // 缓存本地，以便编辑页面适用
      let salesItem = this.salesList[index];

      localStorage.setItem("__salesItem", JSON.stringify(salesItem));
      this.$router.push({
        path: "goodSales",
        query: { type: "edit", salesType: this.query.salesType }
      });
    },
    delAddressData(index) {
      let that = this,
        salesId = this.salesList[index].salesId;

      this.$vux.confirm.show({
        content: "是否确定要删除当前记录",
        onConfirm() {
          that.$axios
            .post(that.$api.deletesales, $.param({ salesId }))
            .then(({ msg }) => {
              that.salesList.splice(index, 1);
              that.$notiejs({
                state: 1,
                msg,
                end(){
                  
                }
              });
            })
            .catch(() => {});
        }
      });
      return
    },

    // 活动详情
    goDetail(salesItem) {
      // 缓存本地，以便编辑页面适用
      localStorage.setItem("__salesItem", JSON.stringify(salesItem));
      this.$router.push({ path: "salesDetail" });
    },
    infinite(done) {
      clearTimeout(this.timeId);
      if (this.noData) {
        setTimeout(() => {
          console.log("come over");
          done(true);
        }, 500);
        return;
      }
      this.timeId = setTimeout(() => {
        this.param.page++;

        this.getSales(true, () => {
          done();
        });
      }, 1500);
    }
  },
  computed: {
    query() {
      return this.$route.query;
    }
  }
};
</script>

<style scopde>
.sales-list-panel .sales-list .btn {
  min-width: 80px;
  margin-left: 5px;
  cursor: pointer;
}

.sales-list-panel .sales-list > a {
  color: #333;
}

.fixed-footer {
  border-top: 0;
  padding: 0;
}

.fixed-footer .btn {
  border-radius: 0;
}
</style>
