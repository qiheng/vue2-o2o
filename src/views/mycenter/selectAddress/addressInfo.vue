<template>
    <div class=" address-manage pb60" v-cloak>
        <div class="address-list mt10">
            <template v-if="addressList.length">
                <div v-for="(addressItem, index) in addressList" class="panel" :key="addressItem.userAddressId">
                    <div @click="isChoose ? chooseAddress(index) : ''" class="panel-bd ptb20">
                        <p class="f14">
                            <span class="mr20">{{ addressItem.linkman }}</span>
                            <span>{{ addressItem.phone }}</span>
                            <span v-if="addressItem.isDefault === 1" class="emb-red ml15">[默认]</span>
                        </p>
                        <div class="lightgray f12">
                            <p class="mtb5">
                                <span class="mr5">{{ addressItem.provianceName }}</span>
                                <span class="mr5">{{ addressItem.cityName }}</span>
                                <span>{{ addressItem.areaName }}</span>
                            </p>
                            <p class="bwrd">{{ addressItem.address }}</p>
                        </div>
                        <p class="address-handle pos-rt-middle">
                            <router-link class="mr15" :to="{name:'editAddress', query: {type:'edit',userAddressId : addressItem.userAddressId} }">
                                <i class="btn-edit-sm"></i>
                            </router-link>
                            <a v-if="!isChoose" @click.stop.prevent="delAddressData(index)" class="del-btn" href="javascript:;">
                                <i class="btn-del-sm"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </template>
            <empty v-else :msg="emptyMsg"></empty>
        </div>
        <div class="container mt30">
            <router-link :to="{name:'editAddress'}" class="btn btn-block btn-primary btn-lg">新建收货地址</router-link>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import qs from 'qs'
export default {
    data() {
        return {
            emptyMsg: {
                mainMsg: '暂无地址列表~',
                subMsg: '赶快去添加吧~'
            },
            addressList: []
        }
    },
    created() {
        this.getAddressListData()
    },
    methods: {
        getAddressListData() {
            this.$axios.get(this.$api.addresslist)
                .then(requset => {
                    this.addressList = requset.data;
                })
        },
        delAddressData(index) {
            let addressItem = this.addressList[index];
            const param = qs.stringify({ 'userAddressId': addressItem.userAddressId, 'isDefault': addressItem.isDefault })
            this.$axios.post(this.$api.deladdress, param).then(requset => {
                this.addressList.splice(index, 1);
            })

            // this.$layer.open({
            //     title: '温馨提示',
            //     shift: 1,
            //     content: '您确定要删除吗？',
            //     btn: ['确定', '取消'],
            //     yes: function (idx, layerEl) {
            //         layer.close(idx);

            //     },
            //     cancel: function () {

            //     }
            // });

        }
    },
    computed: {
        isChoose() {
            return false
        }
    }
}



</script>