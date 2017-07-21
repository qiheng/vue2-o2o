<template>
    <div class="empty-tips-panel">
        <slot name="icon">
            <img width="120" height="120" src="../../assets/images/no-data.png" alt="">
        </slot>
        <div class="gray f16">
            <p v-if="msg.mainMsg" v-html="msg.mainMsg"></p>
            <p v-if="msg.subMsg" class="f14 lightgray" v-html="msg.subMsg"></p>
            <!--<p>{{msg}}</p>-->
        </div>
        <slot name="button"></slot>
    </div>
</template>

<script>
    export default {
        //props:['msg'],
        props:{
            msg: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {}
        }
    }
</script>

<style scoped>

</style>
