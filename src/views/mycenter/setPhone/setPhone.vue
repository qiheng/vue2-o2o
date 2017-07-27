<template>
    <!-- 表单 start -->
    <form class="fm-control fm-bind-phoneNum" action="/" method="POST" v-cloak>
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label l-account" for="phone"></label>
                <input class="int-nopl three-fourths" type="tel" id="phone" v-model="phone" maxlength="11" placeholder="请输入原手机号码" readonly/>
            </div>
            <div class="fm-line">
                <label class="l-label l-code"></label>
                <input class="int-nopl" type="text" v-model="code" placeholder="请输入验证码" style="width:50%" maxlength="6" />
                <a @click.prevent="getVerCode" href="javascript:;" class="btn get-verCode">获取验证码</a>
            </div>
        </div>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="验证" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
    </form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            isDisabled: false,
            phone: '',
            code: ''
        }
    },
    created() {
        const query = this.query;
        if (query.phone) {
            this.phone = query.phone
        }
    },
    methods: {
        getVerCode(e) {
            

        },
        submitFn() {

        }
    },
    computed: {
        query() {
            return this.$route.query
        }
    }
}
</script>
