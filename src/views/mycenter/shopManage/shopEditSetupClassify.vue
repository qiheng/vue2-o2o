<template>
    <div class="animsition" v-cloak>
        <form class="fm-control" action="/" method="POST">

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

            <div class="container mt30">
                <input @click.prevent="nextSetup" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}">
            </div>
        </form>
        <!--<keep-alive>-->
            <!--<mod-layer :layer-data="layerData"-->
                       <!--@onselect="onSelect"-->
                       <!--@onclose="onClose"></mod-layer>-->
        <!--</keep-alive>-->
        <modelLayer1
            :layer-data="layerData"
            @onselect="onSelect"
            @onclose="onClose">
        </modelLayer1>
    </div>
</template>

<script>
    import validator from '@/assets/js/validator'
    export default {
        data() {
            return {
                isDisabled: false,
                shopClassId:'',
                shopClassName:'',
                shopCategoryId:'',
                shopCategoryName:'',
                oldShopClassId:'',
                layerData: {
                    visible: false,
                    list:[]
                }
            }
        },
        created: function () {
            bindEvent(this);
        },
        methods: {
            // 分组
            getShopClass: function () {
                var _this = this;

                if (this.layerData.visible) return;

                // 用来区分监听回调是分组还是分类选择
                this.layerData.type = 'class';
                // 控制层的显示隐藏
                this.layerData.visible = true;
                // 设置层的标题
                this.layerData.title = '请选择行业分组';

                // 缓存分组，避免重复发请求
//                if (cache.shopClassList) {
//                    return _this.layerData.list = cache.shopClassList
//                }
//                _this.$axios.get(_this.$api.getshopclasslist,{params:{shopTypeId: this.shop.shopTypeId}})
//                    .then(function (shopClassList) {
//                        _this.layerData.list = cache.shopClassList = shopClassList;
//                    })
            },
            // 分类
            getShopCategory: function () {
                var _this = this;

                if (this.shopClassName == '') {
                    //return layer.msg('请先选择分组')
                    return notiejs.alert(2, '请先选择分组', 2000);
                }

                if (this.layerData.visible) return;

                this.layerData.type = 'category';
                this.layerData.visible = true;
                this.layerData.title = '请选择行业分类';

                // 分组id 相同，则不请求
                if (this.oldShopClassId == this.shopClassId) return;

                _this.$axios.get(_this.$api.getshopcategorylist,{params:{shopClassId: this.shopClassId}})
                    .then(function (shopCategoryList) {
                        _this.layerData.list = shopCategoryList;
                    })
            },
            // 关闭监听处理
            onClose: function () {
                this.layerData.visible = false;
            },
            // 选择监听处理
            onSelect: function (t, item) {
                var _this = this;

                if (t === 'class') {

                    // 最新选择的分组信息
                    this.shopClassName = item.name;
                    this.shopClassId = item.shopClassId;

                    // 立即获取分类并默认第一个选中
                    _this.$axios.get(_this.$api.getshopcategorylist,{params:{shopClassId: this.shopClassId}})
                        .then(function (shopCategoryList) {
                            _this.layerData.list = shopCategoryList;
                            // 备份上一次选择的分组id
                            _this.oldShopClassId = _this.shopClassId;

                            if (shopCategoryList.length) {
                                _this.shopCategoryName = shopCategoryList[0].name;
                                _this.shopCategoryId = shopCategoryList[0].shopCategoryId
                            } else {
                                _this.shopCategoryId = '';
                                _this.shopCategoryName = '请选择';
                            }
                        })
                    } else {
                        this.shopCategoryName = item.name;
                        this.shopCategoryId = item.shopCategoryId
                    }

                    this.onClose();
            },
            nextSetup: function () {
                var oValChar = {},
                    vm = this;

                // 校验字段
                $.each(validator.config, function (key) {
                    var val = vm.$data[key];
                    oValChar[key] = val
                });

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
                    })
                }
                // 设置店铺的分类
                vm.$axios.get(vm.$api.setshopclassandcategory,{params:{classId: this.shopClassId, categoryId: this.shopCategoryId}})
                    .then(function () {
                        update(vm.shop, vm);
                        localStorage.setItem('__shopInfo',JSON.stringify(vm.shop));

                        vm.$notiejs({
                            state: 1,
                            msg: '保存成功',
                            end() {
                                window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
                            }
                        });
                    }).catch(function () {
                    vm.isDisabled = false;
                    return false;
                })
            }

        }
    }
    // 注册事件
    function bindEvent(vm) {
        // 表单验证配置
        validator.config = {
            shopClassName: {strategy: 'isNonEmpty', errorMsg: '请选择分组'},
            shopCategoryName: {strategy: 'isNonEmpty', errorMsg: '请选择分类'}
        };

        var shop = JSON.parse(localStorage.getItem('__shopInfo'));

        if (!shop) {
            window.location.href = 'http://localhost:8089/#/mycenter/shopEditSetup';
        }
        // 初始化数据
        vm.shop = shop;
        update(vm, shop);
    }
    // 更新分组分类
    function update(source, target) {
        $.each(['shopClassId', 'shopCategoryId', 'shopClassName', 'shopCategoryName'], function (i, key) {
            source[key] = target[key]
        });
    }
</script>

<style>
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
