<template>
    <form class="fm-control">
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label" for="code">消费码</label>
                <input id="code" type="text" name="code" v-model.trim="code" placeholder="请输入消费码" autofocus="autofocus" autocomplete="off">
            </div>
        </div>
        <div class="container mt30">
            <input type="submit" value="验证" class="btn btn-block btn-lg btn-primary" @click.prevent="submitFn">
        </div>
        <toast type="text" v-model="shows" width="24em" position="middle">{{text}}</toast>
    </form>
</template>

<script>
import { Toast } from 'vux'
export default {
    components: {
        Toast,
    },
    data() {
        return {
            code: '',
            shows: false,
            text: '',
        }
    },
    methods: {
        submitFn() {
            if (this.code == '') {
                this.text = "消费码不能为空"
                this.shows = true;
                return
            }
            this.$axios.post(this.$api.confirmordersbycode, $.param({ code: this.code }))
                .then(({ data, msg }) => {
                    this.text = msg
                    this.shows = true;
                }).catch(({ data, msg, status }) => {
                    this.text = msg
                    this.shows = true;
                })
        }
    }
}
</script>

<style>

</style>
