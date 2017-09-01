<template>
    <form action="/">
        <dl class="mtb20">
            <dt class="container">意见反馈</dt>
            <dd class="mt10">
                <textarea name="content" v-model="params.content" placeholder="请输入您的反馈意见（1000字以内）"></textarea>
            </dd>
        </dl>
        <dl>
            <dt class="container">联系电话</dt>
            <dd class="mt10">
                <input type="tel" name="link" v-model="params.link" placeholder="请输入您的手机号，方便我们联系您">
            </dd>
        </dl>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="提交" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
    </form>
</template>
<script>
    import validator from '@/assets/js/validator'
    import {mapGetters} from 'vuex'
    import qs from 'qs'
    export default {
        data(){
            return{
                isDisabled:false,
                params:{
                    content:'',
                    link:''
                }
            }
    },
    created:function(){
        this.init()
    },
    methods:{

        init:function(){
            // 登录
            validator.config = {
                content: [{strategy: 'isNonEmpty', errorMsg: '请输入内容！'}],
                link: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}]
            }
        },
        submitFn: function () {
            let _this = this,
                oValChar = {};

            if (this.isDisabled) return;
            this.isDisabled = true;

            // 校验字段
            $.each(validator.config, key => {
                oValChar[key] = _this.params[key]
            });

            console.log('oValChar:',oValChar)

            // 校验表单
            if (!validator.validate(oValChar, true)) {

                return $.each(validator.messages, (i, val) => {

                    _this.$notiejs({
                        state: 2,
                        msg: val,
                        end () {
                            _this.isDisabled = false
                        }
                    });
                    return false;
                })
            };

            var newVal = qs.stringify(this.params)
            this.$axios.post(this.$api.opinion, newVal)
                .then(function ({status, data}) {
                    _this.$notiejs({
                        state: 1,
                        msg: '提交成功',
                        end () {
                            window.location.href = 'http:localhost:8089/#/mycenter/mySetup'
                        }
                    })
                    if(status !=1){
                        _this.$notiejs({
                            state: 2,
                            msg: val,
                            end () {
                            _this.isDisabled = false
                            }
                        })
                    }
                    return false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>
<style lang="less" scoped>
    textarea, input[type] {
        border: 1px solid #e5e5e5;
        border-left: 0;
        border-right: 0;
        display: block;
        width: 100%;
        padding: 10px;}
    textarea { height: 150px;}
</style>
