<template>
    <div class="animsition service-range-wrap" v-cloak>
        <div class="panel">
            <div v-for="(rangeItem, index) in rangeList" class="panel-chunk" @click="chooseRange(index)">
                <label class="l-label">{{ rangeItem.value }}</label>
                <i class="i-radio pos-rt-middle" :class="{checked: shop.range == rangeItem.key}"></i>
            </div>
        </div>

        <toast v-model="show7">设置成功</toast>
        <div v-if="show7==true">

            <a href="javascript:;" onclick="history.go(-1)">22</a>
        </div>

        <!--<router-link :to="{name:'shopManage'}" class="go-back"></router-link>-->
    </div>
</template>

<script>
    import { Toast, Group, XSwitch, XButton } from 'vux'
    export default {
        components: {
            Toast,
            Group,
            XSwitch,
            XButton
        },
        data() {
            return {
                isDisabled: false,
                rangeList:[],
                range: 0,
                rangeName: '不限',
                shop:{},
                show7:false,
                timm:2000,
                position: 'center',
                showPositionValue: true
            }
        },
        created: function () {
            var _this = this,
                shop = JSON.parse(localStorage.getItem('__shopInfo'));

            if (shop) {
                this.shop = shop;
            }
            // 获取服务范围
            this.$axios.get(this.$api.getrange)
                .then(function (rangeList) {
                    _this.rangeList = rangeList.data;
                })
        },
        methods: {
            chooseRange: function (index) {
                var rangeItem = this.rangeList[index],
                    vm = this;

                if (this.isDisabled) return;
                this.isDisabled = true;

                this.shop.range = rangeItem.key;
                this.shop.reangName = rangeItem.value;

                // 设置店铺的服务范围
                vm.$axios.get(vm.$api.setshopattribute,{params:{name: 'range', value: Number(this.shop.range)}})
                    .then(function () {
                        if (vm.shop.shopId) {
                            console.log(vm.shop.shopId,'+++++++++++++++++++++++6666');
                            console.log(vm.shop,'+++++++++++++++++++++++666677777777777777');
                            localStorage.setItem('__shopInfo',JSON.stringify(vm.shop));
                        }
                        vm.show7 = true;
                        window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
//                        vm.$notiejs({
//                            state: 1,
//                            msg: '设置成功',
//                            time:2000,
//                            end:{
//                            }
//                        })
                    }).catch(function () {
                        vm.isDisabled = false;
                    })
            }
        }
    }
</script>

<style>

</style>
