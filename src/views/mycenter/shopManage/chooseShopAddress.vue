<template>
    <div>
    <form class="fm-control" action="/" method="POST">
		<div class="fm-group mt10">
			<div class="fm-line">
				<label class="l-label">所属地区</label>
				<a @click="toggleAddress" class="pull-right" href="javascript:;">
					<input class="text-right lightgray mr10" type="text" name="areaAddress" v-model="addressData" placeholder="请选择" readonly="readonly" />
					<input type="hidden" name="proviance" v-model="proviance.areaId"/>
					<input type="hidden" name="city" v-model="city.areaId"/>
					<input type="hidden" name="area" v-model="area.areaId" />
					<i class="arr-rt pos-rt-middle"></i>
				</a>
			</div>
			<div class="fm-line">
				<label class="l-label">店铺地址</label>
				<input class="inp-txt three-fourths" type="text" name="address" v-model="address" placeholder="纤细地址（街道、楼牌号等）"/>
			</div>
		</div>
		<div class="container mt30">
			<input @click.prevent="createShop" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled:isDisabled}">
		</div>
	</form>
	<model-layer3 :define="define" :layerData="layerData" :proviance="proviance" :city="city" :area="area" @onselect="selectLayerFn" @onclose="closeLayerFn">
    </model-layer3>
    </div>
</template>

<script>
import validator from "@/assets/js/validator";

export default {
  data() {
    return {
      isDisabled: false,
      layerData: {
        visible: false,
        title: "选择地址"
      },
      define: 10,
      addressData: "",
      address: "",
      proviance: {},
      city: {},
      area: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 表单验证配置
      validator.config = {
        addressData: { strategy: "isNonEmpty", errorMsg: "请选择省市区" },
        address: [{ strategy: "isNonEmpty", errorMsg: "请填写详情地址" }]
      };
    },
    createShop() {
      let that = this,
        oValChar = {};
      if (this.isDisabled) return;
      this.isDisabled = true;
      // 校验字段
      $.each(validator.config, key => {
        oValChar[key] = this.$data[key];
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

      let createshop = window.localStorage.getItem("__createshop"),
        newDate = Object.assign({}, JSON.parse(createshop), {
          province: this.proviance.areaId,
          city: this.city.areaId,
          area: this.area.areaId,
          address: this.address
        });
      this.$axios
        .post(this.$api.createshop, $.param(newDate))
        .then(({ data, msg }) => {
          if (status == 1) {
            this.$notiejs({
              state: 1,
              msg: msg,
              end() {
                that.isDisabled = true;
                this.$router.push({name:'shopManage'})
                window.localStorage.removeItem('__createshop')
              }
            });
          } else {
            this.$notiejs({
              state: 2,
              msg: msg,
              end() {
              }
            });
          }
        });

      console.log(newDate);
    },
    toggleAddress() {
      this.defaultSelect = !1;
      this.layerData.visible = !this.layerData.visible;
    },
    selectLayerFn(address) {
      ["proviance", "city", "area"].forEach((key, index) => {
        this[key] = address[index];
        console.log(this[key], key);
        this.addressData += address[index].name + " ";
      });
    },
    closeLayerFn() {
      this.layerData.visible = false;
    }
  }
};
</script>

<style scoped>

</style>