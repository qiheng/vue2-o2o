<template>
    <div class="animsition qrcode-wrap" v-cloak>
        <div class="four-fifths center-block panel-nobrd qrcode-panel" style="width: 90%;">
            <div class="panel-bd">
                <qrcode :value="src" type="img" style="text-align: center"></qrcode>
            </div>
        </div>
        <!-- 店铺信息 start -->
        <div class="clearfix center-block panel-nobrd shop-info-panel">
            <img width="45" height="45" class="radius50 pull-left mr15" src="../../../assets/images/find-QR-code.png" alt=""/>
            <div class="bfc-panel">
                <h2 class="f32 mt2">{{ query.name }}</h2>
                <p class="lightgray f22 mt5">扫一扫二维码,关注改店</p>
            </div>
        </div>
        <!-- 店铺信息 end -->
        <div class="container mt30">
            <a @click="shareShop" href="javascript:;" class="J-share1 btn btn-primary btn-block btn-lg" :class="{disabled:isDisabled}">分享二维码</a>
        </div>
    </div>
</template>

<script>
    import utils from '@/utils/utils';
    import { Qrcode } from 'vux'

    export default {
        components: {
            Qrcode,
        },
        data() {
            return {
                isDisabled: false,
                name:'',
                seterrorlist:[],
                src:''
            }
        },
        mounted() {
            this.src  = decodeURIComponent(this.query.url)
            console.log(this.src,'++++++++++++++++++++++++++++++++++++++');
            this.name = this.query.name;
        },
        methods: {
            saveQrcode: function () {
                var _src = $('#qrcode').find('img').attr('src');
                this.$router.back();
            },
            shareShop() {
                this.$router.back();
            }
        },
        computed: {
            isHdfk: function () {
                this.$router.back();
            },
            query () {
                return this.$route.query
            }
        }
    }
</script>

<style>
    .qrcode-wrap .qrcode-panel {
        width: 90%;
        margin-top: 10%;
        margin-bottom: 5%;
    }

    .qrcode-wrap .qrcode-panel .panel-bd {
        padding: 20px;
    }

    .shop-info-panel {
        width: 90%;
        padding: 20px;
    }
    #qrcode {
        width: 100%;
        height: 0;
        text-align: center;
        padding-bottom: 100%;
    }
</style>
