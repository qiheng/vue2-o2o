<template>
    <form class="fm-control">
        <div class="fm-group mt10">
            <div class="fm-line">
                <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/icon_wlmc.png" alt="" />
                <input type="text" name="name" v-model="name" placeholder="请输入物流名称" autofocus="autofocus" autocomplete="off">
            </div>
            <div class="fm-line">
                <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/icon_yf.png" alt="" />
                <input type="text" name="price" v-model="price" placeholder="请输入运费" autofocus="autofocus" autocomplete="off">
            </div>
        </div>
        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}" />
        </div>
    </form>
</template>

<script>
import { Toast } from 'vux'
import validator from '@/assets/js/validator'
export default {
    components: {
        Toast
    },
    data() {
        return {
            isDisabled: false,
            name: '',
            price: '',
            edit: '',
            shopId: ''
        }
    },
    deactivated() {
        this.$destroy(true)
    },
    created() {
        this.name = this.query.name;
        this.price = this.query.price;
        this.edit = this.query.edit;
        if (this.query.type == 'edit') {
            document.title = '修改物流'
        }
    },
    mounted() {
        validator.config = {
            name: [{ strategy: 'isNonEmpty', errorMsg: '请填写物流名称' }],
            price: [{ strategy: 'isNonEmpty', errorMsg: '请输入价格' }, { strategy: 'isPrice' }]
        };
    },
    methods: {
        toastMsg(msg, type) {
            let that = this;
            this.$vux.toast.show({
                text: msg,
                type: 'text',
                width: '24em',
                position: 'middle',
                onHide() {
                    if (type) {
                        that.$router.back();
                    }
                    that.isDisabled = false;
                }
            })
        },
        submitFn() {
            var oValChar = {},
                _this = this;

            if (this.isDisabled) return;
            this.isDisabled = true;

            $.each(validator.config, key => {
                oValChar[key] = this.$data[key]
            });

            // 校验表单
            if (!validator.validate(oValChar, true)) {
                return $.each(validator.messages, (i, val) => {
                    this.toastMsg(val, false)
                    return false;
                })
            }
            // 操作处理
            switch (this.query.type) {
                case 'edit':
                    this.$axios.post(_this.$api.updatelogistics, $.param({ logisticsId: _this.query.logisticsId, name: _this.name, price: _this.price }))
                        .then(({ msg }) => {
                            this.toastMsg(msg, true)
                        })
                    break;
                default:
                    this.$axios.post(_this.$api.addlogistics, $.param({ name: _this.name, price: _this.price }))
                        .then(({ msg }) => {
                            this.toastMsg(msg, true)
                        })
                    break;
            }
        }
    },
    computed: {
        query() {
            return this.$route.query
        }
    }
}
</script>

<style scoped>
.fm-group .fm-line {
    margin: 0 10px;
    padding: 10px 0
}
</style>
