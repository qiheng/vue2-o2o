<template>
    <div>
        <div class="panel-nobrd total-money-panel">
            <div class="panel-bd white">
                <h3>我的余额</h3>
                <p class="balance">{{mymoney.balance}}</p>
            </div>
        </div>

        <div class="panel-nobrd mt20">
            <router-link :to="{name:'myBankCard'}" class="panel-chunk">
                <img class="pull-left" width="19" height="19" src="../../../assets/images/icons-v3/icons1/icon_yhk.png" alt="" /> &nbsp;&nbsp;银行卡
                <span class="pull-right mr20">
                    <ins class="emb-red nums">{{mymoney.bankCardCount}}</ins> 张</span>
                <i class="arr-rt pos-rt-middle"></i>
            </router-link>
            <router-link :to="{name:'walletDetails'}" class="panel-chunk">
                <img class="pull-left" width="19" height="19" src="../../../assets/images/icons-v3/icons1/icon_mingxi.png" alt="" /> &nbsp;&nbsp;钱包明细
                <i class="arr-rt pos-rt-middle"></i>
            </router-link>
        </div>

        <div class="container mt30">
            <a class="btn btn-lg btn-block btn-success" href="wallet-recharge.html?balance=<%- mymoney.balance %>">充值</a>
            <router-link class="btn btn-lg btn-block btn-default mt15" :to="{name:'withdrawDeposit'}">提现</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mymoney: ''
        }
    },

    created: function () {
        var _this = this;
        _this.$axios.get(_this.$api.mymoney)
            .then(function (result) {
                _this.mymoney = result.data;
                console.log(result);
            })
    }
}
</script>
