<template>
    <div class="J-slide-nav tab-slide-bd">
        <ul ref="slideList" class="tab-slide-list">
            <slot><li><a href="javascript:;">加载中...</a></li></slot>
        </ul>
    </div>
    <!--<slideNavItem @input="change" id="id"></slideNavItem>-->
</template>

<script>
    /**
     * slide-nav 组件
     * @desc 左右滑动导航，依赖 slide-nav-item
     * @param {*} value - 返回 item component 传入的 id
     **/
    export default {
        props: {
            value: {},
            slideChooseCb: Function
        },
        data: function () {
            return {
                isMoveing: false,
                slideParentEl: null,
                slideListEl: null,
                slideViewHalfWidth: 0
            }
        },
        mounted: function () {
            var _this = this;

            this.slideListEl = this.$refs.slideList;

            if (this.slideListEl && this.slideListEl.nodeType === 1) {
                this.slideParentEl = this.slideListEl.parentNode;

                if (this.slideParentEl) {
                    this.slideViewHalfWidth = Math.round(this.slideParentEl.offsetWidth / 2);

                    _this.$nextTick(function () {
                        _this.slideSetup()
                    })
                }
            }
        },
        methods: {
            // 元素初始值设置
            slideSetup: function () {
                var $slideList = $(this.slideListEl),
                    $slideListParent = $(this.slideParentEl),
                    $slideItems = $slideList.children(),
                    slideListWidth = 0;

                var parentLeft = 1 || $slideListParent.offset().left;
                $slideList.width('9999em');

                $slideItems.each(function (i, ele) {
                    // console.log(i+'-------lt='+$(ele).position().left+'---wd='+$(ele).width())
                    $(ele).attr({
                        'data-pos-left': ( $(ele).position().left - parentLeft),
                        'data-width': $(ele).width()
                    });
                    slideListWidth += $(ele).outerWidth();
                })

                $slideList.width(slideListWidth + 1)

            },
            // 移动操作
            slideMoveTo: function (index, cb) {
                var _this = this, $slideItem, _offsetLeft = 0;

                if (this.isMoveing) return;
                this.isMoveing = true;

                $slideItem = $(this.slideListEl).children().eq(index);
                _offsetLeft = Number($slideItem.data('pos-left'));

                $(this.slideParentEl).animate({
                    'scrollLeft': (_offsetLeft -
                        this.slideViewHalfWidth)
                }, 300, function () {
                    _this.isMoveing = false;

                    cb && cb(index, $slideItem)
                })
            },
            change:function (id) {
                this.id = id;
            }
        },
        computed: {
            slideCurrentIndex: {
                get: function () {
                    return this.value;
                }
            }
        },
        watch: {
            slideCurrentIndex: function (newVal, oldVal) {
                this.slideMoveTo(newVal)
                this.$emit('slide-tav-item-change', newVal);
                this.$parent.$emit('input', false);
                this.slideChooseCb && this.slideChooseCb(newVal, oldVal)
            }
        }
    }

</script>

<style>

</style>
