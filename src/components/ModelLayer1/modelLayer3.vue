<template>
    <div @click="closeFn" class="mod-layer-1 address-choose-layer" :class="{show: layerData.visible}">
        <div class="mod-layer-con">
            <div class="mod-layer-hd">
                <h2 class="mod-layer-tit">{{ layerData.title }}</h2>
                <ul class="list-fl mt5 address-choose-crumbs">
                    <li v-for="(area, key) in chooseArea"
                    v-show="level >=key"
                    @click.stop="tabMeun(key)"
                    :data-level="key"
                    :class="{active: level >=key}">{{ chooseArea[key].name }}</li>
                </ul>
            </div>
            <div class="mod-layer-bd">
                <ul v-if="list.length" class="address-choose-list">
                    <li @click.stop="selectFn(index, level)" :data-level="level" v-for="(item, index) in list"
                    :key="item.name"
                    :class="{on: chooseArea[level] && chooseArea[level].name == item.name}">{{ item.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            tt:{
                type:Number,
                default:10
            },
            layerData: {
                //required:true,
                type:Object,
                default: {
                    visible: false
                }
            },
            province: {
                type:Object,
                default: function () {
                    return {
                        name:'选择省'
                    }
                }
            },
            city: {
                type:Object,
                default: function () {
                    return {
                        name:'选择市'
                    }
                }
            },
            area: {
                type:Object,
                default: function () {
                    return {
                        name:'选择区/县'
                    }
                }
            }
        },
        data: function () {
            return {
                currentIndex:-1,
                list: [],
                areaEmpty: {
                    province: {
                        name:'选择省'
                        //,areaId:37
                    },
                    city: {
                        name:'选择市'
                        //,areaId:37
                    },
                    area: {
                        name:'选择区/县'
                        //,areaId:37
                    }
                },
                level:0,
                chooseArea: [],
                params: {fid: ''}
            }
        },
        created: function () {
            this.init()

        },
        methods: {
            init: function () {
                var _this = this,
                        isReset = false,
                        areaName = Object.keys(this.areaEmpty);

                areaName.some(function (item, i) {

                    if (_this[areaName[i]].areaId) {

                        if (_this.level < 2) {
                            _this.param.fid = _this[areaName[i]].areaId;
                            _this.level = i + 1
                        }

                        _this.$set(_this.chooseArea, i, $.extend({}, _this[areaName[i]]))
                    } else {
                        // 省市县缺一，则清空数据
                        isReset = true;
                        //_this.param.fid = '';
                        //_this.level = 0;
                        return true;
                    }

                });

                // 重设地址选择
                if (isReset) {
                    this.clearGteArea(0);
                }

                // 获取地址数据
                this.getArea()
            },
            // 重置 该级别及以后级别的数据
            clearGteArea: function (level) {
                var areaName = Object.keys(this.areaEmpty), i = 0;

                for (i = level; i < areaName.length; i++) {
                    this.$set(this.chooseArea, i, $.extend({}, this.areaEmpty[areaName[i]]))
                }

                this.level = level;

                // 全省数据
                if (level == 0) {
                    this.params.fid = '';
                } else {
                    level--;
                    this.params.fid = this.chooseArea[level].areaId;
                }

            },
            // 获取地址数据
            getArea: function () {
                var _this = this;

                this.$axios.get(this.$api.getarea,{params: _this.params})
                    .then(res => {
                    _this.list = res.data;
                    console.log(res.data,'----------------------------')
                });
            },
            // 地址 tab 切换
            tabMeun: function (level) {
                var _this = this;

                level = Number(level);

                if (isNaN(level)) return;

                /*this.level = level;

                 // 全省数据
                 if (level == 0) {
                 this.param.fid = '';
                 } else {
                 level--;
                 this.param.fid = this.chooseArea[level].areaId;
                 }*/

                this.clearGteArea(level);
                this.getArea()

            },
            // 地址选择处理
            selectFn: function (index) {
                var item = this.list[index];

                item.index = index;
                this.$set(this.chooseArea, this.level, item);

                this.params.fid = item.areaId;

                // 向下移动一级
                if (this.level < 2) {
                    this.level++;
                    this.getArea(this.params)
                }

                // 最后
                if (this.level == 2 && this.chooseArea[this.level].areaId) {
                    console.log('== select ==')

                    this.closeFn();
                    this.$emit('onselect', this.chooseArea);

                }

            },
            // 关闭层通知事件
            closeFn: function () {
                this.$emit('onclose')
            }
        }
        }

</script>
<style scoped lang="scss">

</style>
