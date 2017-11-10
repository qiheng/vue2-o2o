<template>
    <div class="active-setup-wrap pb30">

        <!-- <datetime v-model="param.stime" :min-year="mYear" :max-year="xYear" format="YYYY-MM-DD HH:mm" :compute-days-function="computeDaysFunction" :compute-hours-function="computeHoursFunction" @on-change="change"></datetime> -->
        <form class="fm-control" action="/manage/setsales" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">活动名称</label>
                    <input class="three-fourths" type="text" name="name" v-model="param.name" placeholder="活动名称" />
                </div>
            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">开始时间</label>
                    <input  data-t="stime" class="datetime three-fourths" type="text" name="stime" v-model="stimer" placeholder="请选择开始时间" />
                    <i class="arr-rt pos-rt-middle"></i>
                </div>
                <div class="fm-line">
                    <label class="l-label">结束时间</label>
                    <input data-t="etime" class="datetime three-fourths" type="text" name="etime" v-model="etimer" placeholder="请选择结束时间" />
                    <i class="arr-rt pos-rt-middle"></i>
                </div>
            </div>
            <div class="fm-group mt10">
                <template v-if="query.salesType == 4">
                    <div class="block fm-line">
                        <label class="l-label">折扣比例</label>&nbsp;
                        <input type="tel" v-model="param.value" class="three-fourths" placeholder="0~99" maxlength="6" />&nbsp;%
                    </div>
                 </template>
                    <template v-if="query.salesType == 5">
                        <div class="block fm-line">
                            <label class="l-label">活动价格</label>&nbsp;
                            <input type="tel" v-model="param.value"  class="three-fourths" placeholder="请设置价格" maxlength="10" />
                        </div>
                    </template>
                <template v-if="query.salesType == 6">
                    <div class="block fm-line">
                        <label class="l-label">购买数量</label>&nbsp;
                        <input type="tel" v-model="s1"  class="three-fourths" placeholder="请设置数量" maxlength="2" />&nbsp;
                    </div>
                    <div class="block fm-line">
                        <label class="l-label">赠送数量</label>&nbsp;
                        <input type="tel" v-model="s2"  class="three-fourths" placeholder="请设置数量" maxlength="2" />
                    </div>
                </template>
                <router-link v-if="query.type == 'edit'" :to="{name:'salesGoods'}" class="J-add-goods block fm-line">
                    <label class="l-label">参与商品</label>
                    <i class="arr-rt pos-rt-middle"></i>
                </router-link>
            </div>
            <div class="container mt30">
                <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
            </div>

        </form>

        <!-- <div class="cx-setup p10 hidden">
            <div class="fm-line1 pt20 pb5 text-center">
                <template v-if="query.salesType == 4">
                    <label class="l-label">折扣比例</label>&nbsp;
                    <input type="tel" v-model="param.value" style="border:1px solid #ccc;width: 25%" placeholder="0~99" maxlength="6" />&nbsp;%
                </template>
                <template v-if="query.salesType == 5">
                    <label class="l-label">活动价格</label>&nbsp;
                    <input type="tel" v-model="param.value" style="border:1px solid #ccc;width: 45%" placeholder="请设置价格" maxlength="10" />
                </template>
                <template v-if="query.salesType == 6">
                    <label class="l-label">买</label>&nbsp;
                    <input type="tel" v-model="s1" style="border:1px solid #ccc;width: 25%" placeholder="0~99" maxlength="2" />&nbsp;
                    <label class="l-label">送</label>&nbsp;
                    <input type="tel" v-model="s2" style="border:1px solid #ccc;width: 25%" placeholder="0~99" maxlength="2" />
                </template>
            </div>
        </div> -->

    </div>
</template>
<script>
import { Datetime, Group } from "vux";
import validator from "@/assets/js/validator";

export default {
  components: {
    Datetime,
    Group
  },
  data() {
    return {
      type: 1,
      isDisabled: false,
      title: { "4": "限时折扣", "5": "N元专区", "6": "买N送N" },
      param: {
        salesType: "",
        name: "",
        stime: "1508913649797",
        etime: "1508913649797",
        value: ""
      },
      // 买N送N
      s1: 1,
      s2: 1
    };
  },
  created() {
    this.param.salesType = this.query.salesType;
    if (!this.query.salesType) {
      this.$router.back();
    }
    // 设置title
    document.title = this.title[this.query.salesType];

    if (this.query.type == "edit") {
      var salesItem = window.localStorage.getItem("__salesItem");

      // 更新到视图上
      var updateData = function(source, target) {
        $.each(["salesId", "name", "value"], function(i, key) {
          source[key] = target[key];
        });

        source.stime = target.stimer;
        source.etime = target.etimer;
      };

      // 判断是否有数据，没有搞个毛啊
      if (salesItem) {
        // 更新到视图上
        updateData(this.param, JSON.parse(salesItem));
      } else {
        this.$router.back();
      }

      // 买N送N
      if (this.query.salesType == 6) {
        var tmp = this.param.value.split(",");
        this.s1 = tmp[0] != null ? tmp[0] : 1;
        this.s2 = tmp[1] != null ? tmp[1] : 1;
      }
    }
  },
  mounted() {
    bindEvent(this);
  },
  computed: {
    query() {
      return this.$route.query;
    },
    stimer: function() {
      return this.param.stime;
    },
    etimer: function() {
      return this.param.etime;
    },
    value1: function() {
      return [this.s1, this.s2].join(",");
    }
  },
  methods: {
    change(value) {
      console.log(value);
    },
    submitFn() {
      let that = this,
        oValChar = {};

      if (this.isDisabled) return;
      this.isDisabled = true;

      // 校验字段
      $.each(validator.config, key => {
        let val = this.param[key];
        oValChar[key] = val;
      });

      // 校验表单
      if (!validator.validate(oValChar, true)) {
        return $.each(validator.messages, (i, val) => {
          this.$notiejs({
            state: 2,
            msg: val,
            end() {
              that.isDisabled = false;
            }
          });
          return false;
        });
      }
      // 买N送N 的时候 特殊处理下 【买一送二（1,2）】
      if (this.query.salesType == 6) {
        this.param.value = this.value1;
      }

      this.$axios
        .post(
          this.query.type == "edit"
            ? this.$api.updatesales
            : this.$api.addsales,
          $.param(this.param)
        )
        .then(({ data, msg }) => {
          this.$notiejs({
            state: 1,
            msg,
            end() {
              that.$router.back();
            }
          });
        })
        .catch(({ data, msg }) => {
          this.$notiejs({
            state: 2,
            msg
          });
        });
    }
  }
};
// 注册事件
function bindEvent(vm) {
  // 表单验证配置
  validator.config = {
    name: [
      { strategy: "isNonEmpty", errorMsg: "请填写活动名称" },
      { strategy: "minLength:2" }
    ]
  };
}
</script>
