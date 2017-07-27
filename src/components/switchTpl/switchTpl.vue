<template>     <!--  switch  -->
    <label class="btn-switch" :class="{checked: currentValue}">
        <input class="hidden" @change="changeFn" type="checkbox" v-model="currentValue">
    </label>
</template>

<script>
    export default {
        props: {
            value: Boolean
        },

        methods: {
        changeFn: function () {
            this.$emit('change', this.currentValue)
        }
    },
        computed: {
            currentValue: {
                get: function () {
                    return this.value
                },
                set: function (val) {
                    this.$emit('input', val)
                }
            }
        }
    }
</script>