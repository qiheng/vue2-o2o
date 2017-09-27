<template>
    <form class="fm-control">
        <div class="fm-group mt10">
            <div class="fm-line">
                <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/icon_wlmc.png" alt=""/>
                <input  type="text" name="name" v-model="name" placeholder="请输入物流名称"  autofocus="autofocus" autocomplete="off">
            </div>
            <div class="fm-line">
                <img class="l-label" width="20" height="20" src="../../../assets/images/icons-v3/icons1/icon_yf.png" alt=""/>
                <input  type="text" name="price" v-model="price" placeholder="请输入运费"  autofocus="autofocus" autocomplete="off">
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}"/>
        </div>

    </form>
</template>

<script>
    import validator from '@/assets/js/validator'
    export default {
        data() {
            return {
                isDisabled: false,
                name: '',
                price:  '',
                edit: ''
            }
        },
        created: function () {
            var _this = this;
            _this.name = _this.query.name;
            _this.price = _this.query.price;
            _this.edit = _this.query.edit;
            if (_this.query.type == 'edit') {
                document.title = '修改物流'
            }
        },
        mounted: function () {
            validator.config = {
                name: [{strategy: 'isNonEmpty', errorMsg: '请填写物流名称'}],
                price: [{strategy: 'isNonEmpty', errorMsg: '请输入价格'}, {strategy: 'isPrice'}]
            };
        },
        methods: {
            submitFn: function () {
                var oValChar = {},
                    _this = this;

                if (_this.isDisabled) return;
                _this.isDisabled = true;

                // 校验字段
                $.each(validator.config, function (key) {
                    oValChar[key] = _this.$data[key]
                });

                // 校验表单
                if (!validator.validate(oValChar, true)) {
                    return $.each(validator.messages, function (i, val) {

                        _this.$notiejs({
                            state:2,
                             msg:val,
                             end(){
                             _this.isDisabled = false
                            }
                        });
                        return false;
                    })
                }

                // 操作处理
                switch (_this.query.type) {
                    case 'edit':
                        _this.$axios.get(_this.$api.updatelogistics,{params:{logisticsId: _this.query.logisticsId, name: _this.name, price: _this.price}})
                            .then(function () {
                                 _this.$notiejs({
                                     'state':1,
                                      msg:'更新成功',
                                     end(){
                                         _this.$router.push({path:'logisticsManage'});
                                     }
                                 })
                            })
                        break;
                    default :
                        _this.$axios.get(_this.$api.addlogistics,{params:{name: _this.name, price: _this.price}})
                            .then(function () {
                                _this.$notiejs({
                                    'state':1,
                                     msg : '添加成功',
                                     end(){
                                         _this.$router.push({path:'logisticsManage'});
                                    }
                                })
                            })
                        break;
                }
            }
        },
        computed: {
            query () {
                return this.$route.query
            }
        }
    }
</script>

<style>
    .fm-group .fm-line {margin: 0 10px; padding: 10px 0}
</style>
