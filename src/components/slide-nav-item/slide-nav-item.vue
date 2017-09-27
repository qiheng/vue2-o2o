<template>
    <li @click.stop="nav"
        :class="{on: id == $parent.value}">
        <a href="javascript:;"><slot></slot></a>
    </li>
</template>

<script>
    export default {
        /**
         * slide-nav-item 组件
         * @desc 配合 slide-nav 组件使用
         * @param {*} id - 选中后的返回值，任意类型
         * @param {slot} - 文字
         */
//        template: '<li @click.stop="$parent.$emit(\'input\', id)"\
//                    :class="{on: id == $parent.value}">\
//                    <a href="javascript:;"><slot></slot></a>\
//                    </li>',
        props: ['id'],
        methods:{
            nav(){
                this.$emit('input', id)
            }
        }
    }
</script>

<style>

</style>
