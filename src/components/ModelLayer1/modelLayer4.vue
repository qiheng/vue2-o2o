<template>
    <div class="input-pwd-layer" :class="{show: layerData.visible}" @click="closeFn">
        <div class="mod-layer-cons" @click.stop="payPass">
            <h2 class="f16 gray">请输入支付密码</h2>
            <div class="int-pwd-outer">
                <input type="password" class="int-pwd" maxlength="6" v-model="password">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        layerData: {
            type: Object,
            default: {
                visible: false
            }
        },
    },
    data() {
        return {
            password: ''
        }
    },
    methods: {
        payPass() { },
        closeFn() {
            this.password = '';
            this.$emit('onclose')
        }
    },
    watch: {
        password(oldval, newval) {
            if (oldval.length === 6) {
                this.$emit('paying',oldval)
            }
        }
    }
}
</script>
<style >
.input-pwd-layer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    background-color: transparent;
    visibility: hidden;
    transition: background-color .5s;
}

.input-pwd-layer.show {
    background-color: rgba(0, 0, 0, 0.2);
    visibility: visible;
}

.mod-layer-cons {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 158px;
    padding: 10px 13px;
    transform: translate(-50%, -50%);
    background-color: #fff
}
</style>
