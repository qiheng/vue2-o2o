<template>

    <div ref="slideWrap" class="tab-slide-container gray" :class="{expand: isExpand}">
        <p class="tab-slide-hd"><slot name="title">切换分类</slot></p>
        <div ref="slideCon" class="tab-slide-inner">
            <slot></slot>
        </div>
        <div @click="expandFn" class="toggle-btn">
            <span class="pos-rt-middle"><i :class="{'icon-down-gray': !isExpand, 'icon-up-gray': isExpand}"></i></span>
        </div>
        <div @click="expandFn" class="tab-slide-mask"></div>
    </div>

</template>

<script>
    /**
     * tab-slide 组件
     * @param {slot} title - 展开的标题
     * @param {slot} default - 默认内容分发
     * @param {*} value - 组件展开隐藏
     */
    export default {
        props: {
            value: Boolean,
        },
        data() {
            return {}
        },
        mounted: function () {
            this.initData();
        },
        methods: {
        // 初始化
            initData: function () {
                this.noscrollbar()
            },
        // 展开隐藏
            expandFn: function () {

                this.isExpand = !this.isExpand;

            },
        // 展开无滚动条
            noscrollbar: function () {
                var $view = $('html, body');

                if (this.isExpand) {
                    $view.addClass('overflow-body');
                } else {
                    $view.removeClass('overflow-body');
                }
            }
        },
        computed: {
            isExpand: {
                get: function () {
                    return this.value;
                },
                set: function (val) {
                    this.$emit('input', val)
                }
            }
        },
        watch: {
            isExpand: function () {
                var _this = this;

                this.$nextTick(function () {
                    _this.noscrollbar()
                })
            }
        }
    }
</script>

<style>

</style>


