<template>
    <!-- 关于我们 start -->
    <div class="about-us">
        <div class="container pt10 about-con" v-html="content">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                content:''
            }
        },
        created:function(){
            this.$axios.get(this.$api.aboutus)
            .then(data => {
                this.content = data;
                console.log(data,'++++++++++++++');
            })
        }
    }
</script>
<style scoped>
    .about-con {text-indent: 2em;background: #ffffff;}
</style>
