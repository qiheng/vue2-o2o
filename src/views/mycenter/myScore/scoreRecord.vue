<template>
    <!-- 积分记录 start -->
    <div class="score-record">
        <div class="panel">
            <!-- 数据区 -->
            <div class="f16 panel-chunk" v-for="(scoreRe,index) in record">
                <h3>{{scoreRe.summary}}</h3>
                <p class="f14 lightgray mt5">{{scoreRe.ctime}}</p>
                <ins class="pos-rt-middle limegreen">{{scoreRe.change}}</ins>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                record:[],
            }
        },
    // 页面初始化
        created:function(){
            var _this = this;
            this.$axios.get(this.$api.scorelog)
            .then(function(data,status){
                 _this.record = data.data;
                 console.log(data.summary,'21221332132132');
                 console.log(_this.record,'+++++++++++++++++++++++++++');
            })
        }
    }
</script>

<style>

</style>