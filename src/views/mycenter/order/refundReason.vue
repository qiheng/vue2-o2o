<template>
    <form class="animsition" action="/" v-cloak>
        <div class="panel-nobrd">
            <div class="panel-bd">
                <ins class="pull-right f16 orange">&yen;{{ query.priceCount | toFixed }}</ins>
                退款金额
            </div>
        </div>

        <dl class="mtb20">
            <dt class="container">退款理由</dt>
            <dd class="mt10">
                <textarea name="content" v-model.trim="params.reason" placeholder="请输入退款理由"></textarea>
            </dd>
        </dl>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="申请退款" class="btn btn-block btn-primary btn-lg" :class="{disabled: isDisabled}" />
        </div>
        <!-- 退款原因 end -->
    </form>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                isDisabled: false,
                params: {
                    ordersId:'',
                    reason: ''
                }
            }
        },
        created: function () {
            var _this = this;
            this.params.ordersId = this.query.ordersId || 0;
            if (!this.query.ordersId) {
               // redirect_url(forward())
                window.location.href = 'http://localhost:8089/#/mycenter/order?type=0'
            }
        },
        methods: {
            submitFn: function() {
                var _this = this;

                if (this.isDisabled) return;
                this.isDisabled = true;

                if (this.params.reason == '') {
                    _this.$notiejs({
                        state:2,
                        msg: '请输入退款理由',
                        end() {
                            _this.isDisabled = false;
                        }
                    })

                    return
                }

                // 提交
                _this.$axios.get(_this.$api.refundorders,{params:_this.params})
                    .then(function () {
                        _this.$notiejs({
                            state:1,
                            msg: '提交成功',
                            end() {
                                //redirect_url(forward())
                                window.location.href = 'http://localhost:8089/#/mycenter/order?type=0'
                            }
                        })
                    })
            }
        },
        computed: {
            ...mapGetters(['config']),
            isHdfk: function () {
                // return this.ordersItem.shop.shopTypeId == config.shopTypeId.spws && this.ordersItem.payType === this.HDFK_VAL
            },
            query () {
                return this.$route.query
            }
        }
    }
</script>

<style>
    textarea, input[type] {
        border: 1px solid #e5e5e5;
        border-left: 0;
        border-right: 0;
        display: block;
        width: 100%;
        padding: 10px;
    }
    textarea { height: 150px;}
</style>
