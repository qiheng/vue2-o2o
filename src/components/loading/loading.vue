<template>  <!-- loading加载效果  -->
    <div id="conLoading" v-show="show" class="text-center ptb10">
        <slot name="icon">
            <img src="../../assets/images/loading-1.gif" alt="" />
        </slot>
        <div class="loading-text" v-if="text" v-html="text"></div>
        <div class="loading-text" v-else><slot></slot></div>
    </div>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            text: String
        },
        data () {
            return {
                show: false
            }
        },
        created () {
            if (this.value) {
                this.show = true
            }
        },
        watch: {
            value (val) {
                this.show = val
            },
            show (val) {
                if (val) {
                    console.log('--loading--', val)
                }
            }
        }
    }
</script>

