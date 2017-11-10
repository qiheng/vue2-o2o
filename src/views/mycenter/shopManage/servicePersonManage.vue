<template>
    <div class="service-person-manage" v-cloak>
        <div class="servicer">
            <ul v-if="servicerList.length > 0" class="mt10 service-person-list">
                <!-- 数据区 -->
                <li @click="clickFn(servicerItem.servicerId, index)" v-for="(servicerItem, index) in servicerList" class="panel-item" :key="servicerItem.servicerId">
                    <div class="clearfix container">
                        <div class="pull-left mr10">
                            <img class="block radius50" width="40" height="40" :src="servicerItem.pic1+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt="" />
                        </div>
                        <div class="pull-left mt3">
                            <h2>{{ servicerItem.name }}</h2>
                            <p class="lightgray f12">{{ servicerItem.position }}</p>
                        </div>
                        <div v-if="whichPage == 3" class="pull-right mt5">
                            <!-- <a :href="'add-service-person.html?type=edit&servicerId=' + servicerItem.servicerId" class="btn btn-primary">编辑</a> -->
                            <router-link :to="{name:'addServicePerson',query:{'type':'edit','servicerId':servicerItem.servicerId}}">
                                <span class="btn btn-primary">编辑</span>
                            </router-link>
                            <a @click="deleteFn(index)" href="javascript:;" class="btn btn-weaken">删除</a>
                        </div>
                        <i v-if="whichPage == 2" class="i-radio pos-rt-middle" :class="{checked:currentServicerIndex == index}"></i>
                    </div>
                </li>
            </ul>
            <empty v-else :msg="emptyMsg"></empty>
        </div>
        <template v-if="whichPage == 3">
            <p class="container mt30">
                <router-link :to="{name:'addServicePerson',query:{'type':'add'}}" class="btn btn-block btn-primary btn-lg">添加服务人员</router-link>
            </p>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emptyMsg: {
                mainMsg: '暂无服务人员~',
                subMsg: '赶紧去添加服务人员吧~'
            },
            currentServicerIndex: -1,
            shopId: '',
            type:'',
            isShow:true,
            servicerList: []
        }
    },
    beforeRouteEnter(to, form, next) {
        next(vm => {
            vm.getDate()
        })
    },
    created: function() {
//        this.type = this.query.type;
//        if(this.query.type == 'preview'){
//            this.isShow = false;
//        }
        this.getDate();
    },
    methods: {
        getDate() {
            this.$axios.get(this.$api.servicerlist, { params: { shopId: this.query.shopId } })
                .then(({ msg, data, status }) => {
                    this.servicerList = data;
                }).catch(() => {
                    console.log('error')
                })
        },
        deleteFn(index) {
            let that = this;
            this.$vux.confirm.show({
                content: '是否确定要删除当前记录',
                onConfirm() {
                    that.$axios.post(that.$api.delservicer, $.param({ servicerId: that.servicerList[index].servicerId }))
                        .then(({ msg }) => {
                            that.$vux.toast.show({
                                text: msg,
                                onHide() {
                                    that.servicerList.splice(index, 1)
                                }
                            })
                        });
                }
            })
        },
        // 跳转服务/配送人员详情
        linkToDetail(servicerId) {
            this.$router.push({path:'deliveryStaff',query:{servicerId:servicerId}});
            //redirect_url('delivery-staff.html?servicerId=' + servicerId)

        },
        // 服务/配送处理
        chooseServicer(servicerId) {
            // _A.setSendOrdersData({ ordersId: query.ordersId, servicerId: servicerId }, function() {
            //     redirect_url(forward())
            // })
        },
        clickFn(servicerId, index) {
            switch (this.whichPage) {
                // 服务/配送人员列表
                case 1:
                    this.linkToDetail(servicerId);
                    break;
                // 选择服务/配送人员
                case 2:
                    this.currentServicerIndex = index;
                    this.chooseServicer(servicerId);
                    break;
                // 服务/配送人员管理
                default:
                    // todo
                    break;
            }
        }
    },
    computed: {
        // 区分页面的作用
        whichPage: function() {
            var result = 0;

            switch (this.query.type) {
                // 服务/配送人员列表
                case 'preview':
                    result = 1;
                    break;
                // 选择服务/配送人员
                case 'choose':
                    result = 2;
                    break;
                // 服务/配送人员管理
                default:
                    result = 3;
                    break;
            }
            return result;
        },
        query() {
            return this.$route.query
        }
    }
}
</script>

<style scoped>
.service-person-list .panel-item {
    position: relative
}

.service-person-list .btn {
    padding: 5px 15px;
    margin-left: 10px;
    font-size: .86rem
}


.weui-cell_switch {
    float: right;
    padding: 0
}
</style>
