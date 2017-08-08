<template>
    <transition name="router-fade">
        <div ref="notiejs" v-show="visible" class="alert text-center" :class="[alignclass, stateClass]" v-html="msg"></div>
    </transition>
</template>

<script>
    export default {
        props: {
            msg: {
                type: String,
                default:''
            },
            stateClass: {
                type: String,
                default:''
            },
            alignclass: {
                type: String,
                default:''
            }
        },
        data () {
            return {
                visible: false
            }
        }
    }
</script>

<style lang="" scoped>

</style>
