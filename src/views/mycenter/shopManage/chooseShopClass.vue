<template>
  <div>
	<form class="fm-control" action="/" method="POST">
		<div class="fm-group mt10">
			<div class="fm-line">
				<label class="l-label">店铺名称</label>
				<input type="text" name="name" v-model="name" placeholder="请填写店铺名称,小于10个字" maxlength="10" style="width:80%"/>
			</div>
		</div>

		<div class="fm-group mt10">
			<div class="fm-line">
				<label class="l-label">行业分组</label>
				<a @click.prevent="getShopClass" class="pull-right" href="javascript:;">
					<input type="hidden" name="shopClassId" :value="shopClassId"/>
					<input class="text-right lightgray mr10" type="text" v-model="shopClassName" readonly="readonly" placeholder="请选择"/>
					<i class="arr-rt pos-rt-middle"></i>
				</a>
			</div>
			<div class="fm-line">
				<label class="l-label">行业分类</label>
				<a @click.prevent="getShopCategory" class="pull-right" href="javascript:;">
					<input type="hidden" name="shopCategoryId" :value="shopCategoryId"/>
					<input class="text-right lightgray mr10" type="text" v-model="shopCategoryName" readonly="readonly" placeholder="请选择"/>
					<i class="arr-rt pos-rt-middle"></i>
				</a>
			</div>
		</div>

		<model-layer1 :layerData="layerData" @onclose="onClose" @onselect="onSelect"></model-layer1>

		<div class="container mt30">
			<input @click.prevent="nextSetup" type="submit" value="下一步" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}">
		</div>
	</form>

  </div>
</template>

<script>
import validator from "@/assets/js/validator";

export default {
  data() {
    return {
      isDisabled: false,
      name: "",
      shopClassId: "",
      shopClassName: "",
      shopCategoryId: "",
      shopCategoryName: "",
      layerData: {
        visible: false,
        list: []
      }
    };
  },
  created () {
	  this.init()
  },
  methods: {
    init() {
      // 表单验证配置
      validator.config = {
        name: [
          { strategy: "isNonEmpty", errorMsg: "请填写店铺名称" },
          { strategy: "maxLength:10" }
        ],
        shopClassName: { strategy: "isNonEmpty", errorMsg: "请选择分组" },
        shopCategoryName: { strategy: "isNonEmpty", errorMsg: "请选择分类" }
      };
    },
    // 分组
    getShopClass() {
      if (this.layerData.visible) return;

      // 用来区分监听回调是分组还是分类选择
      this.layerData.type = "class";
      // 控制层的显示隐藏
      this.layerData.visible = true;
      // 设置层的标题
      this.layerData.title = "请选择行业分组";

      // 缓存分组，避免重复发请求
      //   if (cache.shopClassList) {
      //     return (_this.layerData.list = cache.shopClassList);
      //   }

      //获取ID
      let shopTypeId = this.query.shopTypeId;
      this.$axios
        .get(this.$api.getshopclasslist, { params: { shopTypeId } })
        .then(({ data, msg }) => {
          this.layerData.list = data;
        });
    },
    // 分类
    getShopCategory() {
      if (this.shopClassName == "") {
        return this.$notiejs({
          state: 2,
          msg: "请先选择分组"
        });
      }

      if (this.layerData.visible) return;

      this.layerData.type = "category";
      this.layerData.visible = true;
      this.layerData.title = "请选择行业分类";

      let shopClassId = this.shopClassId;
      this.$axios
        .get(this.$api.getshopcategorylist, { params: { shopClassId } })
        .then(({ data, msg }) => {
          this.layerData.list = data;
        });
    },
    // 关闭监听处理
    onClose: function() {
      this.layerData.visible = false;
    },
    // 选择监听处理
    onSelect: function(t, item) {
      console.log(t);
      if (t === "class") {
        this.shopClassName = item.name;
        this.shopClassId = item.shopClassId;
      } else {
        this.shopCategoryName = item.name;
        this.shopCategoryId = item.shopCategoryId;
      }

      this.onClose();
    },
    nextSetup: function() {
      let oValChar = {},
        that = this;

      // 校验字段
      $.each(validator.config, key => {
        let val = this.$data[key];
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

      // 创建店铺的信息资料
      let createshop = {
        shopTypeId: this.query.shopTypeId,
        shopClassId: this.shopClassId,
        shopCategoryId: this.shopCategoryId,
        name: this.name
      };

      // 暂存在 localStorage 中
      window.localStorage.setItem("__createshop", JSON.stringify(createshop));

      // 跳转店铺地址设置
      this.$router.push({ name: "chooseShopAddress" });
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
.classify-choose-layer .classify-choose-crumbs .active {
  color: #e52739;
  border-bottom-color: #e52739;
}
.classify-choose-layer .mod-layer-bd {
  padding: 0;
}
.classify-choose-layer .classify-choose-list {
  margin-bottom: 0;
  border-top-color: #e62739;
}

.classify-choose-layer .classify-choose-list li {
  cursor: pointer;
}

.classify-choose-layer .classify-choose-list li.on {
  color: #e62739;
}
</style>
