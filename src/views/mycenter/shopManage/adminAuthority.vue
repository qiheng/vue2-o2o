<template>
    <div class="pb60 admin-authority-wrap" v-cloak>
        <!-- 权限管理 start -->
        <div class="admin-authority">
            <p class="p10 lightgray">管理员人列表(管理员人可代为管理店铺)</p>
            <div class="panel admin-authority-list">
                <!-- 数据区 -->
                <template v-if="shopManagerList.length">
                    <div v-for="(shopManagerItem, index) in shopManagerList" class="panel-chunk">
                        <p class="pull-right">
                            <a :href="'chmod-admin-authority.html?usersId='+ shopManagerItem.usersId +'&shopId='+ query.shopId +'&shopTypeId='+query.shopTypeId + (shopManagerItem.priv ?
						 '&priv='+shopManagerItem.priv : '')" class="btn btn-primary">权限</a>
                            <a @click="del(index)" href="javascript:;" class="btn btn-default">删除</a>
                        </p>
                        <p>{{ shopManagerItem.username }}</p>
                    </div>
                </template>
                <empty v-else :msg="emptyMsg"></empty>

            </div>
        </div>

        <div class="container mt30">
            <!--<a class="btn btn-lg btn-block btn-primary" href="add-admin.html">添加管理员</a>-->
            <router-link class="btn btn-lg btn-block btn-primary" :to="{name:'addAdmin'}">添加管理员</router-link>
        </div>
        <!--<router-link :to="{name:'shopManage'}" class="go-back"></router-link>-->

        <div>
            <confirm
                v-model="show4"
                :close-on-confirm="false"
                @on-cancel="onCancel"
                @on-confirm="onConfirm">
                <p style="text-align:center;">{{ '你确定删除吗?'}}</p>
            </confirm>
        </div>

    </div>
</template>

<script>
    import  { Confirm  } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        components: {
            Confirm,
        },
        data() {
            return {
                emptyMsg: {'mainMsg':'暂无数据~'},
                show4: false,
                usersId:{},
                shopManagerList:[]
            }
        },
        created: function () {
            var _this = this;
            _this.$axios.get(_this.$api.shopmanagerlist)
                .then(function (shopManagerList) {
                    _this.shopManagerList = shopManagerList;
                })
        },
        methods: {
            onCancel () {
                this.show4 = false;
            },
            onConfirm(){
                this.$axios.get(this.$api.deleteshopmanager,{params:{usersId: item.usersId}})
                    .then(function () {
                        this.shopManagerList.splice(index, 1)
                    }).catch(function () {
                    alert('删除失败');
                })
            },
            // 删除管理员
            del: function (index) {
                var _this = this,
                    item = this.shopManagerList[index];
                _this.show4 = true;
               _this.usersId =  item.usersId;

                // 删除询问
//                layer.open({
//                    title: '温馨提示',
//                    shift: 1,
//                    content:'您确定要该管理员吗？',
//                    btn: ['确定', '取消'],
//                    yes: function (idx, layerEl) {
//                        layer.close(idx);
//
//                        // 删除管理员
//                        _A.delShopManagerData({usersId: item.usersId}, function () {
//                            _this.shopManagerList.splice(index, 1)
//                        })
//                            .fail(function () {
//                                layer.msg('删除失败')
//                            })
//                    }
//                });

            }
        }
    }
</script>

<style scoped>
    .admin-authority-list .btn {padding:5px 15px; margin-left: 10px; font-size: .86rem}
    .admin-authority-list .panel-chunk {line-height: 30px;}
</style>
