<template>
    <!-- <form class="fm-control fm-findPwd" action="/out/forgetpassword" method="POST"> -->
    <form>
		<div class="fm-group mt10">
			<div class="fm-line">
				<label class="l-label l-account"></label>
				<input id="phone" type="tel" name="phone" placeholder="请填写注册手机号" v-model="params.phone">
			</div>
			<div class="fm-line l-code">
				<label class="l-label"></label>
				<input id="code" type="text" name="code" placeholder="请输入短信验证码" v-model="params.code">
				<a href="javascript:;" class="btn get-verCode" :class="!vaildcode ? 'disabled':''" @click="getCode($event)">获取验证码</a>
			</div>
		</div>
		<div class="container mt30">
            <a href="javascript:;" class="btn btn-block btn-primary btn-lg" tabindex="5" @click="onSubmit()">下一步</a>
		</div>
	</form>
</template>

<script>
import validator from '@/assets/js/validator';

export default {
    data() {
        return {
            vaildcode: true, //获取验证码
            time: 60,
            params: {
                phone:'',
                code:''
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
                        if(res.status == 1){
                            this.$vux.toast.text('短信已发送', 'top');
                        } else{
                            this.$vux.toast.text(res.msg, 'top');
                        }
                        
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

            this.$axios.post(this.$api.forgetpasswordstep1,$.param(this.params))
                .then((res) => {
                    if(res.status == 1){
                        this.$router.push({name:'restPassword',query:{phone:this.params.phone,forgetStepOne:this.params.code}});
                        return;
                    }
                    this.$vux.toast.text(res.msg, 'middile')
                })
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
