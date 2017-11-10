<template>
    <div class="animsition" v-cloak>
        <!-- 配送人员 start -->
        <div class="delivery-staff-panel">
            <div class="clearfix delivery-staff-info">
                <div class="pull-left three-fourths">
                    <img class="mr10 pull-left" width="60" height="60"
                         :src="staffInfo.pic1 ? staffInfo.pic1+'?x-oss-process=image/resize,m_fixed,h_60,w_60' : ''" alt=""/>
                    <div class="bfc-panel mt15">
                        <strong class="nowrap delivery-staff-name">{{ staffInfo.name }}（{{ staffInfo.position }}）</strong>
                        <p><i :class="['star2', 'star-'+Math.round(staffInfo.avgScore)]"></i></p>
                    </div>

                </div>
                <a v-if="query.showTel" class="pos-rt-middle" :href="'tel:'+staffInfo.phone"><img width="35" height="35" src="images/icons-v3/icons1/icon_tel.png" alt=""/></a>
            </div>
            <div class="p10 delivery-staff-desc bwrd">
                {{ staffInfo.summary }}
            </div>
        </div>
        <!-- 配送人员 end -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                staffInfo:{},
                servicerId:'',
            }
        },
        created() {
            this.servicerId = this.query.servicerId;
            this.$axios.get(this.$api.servicerview,{params:{servicerId: this.query.servicerId}})
                .then(({data})=>{
                    this.staffInfo = data;
                });
        },
        computed:{
            query() {
                return this.$route.query
            }
        }
    }
</script>



<style>

</style>
