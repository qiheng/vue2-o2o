<template>
    <form class="fm-control fm-reg">

        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label l-account" for="phone"></label>
                <input id="phone" type="tel" name="phone" placeholder="请填写注册手机号" v-model="params.phone" />
            </div>

            <div class="fm-line">
                <label class="l-label l-code" for="code"></label>
                <input id="code" type="text" name="code" placeholder="请输入短信验证码" style="width:50%" v-model="params.code" />
                <a href="javascript:;" class="btn get-verCode" :class="!vaildcode ? 'disabled':''" @click="getCode($event)">获取验证码</a>
            </div>
            <div class="fm-line">
                <label class="l-label l-pwd"></label>
                <input id="password" type="password" class="protect-pwd" name="password" placeholder="6-20位字母、数字组合" v-model="params.password" v-show="!showpassword" />
                <input type="text" class="public-pwd" placeholder="6-20位字母、数字组合" v-model="params.password" v-show="showpassword" />
                <span class="J-btn-switch btn-switch" :class="showpassword ? 'checked' : ''" @click="pwdoper()">...</span>
            </div>
        </div>

        <div class="container mt30">
            <a href="javascript:;" class="btn btn-block btn-primary btn-lg" @click="onSubmit()">注册</a>
            <p class="p-agre text-center mt20">
                <label for="agre"><input id="agre" type="checkbox" v-model="protocol" />我已阅读并同意</label>
                <router-link :to="{name:'registerProtocol'}">《用户注册协议》</router-link>
            </p>
        </div>
    </form>
</template>

<script>
	import validator from '@/assets/js/validator';
	
    export default {
        data() {
            return {
                vaildcode:true,         //true可以获取验证码,false正在倒计时
                time:60,                //验证码倒计时时间
                showpassword:false,     //是否显示明文密码
                protocol: true,         //同意协议
            	params:{
            		phone:'',
            		code:'',
            		password:''
            	}
            }
        },
        created(){
        	this._init();
        },
        methods: {
            // 初始化
        	_init() {
        		validator.config = {
                	phone: [{strategy: 'isNonEmpty', errorMsg: '请输入手机号码！'}, {strategy: 'isMobile'}],
	                password: [{strategy: 'isNonEmpty', errorMsg: '请输入密码！'}, {strategy: 'isPassword'}],
	                code:[{strategy: 'isNonEmpty', errorMsg: '请输入验证码！'}, {strategy: 'maxLength:6',errorMsg:'验证码最长6位'}]
	            }
            },
            // 获取验证码
        	getCode(e) {
        		var phone = {phone: this.params.phone};
                if(this.verify(phone) !== undefined){
                    console.log(this.verify(phone));
                    return false;
                }
                
                if(this.vaildcode){
                    this.$axios.post(this.$api.sendcodeByRegist,$.param(phone))
                        .then((res) => {
                            this.$vux.toast.text(res.msg, 'top');
                        })

                    this.vaildcode = false;

                    var timer = setInterval(() => {
                        this.time--;
                        $(e.target).text(this.time+'s重新获取');
                        
                        if(this.time == 0){
                            $(e.target).text('重新获取');

                            clearInterval(timer);
                            this.time = 60;
                            this.vaildcode = true;
                        }
                    },1000)
                }

            },
            // 提交表单
        	onSubmit() {
                if(this.verify(this.params) !== undefined){
                    console.log(this.verify(this.params));
                    return false;
                };

                let _this = this;
                if(!this.protocol){
                    _this.$notiejs({
                        state: 2,
                        msg: '请同意注册协议！',
                        end () {
                            _this.isDisabled = false
                        }
                    });

                    return false;
                }

                this.$axios.post(this.$api.register,$.param(this.params))
                    .then((res) => {
                        var msg = res.msg;

                        if(res.status == 1){
                            msg = '注册成功！';

                            setTimeout(() => {
                                this.$router.push({name:'home'});
                            },500)
                        }

                        this.$vux.toast.text(msg, 'middile')

                    })
            },
            // 密码是否显示明文
            pwdoper() {
                this.showpassword = !this.showpassword;
            },
            // 表单校验
            verify(params) {
                const _this = this;
                if (!validator.validate(params, true)) {

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
	
	            }
            }
        }
    }
</script>

<style>

</style>
