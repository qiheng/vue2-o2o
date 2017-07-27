<template>     <!--  组件: 加减  -->
    <div class="add-cart">
        <span @click.stop="minus" v-show="!!count" class="minus">-</span>
        <span class="num" v-show="!!count">{{ count }}</span>
        <span @click.stop="plus" class="plus">+</span>

    </div>
</template>
<script>
    export default {
        props: {
            num: {
                type: Number,
                default: 0
            },
            maxNum: {
                type: Number,
                default: 999999
            },
            minNum: {
                type: Number,
                default: 0
            },
            pmDisabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                count: this.num
            }
        },

         methods: {
        // 减
            minus: function () {
                if (this.pmDisabled) {

                    this.$emit('mptips', {
                        type: 3,
                        msg: '禁止减操作'
                    });

                    return;
                }

                if (this.count <= this.minNum) {
                    this.$emit('mptips', {
                        type: 4,
                        msg: '小于最小值'
                    })
                } else {
                    this.count--;
                    this.$emit('minus', this.count)
                }

            },
        // 加
            plus: function () {
                if (this.pmDisabled) {

                    this.$emit('mptips', {
                        type: 2,
                        msg: '禁止加操作'
                    })

                    return;
                }

                if (this.count >= this.maxNum) {
                    this.$emit('mptips', {
                        type: 1,
                        msg: '大于最大值'
                    })
                } else {
                    this.count++;
                    this.$emit('plus', this.count)
                }

            }
         }
    }
</script>