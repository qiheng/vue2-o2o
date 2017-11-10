<template>
    <div class="animsition user-info-wrap" v-cloak>
        <form class="fm-control pb15" action="/" method="POST">
            <div class="fm-group mt10">
                <div class="fm-line head-pic clearfix">
                    <label class="l-label">LOGO</label>
                    <div class="pull-right">
					<span class="upload-parts block mr20">
						<img class="upload-img" width="40" height="40"
                             :src="shop.pic ? shop.pic+'?x-oss-process=image/resize,m_fixed,h_113,w_113' : 'images/empty/default_shop_logo.png'" alt="qiheng">
						<input @change="changeHeadPic" type="file" name="logo" class="file-pic"/>
					</span>
                        <i class="arr-rt pos-rt-middle"></i>
                    </div>
                </div>
                <div class="fm-line">
                    <label class="l-label">店铺名称</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupName',query:{'name':shop.name}}">
                        <input class="text-right lightgray mr10" type="text" :value="shop.name" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">店铺分类</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupClassify'}">
                        <input class="text-right lightgray mr10" type="text" :value="shop.shopCategoryName" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
                <div class="fm-line">
                    <label class="l-label">店铺地址</label>
                    <router-link class="pull-right"   :to="{name:'shopEditSetupAddress'}">
                        <input class="text-right lightgray mr10" type="text" :value="addressTxt" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
                <div class="fm-line">
                    <label class="l-label">店铺电话</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupPhone'}">
                        <input class="text-right lightgray mr10" type="tel" :value="shop.phone" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
                <div v-if="shop.reangName" class="fm-line">
                    <label class="l-label">服务范围</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupRange'}">
                        <input class="text-right lightgray mr10" type="text" :value="shop.reangName" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
            </div>

            <div class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">营业时间</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupTime'}">
                        <input class="text-right lightgray mr10" type="text" value="修改" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
                <div class="fm-line">
                    <label class="l-label">店铺描述</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupDesc'}">
                        <input class="text-right lightgray mr10" type="text" value="修改" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
                <div class="fm-line">
                    <label class="l-label">支付方式</label>
                    <router-link class="pull-right" :to="{name:'shopEditSetupPay'}">
                        <input class="text-right lightgray mr10" type="tel" value="修改" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </router-link>
                </div>
            </div>

            <div v-if="shop.license == 0" class="fm-group mt10">
                <div class="fm-line">
                    <label class="l-label">店铺认证</label>
                    <a class="pull-right" href="shop-certification.html">
                        <input class="text-right lightgray mr10" type="text" :value="shop.license == 1 ? '认证' : '未认证'" readonly="readonly"/>
                        <i class="arr-rt pos-rt-middle"></i>
                    </a>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                upLoading: false,
                shop: {}
            }
        },
        created: function () {
            var shop = JSON.parse(localStorage.getItem('__shopInfo'));
            console.log(shop,'33333333333333333333333333333333')

            // 无本地缓存，则重新请求接口获取数据
            if (!shop) {
                this.$axios.get(this.$api.manageIndex)
                    .then(function(shopInfo) {
                    shop = shopInfo
                })
            }

            this.shop = shop;
        },
        methods: {
            loadImageFile:function(el, yesFn, noFn) {
                var oFReader = new FileReader(),
                    rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                /**
                 * 清空File类型input的值
                 * @param {Object} file DOM 元素
                 */
                function clearFileInput(file){

                    var form = document.createElement('form'),
                        pos = file.nextSibling;

                    document.body.appendChild(form);

                    form.appendChild(file);
                    form.reset();

                    pos.parentNode.insertBefore(file, pos);
                    document.body.removeChild(form);
            }

            if (!el.files) {
                utils.asyncAlert('不支持拍照本地预览！');
                clearFileInput(el);
                noFn && noFn.call(el);
                return false;
            }

            var oFile = el.files[0];

            if (oFile.size > 1024 * 1024 * 5) {
                utils.asyncAlert('上传图片不能大于5M！');
                clearFileInput(el);
                noFn && noFn.call(el);
                return false;
            }

            if (!rFilter.test( oFile.type )) {
                utils.asyncAlert("图片格式不正确，请重新拍照或选择！");
                clearFileInput(el);
                noFn && noFn.call(el);
                return false;
            }

            oFReader.onload = function (oFREvent) {
                //document.getElementById("uploadPreview").src = oFREvent.target.result;
                yesFn && yesFn.call(el, oFREvent);
            };

            oFReader.readAsDataURL(oFile);
                console.log($)
                $.ajaxSubmit({
                    //type:'post',
                    url: ajaxServerUrl + url,
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    statusCode: {
                        309: function() {
                            alert("上传图片太大,无法提交上传");
                        }
                    },
                    //data: _para,
                    beforeSubmit: function (arr, $form, options) {
                        // 提交效果
                        loadPage.pageload({retain: true});
                    },  //提交前的回调函数
                    success: function (result) {
                        var data, query = parseURL().query, _goback = '';

                        //去除提交效果
                        loadPage.unpageload();

                        if (config.env === 'dev') {
                            console.log('ajax msg: ' + url + ': status=' + result.status + '&msg=' + result.msg);
                        }

                        data = result.data;

                        if (result.status === 1) {
                            // 回调处理
                            return yesFn && yesFn(data);
                        } else if (result.status === -91) {
                            // 未登录
                            //_goback = !!(document.referrer) ? '?goback=' + encodeURIComponent(document.referrer) : '';
                            //redirect_url('login.html' + _goback);
                            redirect_url('login.html');
                        } else {
                            // 防止成功 但 status != 1
                            if (noFn && noFn(result) === false) return;

                            // 404
                            redirect_url();
                        }

                    },
                    error: function (res, resTxt) {
                        var query = parseURL().query;
                        //去除提交效果
                        loadPage.unpageload();

                        if (query['dev']) {
                            console.log('ajax msg: ' + res);
                        }
                        // noFn && noFn(res, resTxt);
                        if (noFn && noFn(res, resTxt) === false) return;
                        // 404
                        redirect_url();
                    }
                });
        },
        // 修改 店铺 logo
        changeHeadPic: function ($e) {
            var _this = this,
                $self = $($e.target),
                $parent = $self.parent();

            if (!_this.upLoading) {
                _this.upLoading = true;

                _this.loadImageFile($self[0], function (ev) {
                    // 成功后的回调函数
                    function showResponse(shopInfo) {
                        console.log('result:',result);
                        // 回调处理
                        $parent.find('.upload-img').attr('src', shopInfo.pic || ev.target.result);
                        _this.upLoading = false;

//                            shop = store.set('__shopInfo', shopInfo);
                        _this.shop = localStorage.setItem('__shopInfo', JSON.stringify(shopInfo));
                        console.log(shop,'988888888888888888888888888888888888888888888888888');
                        _this.$notiejs({
                            state: 1,
                            msg: '修改成功',
                        });
                    }

                    // 错误处理
                    function errorResponse(res, resTxt) {
                        _this.upLoading = false;
                        _this.$notiejs({
                            state: 2,
                            msg: '图片过大，请上传规格为113*113Px的图片',
                        });
                    }

                    ajaxSubmit($('.fm-control'), '/manage/setshoplogo', showResponse, errorResponse);
                }, function () {
                    _this.upLoading = false;
                });
            }

        }
    },
        computed: {
            addressTxt: function () {
                var shop = this.shop;

                return (shop.provinceName+' '+shop.cityName+' '+shop.areaName+' '+shop.address).substring(0, 10) + '...';
            },
        }
    }
</script>

<style scoped>
.pos-rt-middle{
    /* right: 0; */
}
</style>
