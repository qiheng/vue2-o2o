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
            <a @click.prevent="unbindCard(bankCardDetail.usersBankId)" href="javascript:;" class="btn btn-lg btn-block btn-primary">解除绑定</a>
        </div>
        <!-- 解除绑定 end -->
    
    </div>
    <!-- 银行卡 end -->
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            bankCardDetail: {}

        }
    },
    created() {
        var _this = this;

        this.bankCardDetail = JSON.parse(localStorage.getItem('__bankCardDetail')) || {};
        // _this.$nextTick(function () {
        //     _this.pressToggle($('.my-card-opt'));
        // })

    },
    methods: {
        // 显示解绑按钮
        pressToggle($el) {
            alert('pay')
            // $el.hammer().bind('press', function (evt) {
            //     var $target = $(evt.target),
            //         oGesture = evt.gesture;

            //     if ($target.hasClass('expanded')) {
            //         $target.removeClass('expanded');
            //     } else {
            //         $target.addClass('expanded');
            //     }

            //     return false;
            // });
        },
        // 解绑银行卡
        unbindCard(usersBankId, index) {
            alert('pay')
            // payPwdLayer(function (layero, idx) {
            //     var $inpt = $(layero).find('.int-pwd'), _val;

            //     // 处理密码
            //     $inpt.off('keyup').on('keyup', function () {
            //         _val = $.trim($inpt.val());

            //         if (/^\d{6}$/.test(_val)) {
            //             _A.getUnsetbankCardDetailData({ usersBankId: usersBankId }, function () {
            //                 _this.bankCardDetailList.splice(index, 1);
            //                 layer.close(idx);
            //             });
            //         }

            //     })

            // });
        }
    }
}   
</script>