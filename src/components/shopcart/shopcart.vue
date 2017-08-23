<template>
	<div id="minCartPanel" style="bottom:-1px">
		<div class="minCartInfo" :class="selectGoods.length > 0 ? '' : 'empty'">
			<a class="min-cart" href="javascript:;"><ins class="counter nums">{{totalCount}}</ins></a>
			<!-- 空 -->
			<div class="empty-cart">
				<a class="J-contact-sell btn btn-primary btn-contact" href="tel:17817288944">联系商家</a>
				<p class="p-empty lightgray">购物车是空的</p>
			</div>
			<!-- 非空 -->
			<div class="non-empty-cart">
				<a class="btn btn-ok btn-primary" href="javascript:;">选好了</a>
				<div class="bfc-panel f12">
					<p class="txt-line white">共：¥<i class="f16 total-price">{{totalPrice}}</i></p>
				</div>
			</div>
		</div>
		<!-- 购买商品 start -->
		<div class="minCartGoods panel">
			<div class="panel-hd">
				<a class="pull-right clear-all-btn" href="javascript:;"><i class="btn-del-sm"></i>清除全部</a>
				<p class="title">购物车</p>
			</div>
			<div class="minCart-bd">
				<div id="J-cart-list" class="goodsListWrap">
					<ul class="goodsList" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);"></ul>
				</div>
			</div>
		</div>
		<!-- 购买商品 end -->
	</div>
</template>

<script>
	export default{
		props:{
			selectGoods: {
				type: Array,
				default(){
					return []
				}
			}
		},
		computed: {
			totalCount() {
				var num = 0;
				this.selectGoods.forEach((good) => {
					num += good.count;
				})
				return num;
			},
			totalPrice() {
				var price = 0;
				this.selectGoods.forEach((good) => {
					price += good.count*good.price;
				})
				return price;
			}
		},
		created() {
			
		}
	}
</script>

<style>
</style>