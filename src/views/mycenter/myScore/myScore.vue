<template>
    <div class="my-score">
        <div class="white checkIn-info ">
            <div class="container">
                <p class="pt20">剩余积分</p>
                <b class="score">{{ checkInfo.data.score }}</b>
                <b class="score"></b>
            </div>
        </div>

        <div class="about-score">
            <div class="checkIn-handler-panel">
                <p>马上签到获取更多积分</p>
                <router-link :to="{name:'scoreRecord'}" class="clearfix block mt20">
                    <span class="pull-left">
                        <img class="mr5" width="20" height="20" src="../../../assets/images/icons-v3/icons1/icon_jfmx.png" alt=""/>积分明细
                    </span>
                    <i class="arr-rt pull-right"></i>
                </router-link>

                <img @click="checkIn" class="checkIn-btn" :data-issignin="checkInfo.data.isSignin" width="52" height="52" src="../../../assets/images/icons-v3/icon_qiandao.png" alt=""/>
            </div>

            <dl class="panel-nobrd checkIn-rule">
                <dt class="panel-hd">积分获取规则</dt>
                <dd class="panel-chunk">
                    <span>完成分享</span>
                    <span class="pull-right">分享一次获1积分</span>
                </dd>
                <dd class="panel-chunk">
                    <span>每日签到</span>
                    <span class="pull-right">每日签到获1积分</span>
                </dd>
            </dl>
        </div>
        <div class="checkinScoreLayer hidden">
            <img width="100%" src="../../../assets/images/icons-v3/bg_jifen2.png" alt=""/>
            <div class="panel-chunk">
                <p class="txt">恭喜</p>
                <p class="status">签到成功</p>
                <p class="score">+1</p>
            </div>
        </div>
        <toast v-model="shows" type="text" width="20em" position="middle">{{text}}</toast>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import { Toast, Countdown } from 'vux'
    export default {
        components: {
            Toast,
            Countdown
        },
        data() {
            return{
                shows: false,
                text:'',
                checkInfo:{}
            }
        },
        created: function () {
            var _this = this;
            // 初始化签到页面
            this.$axios.get(this.$api.signinpage)
            .then(function(data){
                _this.checkInfo = data;
                console.log( _this.checkInfo.data.score,'332211321212');
                console.log( _this.checkInfo,'--------------------------');
                console.log(data,'kikiki')
            })
        },
        methods: {
            // 签到
            checkIn: function (e) {
                var _this = this,
                    target = e.target,
                    issignin = Number(target.dataset.issignin);

                // 执行签到
                if (!issignin) {
                    this.$axios.get(this.$api.signin)
                    .then(function(data){
                        _this.checkInfo.data.score = data.data.score;
                        _this.text = '签到成功';
                        _this.shows = true;
                        // 更改下签到的状态
                            _this.checkInfo.data.isSignin = 1;
                    })
                } else {
                    _this.text = '您今天已经签到';
                    _this.shows = true;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .checkIn-info {
        background: #e62739 url("../../../assets/images/icons-v3/bg_jifen.png") no-repeat 50% 70%;
        background-size: 100%;
        padding-bottom: 46%;
        height: 0;
        .score {
            font-size: 64px;
            font-family: Arail;
            line-height: 70px;
        }
    }

    .about-score {
        position: relative;
        margin: 70px 10px 0;
    }

    .checkIn-handler-panel {
        position: absolute;
        width: 100%;
        left: 0;
        top:-100px;
        padding: 15px 10px;
        border-radius: 5px;
        background-color: #fff;
    }

    .checkIn-rule {
        border-radius: 5px;
        padding: 10px 0;
        .panel-hd {
            border-bottom: 0;
            font-weight: 700;
        }
        .panel-chunk:nth-of-type(1) {
            border-top: 0;
        }

    }
    .checkIn-btn {
        position: absolute;
        top: -25px;
        right: 10px;
    }

    .checkinScoreLayer {
        width: 260px;
        padding-top: 265px;
        border-radius: 5px;
        background: #fff url("../../../assets/images/icons-v3/bg_jifen2.png") no-repeat 50% 0;
        background-size: 100%;
        margin: 0 auto;
        .txt {
            font-size: 20px;
        }
        .score{
            position: absolute;
            left: 110px;
            top: 50%;
            margin-top: -20px;
            font-size: 28px;
            color:#55d065
        }
    }
</style>
