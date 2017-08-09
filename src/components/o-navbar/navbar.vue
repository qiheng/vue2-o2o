<template>
    <nav class="mod-box tap-panel" :class="classes">
        <slot></slot>
    </nav>
</template>

<script>
	export default {
		data () {
            return {}
        },
        props: {
            fixed: Boolean,
            type: String,
            value: {}
        },
        computed: {
            classes () {
                return [
                    this.type ? `tab-panel-${this.type}` : '',
                    {
                        'is-fixed': this.fixed,
                    },

                ]
            }
        }
	}
</script>

<style lang="less" scoped>
    .tap-panel {
        background-color: #fff;

        &.is-fixed {
            position: fixed;
            width: 100%;
         }
    }
</style>
