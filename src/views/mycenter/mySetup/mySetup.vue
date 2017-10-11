<template>
    <!-- 我的设置 start -->
    <div class="my-center" v-cloak>

        <div class="panel">
            <router-link id="aboutus" class="block panel-chunk" :to="{name:'aboutUs'}">
                <h3>关于我们</h3>
                <i class="arr-rt"></i>
            </router-link>
            <router-link class="block panel-chunk " :to="{name:'userCoupleBack'}">
                <h3>用户反馈</h3>
                <i class="arr-rt"></i>
            </router-link>
            <a id="logout" class="block panel-chunk" href="javascript:;" @click="logOut">
                <h3>退出</h3>
                <i class="arr-rt"></i>
            </a>
        </div>
        <!--<router-link :to="{name:'mycenter'}" class="go-back"></router-link>-->
    </div>
    <!-- 我的设置 end -->

</template>
<script>
    export default {
        data(){
            return{
            }
        },
        methods: {
            logOut:function(){
                this.$axios.get(this.$api.logout)
                   .then(({data, status}) => {
                    console.log(data,'++++++++++++++');
                })
            }
        }
    }

</script>
<style scoped>
    body{
        position: relative;
    }
</style>

