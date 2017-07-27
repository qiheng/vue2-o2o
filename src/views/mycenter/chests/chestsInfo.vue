<template>
    <div class="chests-panel" v-cloak>
        <a v-if="items.href !=''" class="container panel-item mt10" :href="items.href" v-for="(items,index) in chestsList" :key="index">
            <img class="pull-left mr10" width="42" height="42" :src="items.icon" alt="" />
            <div class="bfc-panel">
                <h2 class="f16">{{items.name}}</h2>
                <p class="lightgray f12 mt5">{{items.content}}</p>
                <i class="arr-rt pos-rt-middle"></i>
            </div>
        </a>
        <router-link v-else class="container panel-item mt10" :to="{name:items.link}">
            <img class="pull-left mr10" width="42" height="42" :src="items.icon" alt="" />
            <div class="bfc-panel">
                <h2 class="f16">{{items.name}}</h2>
                <p class="lightgray f12 mt5">{{items.content}}</p>
                <i class="arr-rt pos-rt-middle"></i>
            </div>
        </router-link>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            chestsList: [
                {
                    icon: 'images/icons-v3/bianmin/icon_bmdh@2x.png',
                    name: '便民号码',
                    content: '方便您查询同城电话',
                    href: '',
                    link: 'handilyPhone'
                },
                {
                    icon: 'images/icons-v3/bianmin/icon_dyp@2x.png',
                    name: '电影票',
                    content: '再选查询购买最新电影票务',
                    href: 'http://m.wepiao.com',
                    link: ''
                },
                {
                    icon: 'images/icons-v3/bianmin/icon_wzcx@2x.png',
                    name: '违章查询',
                    content: '查询您的驾驶违章信息',
                    href: 'http://weizhang.58.com/m/view/',
                    link: ''
                }
                ,
                {
                    icon: 'images/icons-v3/bianmin/icon_lcsk@2x.png',
                    name: '列车时刻',
                    content: '查询列车出发到达准确时间',
                    href: 'http://lieche.m.58.com/',
                    link: ''
                }
                ,
                {
                    icon: 'images/icons-v3/bianmin/icon_hfcz@2x.png',
                    name: '话费充值',
                    content: '在线充值您的话费和其它费用',
                    href: '',
                    link: 'rechargePhone'
                }
                ,
                {
                    icon: 'images/icons-v3/bianmin/icon_qcp@2x.png',
                    name: '汽车票',
                    content: '在线查询购买长途汽车信息',
                    href: 'http://m.58.com/w/qichepiao/',
                    link: ''
                }
            ]
        }
    }
}
</script>
<style>
.chests-panel .panel-item {
    position: relative;
}

.chests-panel .arr-rt:before {
    border-color: #e62739;
}
</style>
