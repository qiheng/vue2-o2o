<template>
    <div class="add-cart">
        <span v-if="goodsNum" @click="reduceCart(shopId, goodsItem.goodsId, sales)" class="minus">-</span>
        <span v-if="goodsNum" class="num">{{ goodsNum }}</span>
        <span ref="madd" @click="addCart(shopId, goodsItem.goodsId, goodsItem.name, goodsItem.eprice, sales, goodsItem.inventory)" class="plus">+</span>
    </div>
</template>

<script>
	export default {
        props:['goodsItem', 'shopId', 'cartList'],
        computed: {
            // 该店铺已加入购物车的商品列表
            shopCart () {
                return this.cartList[this.shopId] || {}
            },
            // 每个商品对应的购买数量
            goodsNum () {
                var goodsId = this.goodsItem.goodsId;

                if (this.shopCart && this.shopCart[goodsId]) {
                    return this.shopCart[goodsId].num + this.shopCart[goodsId].sendNum
                } else {
                    return 0
                }

            },
            // 主要处理买N送M的需求（普通的商品也转换成'1,0'这种规则来处理）
            sales () {
                var __sales = {
                        // 普通默认
                        value: '1,0'
                    },
                    goodsItem = this.goodsItem,
                    sales = goodsItem.sales;

                // 促销类型
                if (sales) {

                    switch (sales.salesType) {
                        // 买N送N
                        case 3:
                        case 7:

                            if (String(sales.value).indexOf(',') != -1) {
                                __sales.value = sales.value
                            } else if (sales.buyN != null && sales.giftN != null) {
                                __sales.value = [sales.buyN, sales.giftN].join(',')
                            }

                            break;
                    }

                    __sales = $.extend({}, sales, __sales);

                }

                return __sales
            }
        },
        methods: {
            // 加入购物车操作
            addCart (shopId, goodsId, name, price, sendsale, inventory) {
                this.$emit('add-cart', shopId, goodsId, name, price, sendsale, inventory)
                console.log(['=====加=====', shopId, goodsId, name, price, JSON.stringify(sendsale), inventory].join(' '));
            },
            // 移除购物车操作
            reduceCart (shopId, goodsId, sendsale) {
                this.$emit('reduce-cart', shopId, goodsId, sendsale);
                console.log(['=====减=====', shopId, goodsId, JSON.stringify(sendsale)].join(' '));
            }
        }
	}
</script>

<style lang="less" scoped>

</style>
