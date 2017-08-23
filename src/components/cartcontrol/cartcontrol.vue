<template>
	<div data-inventory="15" class="add-cart">
		<span class="minus" @click="decreaseCart()"  v-show="goods.count>0">-</span> 
		<span class="num" v-show="goods.count">{{goods.count}}</span> 
		<span class="plus" @click="addCart()">+</span>
	</div>
</template>

<script>
	export default{
		props:{
			goods:{
				type:Object
			},
			selectGoods:{
				type:Array
			}
		},
		methods: {
			addCart() {
				if(!this.goods.count){
					this.$set(this.goods,'count',1);
				} else{
					this.goods.count++;
				}
			},
			decreaseCart(){
				this.goods.count--;
			}
		}
	}
</script>

<style>
</style>