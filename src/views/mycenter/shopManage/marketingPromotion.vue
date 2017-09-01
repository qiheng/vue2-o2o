<template>
    <div class="yxtg-nav-panel">
        <ul class="list-fl">
            <li>
                <router-link :to="{name:'salesList',query:{salesType:'4'}}">
                    <!--<a href="sales-list.html?salesType=4">-->
                    <img src="../../../assets/images/icons-v3/img_xszk.png" alt="限时折扣"/>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'salesList',query:{salesType:'5'}}">
                <!--<a href="sales-list.html?salesType=5">-->
                    <img src="../../../assets/images/icons-v3/img_nyzq.png" alt="N元专区"/>
                </router-link>
            </li>
            <li>

                <router-link :to="{name:'shopNotice',query:{'shopId':query.shopId}}">
                <!--<a :href="'shop-notice.html?shopId='+query.shopId">-->
                    <img src="../../../assets/images/icons-v3/img_dpdt.png" alt="店铺动态"/>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'salesList',query:{salesType:'6'}}">
                <!--<a href="sales-list.html?salesType=6">-->
                    <img src="../../../assets/images/icons-v3/img_mnsn.png" alt="买N送N"/>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query:''
            }
        }
    }
</script>

<style>
    .yxtg-nav-panel {
        padding: 60px 10%;
        text-align: center;
    }

    .yxtg-nav-panel li {
        width: 50%;
        height: 0;
        padding-bottom: 42.5%;
        margin-top: 20px;
        overflow: hidden;
    }

    .yxtg-nav-panel img {
        width: 85%;
    }
</style>
