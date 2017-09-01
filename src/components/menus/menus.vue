<template>
    <nav class="mod-box tap-panel tab-panel-primary">
        <a href="javascript:void(0)" class="box-flex tap-meun" @click="selectType(index)" v-for="(item,index) in types" :class="{'tap-menu-on':active == index}" v-html="item.text"></a>
    </nav>
</template>

<script>
    export default {
                props: {
                    types: {
                        type: Array,
                        required: true
                    }
                },
            data(){
                return{
                    active:0
                }
            },

        methods: {
            selectType: function(index) {
                this.$emit('onchange', index);
                this.active = index;
            }
        }
    }
</script>

<style>
    .tap-menu-on{
        border-bottom: 1px solid palevioletred;
    }
</style>
