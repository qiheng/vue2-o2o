<template>
    <div class="animsition shop-manage" v-cloak>
        <!-- 数据区 -->

        <!--<div class="shop-manage-panel white">-->
            <!--<a href="javascript:;" @click.prevent="manageShop" class="block p10 clearfix shop-manage__info">-->
                <!--<div class="pull-left">-->
                    <!--<img class="logo" width="40" height="40"-->
                         <!--:src="shopMangeData.shop.pic ? shopMangeData.shop.pic + '?x-oss-process=image/resize,m_fixed,h_100,w_100' : 'images/empty/default_shop_logo.png'" alt=""/>-->
                <!--</div>-->
                <!--<div class="bfc-panel pl10">-->
                    <!--<h1 class="f16 white">{{ shopMangeData.shop.name | cutstr(20) }}</h1>-->
                    <!--<p class="f12 address mt2">{{ shopMangeData.shop.address }}</p>-->
                <!--</div>-->
                <!--<i class="arr-rt pos-rt-middle"></i>-->
            <!--</a>-->
            <!--<div class="shop-manage__sale">-->
                <!--<p>今日销售金额</p>-->
                <!--<p class="price">&yen;<b>{{ toFixed(shopMangeData.todaySalePrice) }}</b></p>-->
            <!--</div>-->
            <!--&lt;!&ndash;<ul v-if="shopMangeData.status != 1 || shopMangeData.license != 2" class="shop-manage__notice">&ndash;&gt;-->
            <!--<div class="swiper-container shop-manage__notice">-->
                <!--<ul class="shop-manage__notice1">-->
                    <!--&lt;!&ndash;status 1正常，0未审核，2审核不通过&ndash;&gt;-->
                    <!--&lt;!&ndash;license 0未认证，1认证中，2已认证，3认证未通过。0和3可打开认证页面进行认证，1和2提示状态即可。&ndash;&gt;-->
                    <!--&lt;!&ndash;"您还没有进行商铺认证哦！完成认证生意会更火！",&ndash;&gt;-->
                    <!--&lt;!&ndash;"您的商铺正在审核认证中，请耐心等待审核结果！",&ndash;&gt;-->
                    <!--&lt;!&ndash;"您的认证未通过，继续完成认证生意会更火！",&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="swiper-slide">您的认证未通过，继续完成认证生意会更火！</li>&ndash;&gt;-->
                    <!--<li v-if="shopMangeData.shop.license == 0 || shopMangeData.shop.license == 3">-->
                        <!--<a href="javascript:;" @click.prevent="authShop"><ins class="white">当前店铺未认证，7天后自动关闭，请提交认证</ins></a>-->
                    <!--</li>-->
                    <!--<li v-if="shopMangeData.shop.status == 0 || shopMangeData.shop.license == 1">店铺审核中，审核成功后买家方可访问</li>-->
                    <!--<li v-if="shopMangeData.shop.status == 2">您的店铺审核不通过，如有疑问请拨打平台电话</li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="shop-manage-enter">-->
            <!--<div class="list-fl ptb10">-->
                <!--&lt;!&ndash; 权限功能模块 &ndash;&gt;-->
                <!--<template v-for="(module, index) in modules">-->
                    <!--<a v-if="module.isQxShow" class="block list-item" :href="module.href">-->
                        <!--<img width="40" height="40" :src="'images/icons-v3/icons1/'+module.pic" alt=""/>-->
                        <!--<p class="mt5">{{ module.name }}</p>-->
                    <!--</a>-->
                <!--</template>-->

            <!--</div>-->
        <!--</div>-->
        <router-link :to="{name:'userCenter'}" class="go-back"></router-link>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                modules:[],
                shopMangeData:{
                    shop:{}
                }
            }
        },
        created: function () {
            var _this = this;

            // 获取店铺管理数据
            _this.$axios.get(this.$api.manageIndex)
                .then(function (status,data) {
                        _this.shopMangeData = data;
                        console.log(data,'++++++++++++++++++++++++++++');
                        // 功能模块
                        var modules = [
                            {
                                id:1,
                                name: '商品管理',
                                pic:'icon_spgl.png',
                                href:'goods-manage.html',
                                // （根据权限，店铺类型）控制该模块是否显示
                                isQxShow:true
                            },
                            {
                                id:2,
                                name: '订单管理',
                                pic:'icon_ddgl.png',
                                href:'order-manage.html?shopTypeId=' + shopMangeData.shop.shopTypeId,
                                isQxShow:true
                            },
                            {
                                id:6,
                                name: '服务人员',
                                pic:'icon_fwry.png',
                                href:'service-person-manage.html?shopId=' + shopMangeData.shop.shopId,
                                isQxShow:true
                            },
                            {
                                id:8,
                                name: '扫码核销',
                                pic:'icon_smxh.png',
                                href:'input-consumer-code.html',
                                isQxShow: (shopMangeData.shop.shopTypeId === shopTypeId.ddxf)
                            },
                            {
                                id:11,
                                name: '外送费设置',
                                pic:'icon_wsfsz.png',
                                href:'ws-set-price.html' + ((shopMangeData.shop.priceBeginSend != null) ? '?priceBeginSend='+shopMangeData.shop.priceBeginSend + '&priceSend=' + shopMangeData.shop.priceSend : ''),
                                isQxShow:(shopMangeData.shop.shopTypeId === shopTypeId.jsws)
                            },
                            {
                                id:12,
                                name: '物流设置',
                                pic:'icon_wlsz.png',
                                href:'logistics-manage.html?shopId=' + shopMangeData.shop.shopId,
                                isQxShow:(shopMangeData.shop.shopTypeId === shopTypeId.synthe)
                            },
                            {
                                id:10,
                                name: '营销管理',
                                pic:'icon_yxgl.png',
                                href:'marketing-promotion.html?shopId=' + shopMangeData.shop.shopId,
                                isQxShow:true
                            },
                            {
                                id:5,
                                name: '图片管理',
                                pic:'icon_tpgl.png',
                                href:'picture-manage.html?shopId=' + shopMangeData.shop.shopId,
                                //						href:'slide-setup.html',
                                isQxShow:true
                            },
                            {
                                id:13,
                                name: '预览店铺',
                                pic:'icon_yldp.png',
                                href:'shop-detail.html?shopId=' + shopMangeData.shop.shopId,
                                isQxShow:true
                            },
                            {
                                id:9,
                                name: '权限管理',
                                pic:'icon_wtgl.png',
                                //href:'admin-authority.html?shopId=' + shopMangeData.shop.shopId + '&shopTypeId=' + shopMangeData.shop.shopTypeId,
                                href:'admin-authority.html?shopTypeId=' + shopMangeData.shop.shopTypeId + '&shopId=' + shopMangeData.shop.shopId,
                                isQxShow:true
                            },
                            {
                                id:14,
                                name: '邀请注册',
                                pic:'icon_yqzc.png',
                                href:'',
                                isQxShow:false
                            },
                            {
                                id:4,
                                name: '查看投诉',
                                pic:'icon_tous.png',
                                href:'view-check-error.html',
                                isQxShow:true
                            }
                        ];

                        // 数据绑定到 vm.$data上，更新视图数据
                        // 管理员特殊处理
                        if (shopMangeData.priv) {

                            var privList = shopMangeData.priv.split(','),
                                    tmp = [];

                            modules.forEach(function (module) {

                                privList.forEach(function (privId) {

                                    if (module.id == privId) {
                                        tmp.push(module)
                                    }

                                })

                            });

                            modules = tmp;

                        }

                        _this.modules = modules;

                        // 将店铺信息缓存在本地
                        store.set('__shopInfo', shopMangeData.shop)
                    })
//                .fail(function () {
//                        // 跳转到错误页面
//                        //redirect_url()
//                })
        }
//        methods: {
//            // 是否有店铺管理某权限 有:true; 无:false
//            hasOnePriv: function (priv) {
//                var spriv = this.shopMangeData.priv;
//
//                return !spriv || spriv && spriv.indexOf(priv) != -1
//            },
//            tipsMsg: function (msg, cb) {
//                layer.msg(msg, function () {
//                    cb && cb()
//                })
//            },
//            manageShop: function () {
//                // 3 代表店铺设置
//                if (this.hasOnePriv('3')) {
//                    redirect_url('shop-edit-setup.html')
//                } else {
//                    this.tipsMsg('您没有该权限')
//                }
//            },
//            authShop: function () {
//                // 7 代表店铺认证
//                if (this.hasOnePriv('7')) {
//                    redirect_url('shop-certification.html?shopId='+ this.shopMangeData.shop.shopId)
//                } else {
//                    this.tipsMsg('您没有该权限')
//                }
//            }
//        };
    }
</script>
<style scoped lang="scss">
    /* 这块样式还需要后期整理 */
    .shop-manage-enter .list-item {
        padding-top: 15px;
        padding-bottom: 15px;
        border: 0;
    }

    .shop-manage-panel {
        position: relative;
        background-color: #ff8f0c;
        padding-bottom: 40px;
    }

    .shop-manage__info {
        position: relative;
        .arr-rt:before {
            border-color: #fff;
        }
        .logo {border: 2px solid #fff; border-radius: 50%}
        .address {
            color: #fad2d2;
        }
    }
    .shop-manage__sale {
        background-color: #ffa53d;
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
        text-align: center;
        padding: 10px 5px 5px;
        .price {
            font-size: 24px;
        }
        b {
            font: 400 36px/50px Arial;
        }
    }
    .shop-manage__notice {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        background-color: rgba(0,0,0,.2);
        li {
            line-height: 30px;
            height: 30px;
            overflow: hidden;
        }
    }
</style>