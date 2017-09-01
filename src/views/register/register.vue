<template>
    <form class="fm-control fm-reg" action="/out/register" method="POST">
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label l-account" for="phone"></label>
                <input id="phone" type="tel" name="phone" placeholder="请填写注册手机号" maxlength="11" />
            </div>

            <div class="fm-line">
                <label class="l-label l-code" for="code"></label>
                <input id="code" type="text" name="code" placeholder="请输入短信验证码" style="width:50%" maxlength="6" />
                <a href="javascript:;" class="btn get-verCode">获取验证码</a>
            </div>
            <div class="fm-line">
                <label class="l-label l-pwd"></label>
                <input id="password" type="password" class="protect-pwd" data-rel="public-pwd" name="password" placeholder="6-20位字母、数字组合" maxlength="20" />
                <input type="text" class="hidden public-pwd" data-rel="protect-pwd" name="" placeholder="6-20位字母、数字组合" maxlength="20" />
                <span class="J-btn-switch btn-switch">...</span>
            </div>
        </div>
        <div class="container mt30">
            <input type="submit" value="注册" class="btn btn-block btn-primary btn-lg" tabindex="5"/>
            <p class="p-agre text-center mt20"><label for="agre"><input id="agre" type="checkbox" name="" checked="checked" />我已阅读并同意</label><a href="/register-protocol.html">《用户注册协议》</a></p>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style>

</style>
