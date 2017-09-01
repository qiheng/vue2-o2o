<template>
    <!-- 内容 start -->
    <div class="about-us">
        <div class="container pt10 about-con" v-html="page">

        </div>
    </div>
    <!-- 内容 end -->
</template>

<script>
    export default {
        data() {
            return {
                page:''
            }
        },
        mounted:function () {
            var _this = this;
            this.$axios.get(this.$api.bankcardpage)
                .then(function (data) {
                    _this.page = data;
                })
        }
    }
</script>

<style>
    .about-con {text-indent: 2em;background: #ffffff;}

</style>
