<template>
    <div class="service-person-manage" v-cloak>
        <div class="servicer">
            <ul v-if="servicerList.length" class="mt10 service-person-list">
                <!-- 数据区 -->
                <li @click="clickFn(servicerItem.servicerId, index)" v-for="(servicerItem, index) in servicerList" class="panel-item">
                    <div class="clearfix container">
                        <div class="pull-left mr10"><img class="block radius50" width="40" height="40" :src="servicerItem.pic1+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt=""/></div>
                        <div class="pull-left mt3">
                            <h2>{{ servicerItem.name }}</h2>
                            <p class="lightgray f12">{{ servicerItem.position }}</p>
                        </div>
                        <div v-if="whichPage == 3" class="pull-right mt5">
                            <a :href="'add-service-person.html?type=edit&servicerId=' + servicerItem.servicerId" class="btn btn-primary">编辑</a>
                            <a @click="del(index)" href="javascript:;" class="btn btn-weaken">删除</a>
                        </div>
                        <i v-if="whichPage == 2" class="i-radio pos-rt-middle" :class="{checked:currentServicerIndex == index}"></i>
                    </div>
                </li>
            </ul>
            <empty v-else :msg="emptyMsg"></empty>
        </div>
        <template v-if="whichPage == 3">
            <p class="container mt30">
                <router-link :to="{name:'addServicePerson',query:{'type':'add'}}" class="btn btn-block btn-primary btn-lg" >添加服务人员</router-link>
            </p>
            <router-link :to="{name:'shopManage'}" class="go-back"></router-link>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                emptyMsg:{
                    mainMsg:'暂无服务人员~',
                    subMsg:'赶紧去添加服务人员吧~'
                },
                currentServicerIndex:-1,
                shopId:'',
                servicerList:[]
            }
        },
        created: function () {
            var _this = this;
            const query = this.query;
            _this.shopId = query.shopId;
            console.log(_this.shopId,'+++++++++++++++++++++++++++');
            // 初始化服务人员
            _this.$axios.get(_this.$api.servicerlist,{params:{shopId: query.shopId}})
                .then(function (servicerList) {
                    _this.servicerList = servicerList;
                })
        },
        methods: {
            del: function (index) {
                var _this = this,
                    servicerItem = this.servicerList[index];

                // 删除提示层
                layer.open({
                    title: '温馨提示',
                    shift: 1,
                    content:'您确定要删除吗？',
                    btn: ['确定', '取消'],
                    yes: function (idx, layerEl) {
                        layer.close(idx);

                        // 提交删除
                        _this.$axios.get(_this.$api.delservicer,{params:{servicerId: servicerItem.servicerId}})
                            .then(function () {
                                _this.servicerList.splice(index,1);
                            })
                    }
                });
            },
            // 跳转服务/配送人员详情
            linkToDetail: function (servicerId) {
                // 如果列表页面，则可跳转到服务人员详情
                redirect_url('delivery-staff.html?servicerId='+ servicerId)
            },
            // 服务/配送处理
            chooseServicer: function (servicerId) {
                // 提交服务/配送处理
                _A.setSendOrdersData({ordersId: query.ordersId, servicerId: servicerId}, function () {
                    redirect_url(forward())
                })
            },
            clickFn: function (servicerId, index) {
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
                    default :
                        // todo
                        break;
                }
            }
        },
        computed: {
            // 区分页面的作用
            whichPage: function () {
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
                    default :
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

<style>
    .service-person-list .panel-item {position: relative}
    .service-person-list .btn {padding: 5px 15px; margin-left: 10px; font-size: .86rem}
    .weui-cell_switch{float: right;padding: 0}
</style>
