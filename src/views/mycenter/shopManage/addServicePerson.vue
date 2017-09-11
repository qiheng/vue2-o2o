<template>
    <div class="add-service-person pb60" v-cloak>
        <form class="fm" action="/manage/addservicer" method="POST" enctype="multipart/form-data">
            <input v-if="query.type == 'edit'" type="hidden" name="servicerId" :value="servicerInfo.servicerId"/>
            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input class="inp-txt" type="text" name="name" v-model="servicerInfo.name" placeholder="请输入服务人员姓名" />
                </div>

                <div class="fm-line">
                    <label class="l-label">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="hidden" value="1" name="sex" v-model.Number="servicerInfo.sex"/>
                    <span @click.capture="chooseSex" class="J-radio dib mr20 pl10"  data-sex="1">
					<i class="i-radio ml10" :class="{checked: servicerInfo.sex == 1}"></i>&nbsp;&nbsp;男
				</span>
                    <span @click.capture="chooseSex" class="J-radio dib" data-sex="0">
					<i class="i-radio" :class="{checked: servicerInfo.sex == 0}"></i>&nbsp;&nbsp;女
				</span>
                </div>

            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">职位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input class="inp-txt" type="text" name="position" v-model="servicerInfo.position" placeholder="请输入服务人员职位" />
                </div>

                <div class="fm-line">
                    <label class="l-label">联系电话</label>
                    <input class="inp-txt" type="tel" name="phone" v-model="servicerInfo.phone" placeholder="请输入服务人员电话" />
                </div>
            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="pull-left l-label mr15">个人头像</label>
                    <div class="bfc-panel">
                        <div class="mt10 upload-img-handle">
                            <img class="upload-img" width="100%" :src="servicerInfo.pic1">
                            <input :disabled="!hasFileInput" class="upload-file" type="file" name="pic1" />
                        </div>
                    </div>

                </div>
            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label mr15">人员描述</label>
                    <p class="ptb10">
                        <textarea class="block one-full inp-area" name="summary" cols="30" rows="3" v-model="servicerInfo.summary" placeholder="请填写服务人员的描述"></textarea>
                    </p>
                </div>
            </div>

            <div class="container mtb20">
                <input v-if="query.type == 'add'" @click.prevent="add" type="submit" class="btn btn-lg btn-block btn-primary" :class="{disabled:isDisabled}" value="保存"/>
                <input v-else @click.prevent="edit" type="submit" class="btn btn-lg btn-block btn-primary" :class="{disabled:isDisabled}" value="保存"/>
            </div>

        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { XSwitch, Group } from 'vux'
    import validator from '@/assets/js/validator'
    export default {
        data() {
            return {
                title:'添加服务人员',
                hasFileInput: true,
                isDisabled: false,
                servicerId:'',
                type:'',
                servicerInfo: {
                    // 默认 男
                    sex:1
                }
            }
        },
        created: function () {
            var _this = this;
            const query = this.query;
            _this.type = query.type;
            if (query.type == 'edit') {
                this.title = '编辑服务人员';
                _this.servicerId = query.servicerId;
                // 获取服务人员信息
                _A.getServicerViewData({servicerId: query.servicerId}, function (servicerInfo) {
                    _this.servicerInfo = servicerInfo;
                })

            }
            document.title = this.title;
        },
        mounted: function () {
            // 页面DOM UI 处理
            bindEvent(this);
        },
        methods: {
            add: function () {
                addOrEditHandler('add', this)
            },
            edit: function () {
                addOrEditHandler('edit', this)
            },
            chooseSex: function ($e) {
                var dataset = $e.currentTarget.dataset;

                this.servicerInfo.sex = dataset.sex;
            }
        },

        computed: {
            query() {
                return this.$route.query
            }
        }
    }

    // 新增 or 更新 服务人员操作
    function addOrEditHandler(type, vm) {
        var oValChar = {},
            _url = '';

        if (vm.isDisabled) return;
        vm.isDisabled = true;

        // 校验字段
        $.each(validator.config, function (key) {
            var val = vm.servicerInfo[key];

            // 对 input 为 file 的字段特殊处理
            if (key === 'pic1') {
                val = $('input[name="pic1"]').val();
            }

            oValChar[key] = val
        });

        if (query.type == 'edit') {
            delete validator.config.pic1;

            if ($('.upload-file').val() == '') {
                vm.hasFileInput = false;
                vm.$nextTick(function () {
                    $('.upload-file').prop('disabled',true);
                })
            }

        }

        // 校验表单
        if (!validator.validate(oValChar, true)) {

            return $.each(validator.messages, function (i, val) {
                notiejs.alert(2, val, 2000, function () {
                    vm.isDisabled = false
                });
                return false;
            })

        }

        // ajax 回调
        var yesFn = function (result) {
                notiejs.alert(1, '操作成功', 2000, function () {
                    redirect_url( forward() )
                });
            },

            // 一些回调处理
            noFn = function (res, resTxt) {
                notiejs.alert(2, res.msg, 2000, function () {
                    vm.isDisabled = false
                });
            },

            errorFn = function (result, resTxt) {
                vm.hasFileInput = true;

                if (result.status !== 1) {
                    noFn(result, resTxt);
                } else {
                    layer.msg('图片过大，请上传100*100PX的图片', {icon:2}, function () {
                        vm.isDisabled = false;
                    });
                }
                return false;
            };

        // 新增 or 更新地址 处理
        switch (type) {
            case 'add':
                // 添加
                _url = '/manage/addservicer';
                break;
            default :
                // 更新
                _url = '/manage/updateservicer';

        }

        // 提交处理
        vm.$nextTick(function () {
            ajaxSubmit($('form'), _url, yesFn, errorFn);
        })

    }

    // 页面事件注册
    function bindEvent (vm) {

        // 配置验证信息
        validator.config = {
            name: {strategy: 'isNonEmpty', errorMsg: '请填写服务人员的真实姓名'},
            sex: [{strategy: 'isNonEmpty', errorMsg: '请选择性别'}],
            position: [{strategy: 'isNonEmpty', errorMsg: '请填写服务人员的职位'}],
            phone: [{strategy: 'isNonEmpty', errorMsg: '请填写服务人员的手机号码！'}, {strategy: 'isMobile'}],
            pic1: {strategy: 'isNonEmpty', errorMsg: '请上传头像'},
            summary: {strategy: 'isNonEmpty', errorMsg: '请填写服务人员的描述'}
        };

        // radio 模拟按钮
//        setRadio(function (result) {}, true, true);

        $('.upload-file').on('change', function () {
            var $self = $(this),
                $parent = $self.parent();

            loadImageFile(this, function (ev) {
                $parent.find('.upload-img').attr('src', ev.target.result).show();

                vm.servicerInfo.pic1 = ev.target.result
            }, function () {

            });

        });

    }

</script>

<style>

</style>
