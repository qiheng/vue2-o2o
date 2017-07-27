<template>    <!-- 主导航菜单  -->
    <div class="mainNav list-fl">
        <router-link v-for="(navItem, index) in navList" class="list-item"
            :to="navItem.href+(navItem.returnUrl ? '' : '?meun='+(index+1))"
            :key="index"
            :class="[navItem.icon, currentNavIndex == (index + 1) ? 'on' : '']"
            :data-returnurl="navItem.returnUrl || navItem.href+'?meun='+(index+1)">{{ navItem.name }}</router-link>
    </div>
</template>

<script>
    import {getStyle} from '../../utils/dom'

    export default {
        props: {
            currentNavIndex: {
                type: [Number, String],
                default: 1
            },
            navList: {
                type: Array,
                default () {
                    return [
                        {
                            icon: 'i-home',
                            name: '首页',
                            href: 'home'
                        },
                        {
                            icon: 'i-flei',
                            name: '分类',
                            href: 'classify'
                        },
                        {
                            icon: 'i-jxuan',
                            name: '精选',
                            href: 'auslese'
                        },
                        {
                            icon: 'J-isLogin i-my',
                            name: '我的',
                            href: 'mycenter',
                            returnUrl: 'my-center.html'
                        }
                    ]
                }
            }
        },
        data () {
            return {

            }
        },
        mounted: function () {
            var _this = this;

            this.$nextTick(function () {
                _this.setTop(_this.$el)
            })
        },
        methods: {
            viewHeight: function () {
                return parseFloat( window.innerHeight || document.documentElement.clientHeight );
            },
            setTop: function (el) {
                var _this = this,
                        viewHeight = 0,
                        selfHeight = parseFloat( $(el).height() || 0 );
                        //selfHeight = parseFloat( getStyle(el, 'height') || 0 );

                // 监听处理函数
                var addEventHandler = function () {
                    viewHeight = _this.viewHeight();
                    el.style.top = (viewHeight - selfHeight) + 'px';
                };

                window.addEventListener('DOMContentLoaded', addEventHandler)
                window.addEventListener('resize', addEventHandler)

                console.log('mainNav height is :', selfHeight)
            }
        }
    }
</script>

<style>

</style>
