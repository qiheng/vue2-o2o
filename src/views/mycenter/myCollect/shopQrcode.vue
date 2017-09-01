<template>
    <div class="animsition qrcode-wrap" v-cloak>

        <div class="four-fifths center-block panel-nobrd qrcode-panel" style="width: 90%;">
            <div class="panel-bd">
                <div id="qrcode"></div>
            </div>
        </div>

        <!-- 店铺信息 start -->
        <div class="clearfix center-block panel-nobrd shop-info-panel">
            <img width="45" height="45" class="radius50 pull-left mr15" src="../../../assets/images/find-QR-code.png" alt=""/>

            <div class="bfc-panel">
                <h2 class="f16 mt2">{{ query.name }}</h2>
                <p class="lightgray f12 mt5">扫一扫二维码,关注改店</p>
            </div>
        </div>
        <!-- 店铺信息 end -->

        <div class="container mt30">
            <a @click="shareShop" href="javascript:;" class="J-share1 btn btn-primary btn-block btn-lg" :class="{disabled:isDisabled}">分享二维码</a>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDisabled: false,
                name:'',
                seterrorlist:[]
            }
        },
        mounted: function () {
            var _this = this;

            this.name = this.query.name;
            var _this = this;
            this.qrcode();
        },
        methods: {
            saveQrcode: function () {
                var _src = $('#qrcode').find('img').attr('src');
//                redirect_url(_src)
            },
            qrcode: function () {
                var _this = this,
                    _width = $('#qrcode').width(),
                    opts = {
                        render: 'image',
                        mode: 0,
                        ecLevel: 'L',
                        fill: '#000',
                        size: _width,
                        minVersion: 6,
                        maxVersion: 40,
                        text: _this.query.url,
                        background:'#fff',
                        quiet:1,
                        mPosX: 0.5,
                        mPosY: 0.5,
                        mSize: 0.1,
                        radius: 0.5,
                        image: null
                    };
                // 生成二维码
//                $('#qrcode').empty().qrcode(opts);
            },
            shareShop: function () {
//                redirect_url('shareShop');
            }
        },
        computed: {
            isHdfk: function () {
                // return this.ordersItem.shop.shopTypeId == config.shopTypeId.spws && this.ordersItem.payType === this.HDFK_VAL
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
