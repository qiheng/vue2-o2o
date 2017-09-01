<template>
    <div class="animsition" v-cloak>
        <!-- 店铺信息 start -->
        <div class="panel-nobrd">
            <div class="panel-hd gray bg-gray">商家名称</div>
            <div class="panel-bd">
                <p>{{ query.name }}</p>
                <p class="lightgray f12 mt5">{{ query.wholeAddress }}</p>
            </div>
        </div>
        <!-- 店铺信息 end -->

        <!-- 店铺信息 start -->
        <div class="panel-nobrd">
            <div class="panel-hd gray bg-gray">投诉原因</div>
            <ul>
                <li v-for="(seterroritem, index) in seterrorlist" class="J-radio panel-chunk"><i class="i-radio mr15" :class="{checked:active==index}" @click="setRadio(index)"></i>{{ seterroritem.title }}</li>
            </ul>
        </div>
        <!-- 店铺信息 end -->

        <div class="container mt30">
            <a @click.prevent="setError" href="javascript:;" class="btn btn-block btn-primary btn-lg" :class="{disabled:isDisabled}">提交</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDisabled: false,
                seterrorlist:[],
                active:-1,
                param: {
                    shopId: '',
                    content:''
                }
            }
        },
        created: function () {
            var _this = this;

            this.param.shopId = this.query.shopId;
            // 投诉类型列表
            _this.$axios.get(_this.$api.seterrorlist)
                .then(function (seterrorlist) {
                    _this.seterrorlist = seterrorlist.data;

                    _this.$nextTick(function () {

//                        _this.setRadio (_this)
                    })
                })
        },
        methods: {
            setError: function () {
                var _this = this;

                if (this.isDisabled) return;
                this.isDisabled = true;

                if (this.param.content == '') {
                    alert('请选择投诉原因');
                    _this.isDisabled = false;
//                    return layer.msg('请选择投诉原因', function () {
//                        _this.isDisabled = false;
//                    });
                }

                // 提交纠错
                _this.$axios.get(_this.$api.seterror,{params:this.param})
                    .then(function () {
                        layer.msg('提交成功', {shift:0}, function () {
                            redirect_url(forward())
                        });

                    }).catch(function () {
                    _this.isDisabled = false;
                })
            },
            setRadio:function (index) {
                var _this = this;
                _this.active = index;

            }
        },
        computed: {
            isHdfk: function () {
                // return this.ordersItem.shop.shopTypeId == config.shopTypeId.spws && this.ordersItem.payType === this.HDFK_VAL
            },
            query () {
                return this.$route.query
            }
        }
    }
    // 注册事件
//    function bindEvent(vm) {
//
//        // 支付方式选择
//        setRadio(function (status) {
//
//            if (status) {
//                vm.$set(vm.param, 'content', $(this).parent().text())
//            }
//
//        }, true, true)
//    }
</script>

<style>

</style>
