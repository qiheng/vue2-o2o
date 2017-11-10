<template>
    <form class="fm-control fm-findPwd">
		<div class="ptb20 text-center">
			<img width="120" src="../../assets/images/set-pwd.png" alt="">
		</div>
		<div class="fm-group mt10">	
			<div class="fm-line">
				<label class="l-label l-pwd"></label>
				<input id="password" type="password" class="protect-pwd" placeholder="请输入新的登录密码" v-model="params.password" v-show="!showpassword">
				<input type="text" class="public-pwd" placeholder="请输入新的登录密码" v-model="params.password" v-show="showpassword" />
				<span class="J-btn-switch btn-switch" :class="showpassword ? 'checked' : ''" @click="pwdoper()">...</span>
			</div>
		</div>
		
		<div class="container mt30">
			<input type="button" value="提交" class="btn btn-block btn-primary btn-lg" @click="onSubmit()">
		</div>

	</form>
</template>

<script>
import validator from '@/assets/js/validator';

export default {
    data() {
        return {
            showpassword: false,
            params: {
                password:'',
                phone:'',
                forgetStepOne:''
            }
        }
    },
    created() {
        this._init();
    },
    methods: {
        // 初始化
        _init() {
            validator.config = {
                password: [{strategy: 'isNonEmpty', errorMsg: '请输入密码！'}, {strategy: 'isPassword'}]
            }

            var query = this.$route.query;
            this.params.forgetStepOne = query.forgetStepOne;
            this.params.phone = query.phone;
        },
        // 密码是否显示明文
        pwdoper() {
            this.showpassword = !this.showpassword;
        },
        onSubmit() {
            const _this = this;

            // 校验表单
            if (!validator.validate(this.params, true)) {

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

            this.$axios.post(this.$api.forgetpasswordstep2,$.param(this.params))
                .then((res) => {
                    if(res.status == 1){
                        this.$router.push({name:'login'})
                    } else{
                        _this.$notiejs({
                            state: 2,
                            msg: res.msg,
                            end () {
                                _this.isDisabled = false
                            }
                        });
                    }
                })
        }
    }
}
</script>

<style>

</style>
