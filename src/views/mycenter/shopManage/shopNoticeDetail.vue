<template>
    <!-- 创建动态 start -->
    <div class="shop-notices-list" v-cloak>
        <form action="#" method="">
            <input v-if="query.t == 'edit'" type="hidden" name="shopNoticeId" :value="shopNoticeId" />
            <dl>
                <dt class="p10">标题</dt>
                <dd class="ptb5 bg-white">
                    <input class="inp-txt one-full f14" type="text" v-model="title" placeholder="请填写标题，不超过20个字" />
                </dd>
            </dl>

            <dl>
                <dt class="p10">内容</dt>
                <dd class="ptb5 bg-white">
                    <textarea class="one-full inp-area f14" name="" cols="30" rows="10" v-model="content" placeholder="请填写内容，不超过300个字" style="border: 0"></textarea>
                </dd>
            </dl>

            <!-- 添加 -->
            <div class="container mt30">
                <a @click.prevent="submitFn" class="btn btn-block btn-lg btn-primary" :class="{disabled: isDisabled}" href="javascript:;">{{ query.t !== 'edit' ? '创建' : '保存' }}</a>
            </div>
        </form>
    </div>
    <!-- 创建动态 end -->
</template>
<script>
import validator from '@/assets/js/validator'
import { Toast, Confirm, TransferDomDirective as TransferDom } from 'vux'

export default {
    components: {
        Toast
    },
    data() {
        return {
            isDisabled: false,
            shopNoticeId: '',
            title: '',
            content: ''
        }
    },
    deactivated() {
        this.$destroy(true)
    },
    created() {
        let query = this.query;
        this.shopNoticeId = query.shopNoticeId;
    },
    mounted() {
        // 表单验证配置
        validator.config = {
            title: [{ strategy: 'isNonEmpty', errorMsg: '请填写标题' }, { strategy: 'maxLength:20', errorMsg: '标题长度不能大于20个字' }],
            content: [{ strategy: 'isNonEmpty', errorMsg: '请填写促销内容' }, { strategy: 'maxLength:300', errorMsg: '标题长度不能大于300个字' }]
        };
        var _this = this,
            noticesItem;
        bindEvent(this);
        // 更新到视图上
        function updateData(source, target) {
            source.shopNoticeId = target.shopNoticeId;
            source.title = target.title;
            source.content = target.content;
        }
        function unload(target) {
            localStorage.removeItem(target);
        }
        // 编辑处理
        if (this.query.type == 'edit') {
            noticesItem = localStorage.getItem('__noticesItem');

            // 页面离开删除本地缓存
            //            unload('__noticesItem');

            if (noticesItem) {
                // 更新到视图上
                updateData(_this, noticesItem);

            } else {
                // 重新接口获取
                this.$axios.get(this.$api.getshopnotice, { params: { shopNoticeId: this.query.shopNoticeId } })
                    .then(({ msg, data }) => {
                        updateData(_this, data)
                    })
            }
        }
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
        submitFn: function() {
            var _this = this,
                oValChar = {};

            if (_this.isDisabled) return;
            _this.isDisabled = true;

            // 校验字段
            $.each(validator.config, function(key) {
                var val = _this.$data[key];
                oValChar[key] = val
            });

            // 校验表单
            if (!validator.validate(oValChar, true)) {

                return $.each(validator.messages, function(i, val) {
                    _this.toastMsg(val, false)
                    return false;
                })

            }

            // 数据提交处理
            switch (this.query.type) {
                // 编辑
                case 'edit':
                    oValChar['shopNoticeId'] = _this.shopNoticeId;
                    _this.$axios.post(this.$api.updateshopnotice, $.param(oValChar))
                        .then(({ msg }) => {
                            this.toastMsg('修改成功', true)
                        })
                    break;
                // 添加
                default:
                    this.$axios.post(this.$api.addshopnotice, $.param(oValChar))
                        .then(({ }) => {
                            _this.toastMsg('添加成功', true);
                        })
                    break;
            }
        }
    },
    computed: {
        query() {
            return this.$route.query;
        }
    }
}
// 注册事件
function bindEvent(_this) {
    // 表单验证配置
    validator.config = {
        title: [{ strategy: 'isNonEmpty', errorMsg: '请填写标题' }, { strategy: 'maxLength:20', errorMsg: '标题长度不能大于20个字' }],
        content: [{ strategy: 'isNonEmpty', errorMsg: '请填写促销内容' }, { strategy: 'maxLength:300', errorMsg: '标题长度不能大于300个字' }]
    };
}
</script>

