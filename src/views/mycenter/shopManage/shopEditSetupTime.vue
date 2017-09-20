<template>
    <div class="shop-hours-panel pb60" v-cloak>
        <div class="lightgray shop-hours">
            <!--<div>-->
                <!--<input @focus="chooseTime" data-t="st" class="time st" type="text" :value="shop.opentime.st" readonly="readonly"/>-->
                <!--<ins>AM</ins>-->
                <!--<span>&nbsp;→&nbsp;</span>-->
                <!--<input @focus="chooseTime" data-t="et" class="time et" type="text" v-model="shop.opentime.et" readonly="readonly"/>-->
                <!--<ins>PM</ins>-->
            <!--</div>-->
            <p>轻触修改时间</p>
        </div>

        <div class="shop-days-list">
            <div @click.capture="switchFn" v-for="(day, key) in weekDay" class="panel-chunk">
                <span>{{ day }}</span>
                <span  :data-day="key" class="btn-switch pay-select-otps"
                       :data-checked="shop.opentime[key]"
                       :class="{checked: shop.opentime[key]}"></span>
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                whoChoose:'',
                weekDay:{
                    w1: '周一',
                    w2: '周二',
                    w3: '周三',
                    w4: '周四',
                    w5: '周五',
                    w6: '周六',
                    w0: '周日'
                },
                baseConfigTime: {
                    preset: 'time',
                    animate:'slideup',
                    closeOnOverlay: true,
                    theme: 'android-ics light',
                    mode: 'scroller',
                    display: 'bottom',
                    lang: 'zh',
                    timeFormat: 'HH:ii',
                    timeWheels: 'HHii',
                    hourText: '时',
                    minuteText: '分',
                    setText: '确定',
                    cancelText: '取消'
                },
                shop: {}
            }
        },
        created: function () {
            var shop = localStorage.getItem('__shopInfo');

            // 无本地缓存，则返回来源页面
            if (!shop) {
//                redirect_url(forward())
                router.go(-1);
            }
            this.shop = shop;
        },
        mounted: function () {
//            bindEvent(this);
        },
        methods: {
            switchFn: function (e) {
                var _this = this,
                    switchBtn = e.target,
                    dataset = switchBtn.dataset;

                switchHandler($(switchBtn), function () {
                    _this.shop.opentime[dataset.day] = 1;
                }, function () {
                    _this.shop.opentime[dataset.day] = 0;
                });

            },
            chooseTime: function (e) {
                var target = e.target;

                this.whoChoose = target.dataset.t;
            },
            submitFn: function () {
                var vm = this;

                // 设置店铺的时间
                vm.$axios.get(vm.$api.setshopattribute,{params:{name: 'opentime',value: JSON.stringify(vm.shop.opentime)}})
                    .then(function () {
                        localStorage.setItem('__shopInfo', JSON.stringify(vm.shop));
                        alert('保存成功');
                    })
//                _A.setshopattributeData({name: 'opentime', value: JSON.stringify(vm.shop.opentime)}, function() {
//
//                    store.set('__shopInfo', vm.shop);
//
//                    notiejs.alert(1, '保存成功', 2000, function () {
//                        redirect_url(forward())
//                    });
//
//                }, function () {
//                    // todo
//                    //return false;
//                })
            }
        }
    }
    // 注册事件
    function bindEvent(vm) {
        // 支付方式选择
//        setRadio(function (status) {
//            var $radio = $(this);
//
//            if (!status) return;
//
//        }, false);

        // 时间参数
        var param = $.extend({
            onSelect: function (txt, int) {
                vm.shop.opentime[vm.whoChoose] = txt
            }
        }, vm.baseConfigTime);

        $('.st, .et').mobiscroll('destroy').time(param);
        //$('.st, .et').scroller('destroy').scroller(vm.baseConfigTime)
    }
</script>

<style>
    .shop-hours-panel .shop-hours {
        margin: 10px;
        padding: 15px 0;
        text-align: center;
        background-color: #fff;
        border-radius: 5px;
    }
    .shop-hours-panel .time {
        font: 700 30px/1.2 Arial,Microsoft Yahei;
        color: #333;
        width: 90px;
        padding: 0;
        text-align: center;
    }
    .shop-days-list .panel-chunk {
        margin: 10px;
        padding: 15px 20px;
        background-color: #fff;
        border: 0;
        border-radius: 5px;
    }
</style>
