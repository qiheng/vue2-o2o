<template>
    <div class="register-protocol" v-html="content"></div>
</template>

<<script>
export default {
    data() {
        return {
            content:''
        }
    },
    created() {
        this.$axios.get(this.$api.registerpage)
            .then((res) => {
                this.content = res;
            })
    }
}
</script>

<style>

</style>
