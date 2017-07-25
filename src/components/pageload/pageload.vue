<template>
    <div class="pageload">
        <div class="overlayer"></div>
        <div id="pageload" :style="zIndex"><i></i><i></i><i></i></div>
    </div>
</template>


<script>
    export default {
        props: {
            value: {},
            zIndex: {
                type: Number,
                default: 1000
            }
        },
        data () {
            return {
                zIndex
            }
        }
    }
</script>

<style>

</style>
