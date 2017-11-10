<template>
    <div class=" address-manage" v-cloak>
        <div class="address-list mt10">
            <template v-if="addressList.length">
                <div v-for="(addressItem, index) in addressList" class="panel" :key="addressItem.userAddressId">
                    <div @click="isChoose ? isChooses(addressItem.userAddressId):chooseAddress(index)" class="panel-bd ptb20">
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
                                <i :class="{ 'btn-del-sm' : isShow }"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </template>
            <empty v-else :msg="emptyMsg"></empty>
        </div>
        <div class="container mt30 pb30">
            <router-link :to="{name:'editAddress'}" class="btn btn-block btn-primary btn-lg">新建收货地址</router-link>
        </div>
        <div>
            <confirm v-model="delShow" :close-on-confirm="false" @on-cancel="onCancel" @on-confirm="onConfirm">
                <p style="text-align:center;">{{ '你确定删除吗?'}}</p>
            </confirm>
        </div>
    </div>
</template>
<script>
import { Confirm } from 'vux'
import { mapActions, mapGetters, mapMutations } from 'vuex'
//import {setRadio,utils} from '@/assets/js/common'
import * as types from '@/store/mutation-types'

import qs from 'qs'
export default {
    components: {
        Confirm,
    },
    data() {
        return {
            emptyMsg: {
                mainMsg: '暂无地址列表~',
                subMsg: '赶快去添加吧~'
            },
            delShow: false,
            addressList: [],
            isShow: true,
            typeOrder: '',
            addressItem: {}
        }
    },
    created() {
        this.getAddressListData();
        var query = this.query;
        this.typeOrder = query.typeOrder;
        if (query.typeOrder) {
            this.isShow = false;
        }
    },
    methods: {
        ...mapMutations([types.UPDATE_ORDER_PARAM]),
        onCancel() {
            this.delShow = false;
        },
        onConfirm() {
            let addressItem = this.addressItem;
            const param = qs.stringify({ 'userAddressId': addressItem.userAddressId, 'isDefault': addressItem.isDefault })
            this.$axios.post(this.$api.deladdress, param).then(requset => {
                this.addressList.splice(this.itemIndex, 1);
            })
            this.$vux.loading.show({
                transition: '',
                text: '删除成功'
            });
            setTimeout(() => {
                this.$vux.loading.hide()
                this.delShow = false
            }, 1000);
        },
        getAddressListData() {
            this.$axios.get(this.$api.addresslist)
                .then(requset => {
                    this.addressList = requset.data;
                })
        },
        delAddressData(index) {
            this.addressItem = this.addressList[index];
            this.itemIndex = index;
            this.delShow = true;
        },
        isChooses(addressId) {
            //更新订单参数
            this[types.UPDATE_ORDER_PARAM]({
                addressId
            })
            this.$router.back();
            return false
        },
        chooseAddress(index) {
            var addressItem = this.addressList[index];


        }

    },
    computed: {
        query() {
            return this.$route.query;
        },
        isChoose() {
            return this.$route.query.typeOrder == 'order'
        }
    }
}



</script>
