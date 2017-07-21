<template>
    <div class="mainNav list-fl">
        <a v-for="(navItem, index) in navList" class="list-item"
           :class="[navItem.icon, currentNavIndex == (index + 1) ? 'on' : '']"
           :to="{ name: navItem.href, query: { meun: (navItem.returnUrl ? '' : (index+1)) }}"
           <!--to="navItem.href+(navItem.returnUrl ? '' : '?meun='+(index+1))"-->
           :data-returnurl="navItem.returnUrl || navItem.href+'?meun='+(index+1)">{{ navItem.name }}</router-link>
        <!--<router-link v-for="(navItem, index) in navList" class="list-item"-->
                     <!--:class="[navItem.icon, currentNavIndex == (index + 1) ? 'on' : '']"-->
                     <!--:to="{ name: navItem.href, query: { meun: (navItem.returnUrl ? '' : (index+1)) }}"-->
        <!--&lt;!&ndash;to="navItem.href+(navItem.returnUrl ? '' : '?meun='+(index+1))"&ndash;&gt;-->
        <!--:data-returnurl="navItem.returnUrl || navItem.href+'?meun='+(index+1)">{{ navItem.name }}</router-link>-->
    </div>
</template>

<script>
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
                            href: 'auslese.html'
                        },
                        {
                            icon: 'J-isLogin i-my',
                            name: '我的',
                            href: 'javascript:;',
                            returnUrl: 'my-center.html'
                        }
                    ]
                }
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style>

</style>