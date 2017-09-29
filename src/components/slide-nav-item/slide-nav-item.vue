<template>
    <li @click.stop="nav(id)"
        :class="{on: id == $parent.value}">
        <a href="javascript:;"><slot></slot></a>
    </li>
    <!--<slideNav></slideNav>-->
</template>

<script>
    /**
     * slide-nav-item 组件
     * @desc 配合 slide-nav 组件使用
     * @param {*} id - 选中后的返回值，任意类型
     * @param {slot} - 文字
     */

    export default {
        props: ['id'],

        methods: {
            nav(id) {
                this.$parent.$emit('input', id)
            }
        }
    }
</script>

<style>

</style>
