<template>
    <!-- 店铺地址 -->
    <div class="animsition">
        <form class="fm-control" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">所属地区</label>
                    <a @click="toggleAddress" class="pull-right" href="javascript:;">
                        <input class="text-right lightgray mr10" type="text" name="areaAddress" :value="areaAddress" placeholder="请选择" readonly="readonly" />
                        <input type="hidden" name="province" v-model="province.areaId"/>
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
        <modelLayer3
            @onselect = "selectLayerFn"
            @onclose = "closeLayerFn"
            :layer-data="layerData"
            :province="province"
            :city="city"
            :area="area"></modelLayer3>
    </div>
</template>

<script>
    import validator from '@/assets/js/validator'
    export default {
        data() {
            return {
                isDisabled: false,
                address:'',
                layerData: {
                    visible: false,
                    title:'选择地址'
                },
                province: {},
                city: {},
                area: {}
            }
        },
        created: function () {
            bindEvent(this)
        },
        methods: {
            // 显示隐藏选择地区
            toggleAddress: function () {
                //areaChose.slideIn()
                this.layerData.visible = !this.layerData.visible
            },
            createShop: function () {

                var oValChar = {},
                    vm = this;

                if (vm.isDisabled) return;
                vm.isDisabled = true;

                // 校验字段
                $.each(validator.config, function (key) {
                    var val = vm[key];
                    oValChar[key] = val
                });
                console.log('检验：',oValChar)

                // 校验表单
                if (!validator.validate(oValChar, true)) {

                    return $.each(validator.messages, function (i, val) {
                        vm.$notiejs({
                            state: 2,
                            msg: val,
                            end() {
                                vm.isDisabled = false;
                            }
                        });
                        return false;
                    })

                }

                var param = {
                    province: this.province.areaId,
                    city: this.city.areaId,
                    area: this.area.areaId,
                    address: this.address
                };

                vm.$axios.get(vm.$api.getarea,{params:param})
                    .then(function () {
                        vm.$notiejs({
                            state: 1,
                            msg: '修改成功',
                            end() {
                                ['province', 'city', 'area'].forEach(function (key) {
                                    vm.shop[key + 'Name'] = vm[key].name
                                });
                                vm.shop.address = vm.address;

                                localStorage.setItem('__shopInfo',JSON.stringify(vm.shop));
                                vm.$router.push({ path: 'shopEditSetup' })
                            }
                        })
                    }).catch(function (result) {
                        vm.isDisabled = false
                    })
            },
            selectLayerFn: function (address) {
                var _this = this;

                ['province', 'city', 'area'].forEach(function (key, index) {
                    _this[key] = address[index];
                })
                console.log('area:',address);
            },
            closeLayerFn: function () {
                this.layerData.visible = false;
            }
        },
        computed: {
            areaAddress: function () {
                var result = [], _this = this;
                ['province', 'city', 'area'].forEach(function (key) {
                    if (_this[key].name) {
                        result.push(_this[key].name)
                    }
                });
                return result.length ? result.join(' ') : ''
            }
        }
    }
    // 注册事件
    function bindEvent(vm) {

        // 表单验证配置
        validator.config = {
            areaAddress: {strategy: 'isNonEmpty', errorMsg: '请选择省市区'},
            address: [{strategy: 'isNonEmpty', errorMsg: '请填写详情地址'}]
        };
        var shop = JSON.parse(localStorage.getItem('__shopInfo'));

        if (!shop) {
            vm.$router.push({ path: 'shopEditSetup' })

//            window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
            // redirect_url(forward())
        }
        vm.shop = shop;

    }

</script>

<style>

</style>
