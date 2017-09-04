<template>
	<div class="merchant-detail" v-if="shopview.shop">
		<div class="container panel-item merchant-info-panel">
			<div class="panel-inner">
				<div class="panel-pic">
					<!--<a href="picture-manage.html?type=preview&amp;shopId=f898cbc15d07952b015d07b07ef80001"><img width="72" height="72" :src="shopview.shop.pic" alt=""></a>-->
					<router-link :to="{name:'picture',query:{shopId:query.shopId}}"><img width="72" height="72" :src="shopview.shop.pic" alt=""></router-link>
				</div>
				<div class="merchant-btns" style="z-index: 1;">
					<a href="javascript:;" class="like-btn" data-user-fav="0"></a>
					<a href="javascript:;" class="i-more"></a>
					<div class="more-dropdown" style="display: none;">
						<a href="shop-qrcode.html?name=民安商务宾馆&amp;url=http%3A%2F%2Fwx.o2o.rhy.com%2Fshop-detail.html%3FshopId%3Df898cbc15d07952b015d07b07ef80001" class="drop-item">二维码</a>
						<a href="shop-complain.html?shopId=f898cbc15d07952b015d07b07ef80001&amp;name=民安商务宾馆&amp;wholeAddress=深圳市宝安区长春中路1巷8号" class="drop-item">店铺投诉</a>
					</div>
				</div>
				<div class="gray panel-info">
					<h2 class="panel-tit two-thirds nowrap">{{shopview.shop.name}}</h2>
					<p class="f12"><i class="star" :class="star"></i></p>
					<!---->
				</div>
				<div class="lightgray merchant-info-address"><img width="19" src="../../../../src/assets/images/icon_adress.png" alt="" class="pull-right">
					<p class="nowrap">{{shopview.wholeAddress}}&nbsp;&nbsp;{{shopview.shop.distance}}</p>
				</div>
			</div>
		</div>
		<div class="merchant-tabbox-panel" style="height: 533px;">
			<div class="panel merchant-tabbox-meun">
				<nav class="mod-box tap-panel tab-panel-primary">
					<a data-type="sp" href="javascript:;" class="box-flex tap-meun" :class="tabs == 1 ? 'tap-meun-on' : ''" @click="tabSwitch(1)">商品</a>
					<a data-type="sj" href="javascript:;" class="box-flex tap-meun" :class="tabs == 2 ? 'tap-meun-on' : ''" @click="tabSwitch(2)">商家</a>
				</nav>
			</div>
			<div class="merchant-tabbox scroll-wrap" style="top: 41px;overflow-y: auto;" v-show="tabs == 1">
				<div id="J-scroll-sideNav" class="pull-left scroll-side">
					<div class="side-inner">
						<ul class="side-nav">
							<li v-for="(item, index) in shopview.categoryList" :class="sideclass == index ? 'on' : ''" @click="goodsList(item.goodsCategoryId,item.name)">
								<a href="javascript:;">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div id="J-scroll-con" class="pull-right scroll-con" v-if="goods.list">
					<div class="scroll-con-inner">
						<p class="bg-gray p10 f12">{{goods.title}}</p>
						<div class="product-list">
							<div id="conLoading" class="text-center ptb10" style="display: none;"><img src="images/loading-1.gif" alt=""></div>
							<div class="mt30 text-center" v-show="goods.list.length == 0">暂无商品~</div>
							
							<div class="panel-item" v-for="item in goods.list">
								<div class="panel-inner">
									<router-link :to="{name:'productdetails',query:{goodsId:item.goodsId}}"  class="panel-pic"><img width="70" height="70" :src="item.pics[0].picUrl" alt=""></router-link>
									<div class="panel-info f12">
										<h2 class="panel-tit nowrap"><a data-rel-tit="true" href="product-datail.html?goodsId=f898cbc15d07bf6e015d07ca30fb0008">{{item.name}}</a></h2>
										<div class="mt5 clearfix">
											<cartcontrol :goods="item" :select-goods="selectGoods"></cartcontrol>
											销量：{{item.salesNum}}
										</div>
										<p class="mt5 emb-red"><span class="price mr5">¥ <i data-rel-price="50.00" class="f18">{{item.price}}</i></span></p>
									</div>
								</div>
							</div>
							
						</div>
						<div id="pullUp" class="hidden"><span class="pullUpIcon"></span><span class="pullUpLabel">向上拉获取更多数据...</span></div>
					</div>
				</div>
			</div>
			<div class="merchant-tabbox" style="height: 494px; overflow-y: auto;" v-show="tabs == 2">
				<!---->
				<div class="panel-nobrd shop-info-panel">
					<div class="panel-bd">
						<h2 class="f14 mb10">店铺简介</h2>
						<div class="gray f12">{{shopview.shop.summary}}</div>
					</div>
				</div>
				<div class="panel-nobrd shop-hours-panel f12">
					<div class="panel-bd">
						<h2 class="f14">营业时间</h2>
						<p>{{opentime.st}}-{{opentime.et}}</p>
						<ul class="list-fl mt10">
							<li v-for="(item,index) in week" v-show="opentime['w'+index] == 1"><a href="javascript:;" class="day">{{item}}</a></li>
							<!--<li v-show="opentime.w1 == 1">
								<a href="javascript:;" class="day">周二</a>
							</li>
							<li v-show="opentime.w2 == 1">
								<a href="javascript:;" class="day">周三</a>
							</li>
							<li v-show="opentime.w3 == 1">
								<a href="javascript:;" class="day">周四</a>
							</li>
							<li v-show="opentime.w4 == 1">
								<a href="javascript:;" class="day">周五</a>
							</li>
							<li v-show="opentime.w5 == 1">
								<a href="javascript:;" class="day">周六</a>
							</li>
							<li v-show="opentime.w6 == 1">
								<a href="javascript:;" class="day">周日</a>
							</li>-->
						</ul>
					</div>
				</div>
			</div>
			<shopcart :select-goods="selectGoods" :phone="shopview.shop.phone"></shopcart>
		</div>
	</div>
</template>

<script>
	import qs from 'qs'
	import cartcontrol from "@/components/cartcontrol/cartcontrol"
	import shopcart from "@/components/shopcart/shopcart"
	
	export default {
		data() {
			return {
				query:{},
				shopview:{},
				sideclass:0,
				goods:{},
				tabs:1,
				opentime:{},
				week:['周一','周二','周三','周四','周五','周六','周日']
			}
		},
		methods: {
			initData() {
				var id = qs.stringify(this.query);
				var _this = this;
				this.$axios.post(this.$api.shopview,id)
					.then(({status,data}) => {
						
						_this.shopview = data;
						_this.opentime = data.shop.opentime;
						
						_this.goodsList();
					})
			},
			goodsList(id,name) {
				var _this = this;
				var id = id || _this.shopview.categoryList[0].goodsCategoryId;
				var name = name || _this.shopview.categoryList[0].name;
				var data = {
					page:1,
					categoryId:id,
					shopId:_this.query.shopId
				}
				data = qs.stringify(data);
				
				this.$axios.post(this.$api.getgoodslistbycategory,data)
					.then(({status,data}) => {
						
						_this.goods = {title:name,list:data};

					})
			},
			tabSwitch(num) {
				this.tabs = num;
			}
		},
		computed: {
			star() {
				return 'star-'+this.shopview.shop.score;
			},
			selectGoods() {
				var goods = [];
				if(this.goods.list){
					this.goods.list.forEach((good) => {
						if(good.count){
							goods.push(good)
						}
					})
				}
				return goods;
			}
		},
		created() {
			this.query = this.$route.query;
			
			this.initData();
		},
		components:{
			cartcontrol,
			shopcart
		}
	}
</script>

<style>
</style>