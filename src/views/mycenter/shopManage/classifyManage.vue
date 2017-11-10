<template>
    <div>
        <Classify :userType="userType" :classList="classList" @delClass="delClass" @editClass="editClass"></Classify>
        <div class="container mt30 clearfix">
            <a href="javascript:;" class="btn btn-lg btn-primary pull-left" @click="addNewClassify">添加分组</a>
            <a href="javascript:;" class="btn btn-lg btn-default pull-right" @click="editNewClassify">编辑分组</a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            classList: [],
            userType: false,
        }
    },
    created() {
        this.getDataList()
    },
    methods: {
        getDataList() {
            //获取数据
            this.$axios.get(this.$api.goodscategorylist).then(({ msg, data, status }) => {
                if (status == 1) {
                    this.classList = data
                }
            })
        },
        addNewClassify() {
            //添加分组
            let that = this;
            this.$vux.confirm.prompt('请输入一个新的分组名称', {
                title: '添加分类',
                onConfirm(value) {
                    if (value == '') {
                        that.$notiejs({
                            state: 2,
                            msg: '分组名称不能为空',
                        });
                        return
                    }
                    that.$axios.post(that.$api.addgoodscategory, $.param({ name: value }))
                        .then(() => {
                            that.$notiejs({
                                state: 1,
                                msg: '分组添加成功',
                            });
                            that.getDataList();
                        }).catch(() => { })
                }
            })
        },
        editNewClassify() {
            this.userType = !this.userType
        },
        editClass(classId, className, indexs) {
            //修改分组
            if (className == '') {
                this.$notiejs({
                    state: 2,
                    msg: '分组名称不能为空',
                });
                return
            }
            this.$axios.post(this.$api.updategoodscategory, $.param({ goodsCategoryId: classId, name: className })).then(() => {
                this.classList[indexs].name = className
                this.$notiejs({
                    state: 1,
                    msg: '分组修改成功'
                });
            }).catch(() => { })
        },
        delClass(classId, indexs) {
            //删除分组
            let that = this;
            this.$vux.confirm.show({
                content: '是否确定要删除当前记录',
                onConfirm() {
                    that.$axios.post(that.$api.deletegoodscategory, $.param({ goodsCategoryId: classId }))
                        .then(({ msg, status }) => {
                            if (status == 1) {
                                that.classList.splice(indexs, 1)
                                that.$notiejs({
                                    state: 1,
                                    msg: '分组删除'
                                });
                            } else {
                                that.$notiejs({
                                    state: 2,
                                    msg: msg
                                });
                            }
                        }).catch(() => { })
                }
            })
        }
    }
}
</script>
