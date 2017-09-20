<template>
    <form class="fm-control">
        <div class="fm-group mt10">
            <div class="fm-line">
                <label class="l-label" for="code">消费码</label>
                <input id="code" type="text" name="code" v-model.trim="code" placeholder="请输入消费码" autofocus="autofocus" autocomplete="off">
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" v-if="showHide" type="submit" value="验证" class="btn btn-block btn-lg btn-primary">
            <router-link :to="{name:'result'}" v-if="show">
                <input  type="submit" value="验证" class="btn btn-block btn-lg btn-primary">
            </router-link>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                show:false,
                showHide:true,
                code:'',
                isDisabled: false,
            }
        },
        methods: {
            submitFn: function () {
                var _this = this;
                if (this.isDisabled) return;
                this.isDisabled = true;

                if (this.code == '') {
                    _this.$notiejs({
                        state: 2,
                        msg: '请输入消费码',
                        end() {
                            _this.showHide = true;
                            _this.show = false;
                            _this.isDisabled = true;
                        }
                    });
                }

                // 提交验证消费码
                this.$axios.get(this.$api.confirmordersbycode,{params:'code: this.code'})
                    .then(function () {
                        this.show = true;
                        _this.showHide = false;
                        this.isDisabled = false;
                        _this.$router.push({ path: 'result' ,query:{'t':xfcode}})
                    })
            }
        }
    }
</script>

<style>

</style>
