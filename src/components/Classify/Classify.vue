<template>
    <div>
        <ol class="panel classify-manage">
            <li v-for="(classItem, index) in classList" :key="classItem.goodsCategoryId" class="panel-chunk" ref="listItem">
                <span class="manage-handler" v-show="userType">
                    <a @click.prevent="editClass(index, $event)" class="edit" href="javascript:;" data-status="edit">{{ (currentIndex === index ? "保存" : "编辑") }}</a>
                    <a @click.prevent="delClass(index)" :idx="index" class="del" href="javascript:;">删除</a>
                </span>
                <div class="bfc-panel">
                    <input class="inp-txt" type="text" :value="classItem.name" />
                </div>
            </li>
        </ol>
        <!-- <empty v-else :msg="emptyMsg"></empty> -->
    </div>
</template>
<script>
export default {
    props: {
        userType: {
            type: Boolean,
            default: false
        },
        classList: {
            type: Array,
            default: null
        },
    },
    data() {
        return {
            currentIndex: -1,
            emptyMsg: {
                mainMsg: '暂无商品分组赶添加吧~'
            },
        }
    },
    methods: {
        editClass(index) {
            this.currentIndex = index
            let classId = this.classList[index].goodsCategoryId
            let className = this.$refs.listItem[index].lastChild.firstChild.value
            if (this.$refs.listItem[index].className == 'panel-chunk edit-status') {
                this.$refs.listItem[index].className = 'panel-chunk'
                this.currentIndex = -1
                this.$emit('editClass', classId, className, index)
            } else {
                let oArr = [];
                for (let index = 0; index < this.$refs.listItem.length; index++) {
                    oArr[index] = this.$refs.listItem[index];
                }
                oArr.forEach(function(element) {
                    element.className = 'panel-chunk'
                }, this)
                oArr[index].className = 'panel-chunk edit-status'
            }
        },
        delClass(index) {
            let classId = this.classList[index].goodsCategoryId
            this.$emit('delClass', classId, index);
        }
    }
}
</script>
