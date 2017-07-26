<template>
    <div @click="closeFn" class="mod-layer-1 classify-choose-layer" :class="{show: show}">
        <div @click.stop class="mod-layer-con">
            <div class="mod-layer-hd">
                <h2 class="mod-layer-tit">{{ title }}</h2>
            </div>
            <div class="mod-layer-bd">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            value: Boolean,
            title: {
                type: String,
                default: '温馨提示',
            }
        },
        data: function () {
            return {
                show: this.value
            }
        },

        methods: {
            closeFn: function () {
                this.$emit('input', false)
            }
        },
        watch: {
            value: function (val) {
                this.show = val
            }
        }
    }
</script>
<style scoped lang="scss">

</style>
