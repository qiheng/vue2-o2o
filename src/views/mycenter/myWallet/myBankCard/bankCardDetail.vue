<template>
    <!-- 银行卡 start -->
    <div class="bankcard-detail-panel" v-cloak>
        <div class="p100">
            <ul class="my-card-list mt10">
                <li class="panel-item clearfix my-card-opt">
                    <img class="pull-left mr10 radius50" width="36" height="36" :src="bankCardDetail.bankPic+'?x-oss-process=image/resize,m_fixed,h_115,w_115'" alt="" />
                    <div class="bfc-panel">
                        <h2 class="f16">{{ bankCardDetail.bankName }}</h2>
                        <p class="gray mt10 lightgray">{{bankCardDetail.bankCardNo}}</p>
                    </div>
                    <a @click.prevent="unbindCard(bankCardDetail.usersBankId)" href="javascript:;" class="J-unbind-card unbind-btn">解除绑定</a>
                </li>
            </ul>
        </div>
    
        <div class="panel-nobrd">
            <div class="panel-chunk">持卡人姓名
                <ins class="ml15">{{ bankCardDetail.username }}</ins>
            </div>
            <div class="panel-chunk">开户支行&nbsp;&nbsp;&nbsp;&nbsp;
                <ins class="ml15">{{ bankCardDetail.bankSubname }}</ins>
            </div>
        </div>
    
        <!-- 解除绑定 start -->
        <div class="container mt30">
            <a @click.prevent="toggleAddress" href="javascript:;" class="btn btn-lg btn-block btn-primary">解除绑定</a>
        </div>
        <!-- 解除绑定 end -->
        <model-layer4 :layerData="layerData" @onclose="closeLayerFn" @paying="payValidatorFn"></model-layer4>
    </div>
    <!-- 银行卡 end -->
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            param: {
                usersBankId: ''
            },
            password: '',
            bankCardDetail: {},
            layerData: {
                visible: false
            },
        }
    },
    created() {
        var _this = this;
        this.bankCardDetail = JSON.parse(localStorage.getItem('__bankCardDetail')) || {};
    },
    methods: {
        payValidatorFn(result) {


            console.log(this.$route)

            // this.param.usersBankId = this.bankCardDetail.usersBankId
            // let usersBankId = qs.stringify(this.param)
            // this.$axios.post(this.$api.unsetbankcard, usersBankId)
            //     .then(request => {
            //         this.$notiejs({
            //             state: request.msg == '操作失败' ? 2 : 1,
            //             msg: request.msg == '操作失败' ? '银行卡解绑失败' : '银行卡解绑成功'
            //         });
            //         this.$router.replace(this.$route.query.redirect)
            //     })
        },
        toggleAddress() {
            this.layerData.visible = !this.layerData.visible
        },
        closeLayerFn() {
            this.layerData.visible = false;
        }
    }
}   
</script>