/**
 * Created by Administrator on 2017/9/25.
 */

// 处理购物加减的混合处理
var cartMixin = {
    data () {
        return {
            cartList:{},
            bButton: false
        }
    },
    created () {
        this.getCartList();
    },
    methods: {
        // 送的商品数量计算方式
        getSendNum (num, sendsale) {
            num = num || 0;
            sendsale = sendsale || '1,0';

            let aRule = sendsale.split(',');

            return Math.floor(num / aRule[0]) * aRule[1];
        },
        // 单次满足买N，送的N商品（如: 买2送3）
        setSendNum (num, sendsale) {
            num = num || 0;
            sendsale = sendsale || '1,0';
            aRule = sendsale.split(',');

            return (num % aRule[0]) === 0 ? Number(aRule[1]) : 0;
        },
        // 获取本地缓存中的商品
        getCartList () {
            var cartList = {};

            if (window.sessionStorage) {

                if (window.sessionStorage.cartList) {

                    try {
                        cartList = JSON.parse(window.sessionStorage.cartList)
                    } catch (e) {
                        cartList =  {}
                    }

                }

            } else {
                cartList = store.get('cartList') || {};
            }

            this.cartList = $.extend({}, this.cartList, cartList);

            return this.cartList;

        },
        // 保存购物车中的商品到本地缓存中
        saveCartList (cartList) {
            if (window.sessionStorage) {
                window.sessionStorage.cartList = JSON.stringify(cartList);
            } else {
                store.set('cartList', this.cartList)
            }
        },
        // 检测库存
        checkInventory (goodsId, cb) {
            var _this = this;

            return _A.getGoodsStockData({goodsId: goodsId}, function (info) {

                if (info.num == 0) {
                    //layer.msg('抱歉,库存不足', {icon:2});]
                    alert('抱歉,库存不足')
                } else {
                    cb && cb(info.num)
                }

            }, function (result) {

                //layer.msg(result.msg, {icon:2});
                alert(result.msg);

                return false;
            }).always(function () {
                _this.bButton = false;
            })
        },
        // 监听添加购物车事件处理
        addCartFun (shopId, goodsId, name, price, sales, inventory) {
            let _this = this, sendsale;

            sendsale = sales.value;
            console.log('sendsale:',sendsale);

            var cartList = this.cartList,
                shopCart = cartList[shopId] = (cartList[shopId] || {}),
                goodsItem = shopCart[goodsId] = (shopCart[goodsId] || {});

            //console.log('========this.bButton=========',this.bButton)
            //if (this.bButton) return;
            //this.bButton = true;

            //_this.checkInventory(goodsItem.goodsId, function (num) {
            //
            //	if (goodsItem.num > num) {
            //		goodsItem.num = num
            //	}
            //
            //});

            // 已存在该商品
            if (goodsItem && goodsItem['goodsId']) {
                goodsItem.num++;
            }
            // 新添加入的商品
            else {

                goodsItem.goodsId = goodsId;
                goodsItem.name = name;
                goodsItem.eprice = parseFloat(price);
                goodsItem.inventory = inventory;
                goodsItem.num = 1;

            }
            // 防止该商品做活动时买送规则不一致
            goodsItem.sales = sales;
            goodsItem.sendNum = this.getSendNum(goodsItem.num, sendsale) || 0;

            //this.cartList = $.extend({}, this.cartList, cartList);
            this.cartList = Object.assign(this.cartList, cartList);
            this.saveCartList(cartList);
            //store.set('cartList', this.cartList)
        },
        // 监听移除购物车事件处理
        reduceCartFun (shopId, goodsId, sales) {

            let sendsale = sales.value,
                cartList = this.cartList,
                shopCart = cartList[shopId] || {},
                goodsItem = shopCart[goodsId] || {};

            // 存在该商品时
            if (goodsItem && goodsItem['goodsId']) {

                if (goodsItem.num > 0) {
                    goodsItem.num--;

                    // 防止该商品做活动时买送规则不一致
                    goodsItem.sales = sales;
                    goodsItem.sendNum = this.getSendNum(goodsItem.num, sendsale) || 0;
                }

                if (goodsItem.num <= 0) {
                    delete shopCart[goodsId]
                }

                //this.cartList = $.extend({}, this.cartList, cartList);
                this.cartList = Object.assign(this.cartList, cartList);
                this.saveCartList(cartList);
                //store.set('cartList', this.cartList)
            }

        }
    }
};

export default cartMixin;
