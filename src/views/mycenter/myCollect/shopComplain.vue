<template>
    <div class="animsition" v-cloak>
        <!-- 店铺信息 start -->
        <div class="panel-nobrd">
            <div class="panel-hd gray bg-gray">商家名称</div>
            <div class="panel-bd">
                <p>{{ query.name }}</p>
                <p class="lightgray f12 mt5">{{ query.wholeAddress }}</p>
            </div>
        </div>
        <!-- 店铺信息 end -->

        <!-- 店铺信息 start -->
        <div class="panel-nobrd">
            <div class="panel-hd gray bg-gray">投诉原因</div>
            <ul>
                <li v-for="(seterroritem, index) in seterrorlist" class="J-radio panel-chunk"><i class="i-radio mr15" :class="{checked:active==index}" @click="setRadio(index,seterroritem)"></i>{{ seterroritem.title }}</li>
            </ul>
        </div>
        <!-- 店铺信息 end -->

        <div class="container mt30">
            <a @click.prevent="setError" href="javascript:;" class="btn btn-block btn-primary btn-lg" :class="{disabled:isDisabled}">提交</a>
        </div>
        <toast v-model="shows" type="text" width="24em" position="middle">{{text}}</toast>
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
            return {
                shows: false,
                text:'',
                isDisabled: false,
                seterrorlist:[],
                active:-1,
                param: {
                    content:'',
                    shopId: '',
                    name:''
                }
            }
        },
        created: function () {
            var _this = this;
            console.log(_this.param)
            this.param.shopId = this.query.shopId;
            this.param.name = this.query.name;
            // 投诉类型列表
            _this.$axios.get(_this.$api.seterrorlist)
                .then(function (seterrorlist) {
                    _this.seterrorlist = seterrorlist.data;

                    _this.$nextTick(function () {
                        _this.setRadio();
                    })
                })
        },
        methods: {
            setError: function () {
                var _this = this;
                if (_this.isDisabled) return;
                _this.isDisabled = false;
                if (_this.param.content == undefined) {
                    _this.text = '请选择投诉原因';
                    _this.shows = true;
                    _this.isDisabled = false;
                    return false;
                }
                // 提交纠错
                _this.$axios.get(_this.$api.seterror,{params:this.param})
                    .then(function () {
                        _this.text = '提交成功';
                        _this.shows = true;
                        _this.$router.push({ path: 'shopDetail',query:{'shopId':_this.param.shopId,'name':_this.param.name} })
                        _this.isDisabled = false;
                    }).catch(function () {
                    _this.isDisabled = false;
                })

            },
            setRadio:function (index) {
                console.log('66666666666666666666666666666')
                var _this = this;
               _this.active = index;
                _this.param.content = index
            }
        },
        computed: {

            query () {
                return this.$route.query
            }
        }
    }

</script>

<style>

</style>
