<template>
    <!-- 积分商城 start -->
    <div class="jfen-shop-wrap" v-cloak>
        <empty :msg="emptyMsg">
            <img slot="icon" width="100" src="../../../assets/images/empty/img_wzjsz@2x.png" alt=""/>
            <a href="javascript:;" slot="button" onclick="window.history.go(-1)"  class="btn btn-default mt20">返回上一页</a>
        </empty>
    </div>
    <!-- 积分商城 end -->
</template>
<script>
    export default {
        data(){
            return{
                emptyMsg: {
                    mainMsg: '积分商城还在建设中...'
                },
            }
        },
        methods: {
            back: function () {
                redirect_url(forward())
            }
        },
    }
</script>
