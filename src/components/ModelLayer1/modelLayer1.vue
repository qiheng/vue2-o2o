<template>
    <div @click="closeFn" class="mod-layer-1 classify-choose-layer" :class="{show: layerData.visible}">
        <div class="mod-layer-con">
            <div class="mod-layer-hd">
                <h2 class="mod-layer-tit">{{ layerData.title }}</h2>
            </div>
            <div class="mod-layer-bd">
                <ul class="panel classify-choose-list">
                    <li @click.stop="selectFn(index)" v-for="(item, index) in layerData.list"
                    :key="item.name"
                    class="panel-chunk" :class="{on: currentIndex === index}">{{ item.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            layerData: {
                //required:true,
                type:Object,
                default () {
                    return {
                        visible: false,
                        list:[]
                    }
                }
            }
            //,isLayerShow: {
            //    required:true,
            //    type:Boolean,
            //    default: true
            //}
        },
        data: function () {
            return {
                currentIndex:-1,
                type:''
            }
        },
        updated: function () {
            if (this.type != this.layerData.type) {
                this.currentIndex = -1;
            }

            //console.log(this.layerData.visible)
        },
        methods: {
            selectFn: function (index) {
                var item = this.layerData.list[index];

                this.currentIndex = index;
                this.$emit('onselect', this.layerData.type, item);
                this.type = this.layerData.type;

            },
            closeFn: function () {
                this.$emit('onclose')
            }
        }
    }
</script>
<style>

</style>
