<template>
	<div class="viewbox">
		<div class="header nav-header-search">
			<span id="categoryName" class="white pull-left nowrap" style="max-width: 25%;">{{querys.shopClassName}}</span>
			<router-link :to="{name:'search',query:{t:4}}" class="bfc-panel">
				<i class="btn icos-sprite search-btn pull-right"></i>
				<div class="header-search">
					<p class="search-key lightgray pl10">输入综合服务商家名称</p>
				</div>
			</router-link>
		</div>
		<div class="panel-nobrd classify-wrap">
			<ul class="mod-box gray text-center">
				<li data-rel="classify" class="box-flex panel-bd" @click="showSort(1)">
					<span class="mr5">全部分类</span>
					<i class="icon-down-gray"></i>
				</li>
				<li data-rel="sort" class="box-flex panel-bd" @click="showSort(2)">
					<span class="mr5">{{sort[order]}}</span>
					<i class="icon-down-gray"></i>
				</li>
			</ul>
		</div>
		<!--分类-->
		<div class="classify-sort-layer" style="top: 92px;" :class="cateFlag != 0 ? 'active':''" @click="showSort(0)">
			<div class="classify-con" v-show="cateFlag == 1">
				<div class="classify-level-1" style="display: none;">
					<div class="classify-level-inner">
						<ul></ul>
					</div>
				</div>
				<div class="classify-level-2" style="width: 100%;">
					<div class="classify-level-inner">
						<div class="classify-list">
							<ul class="sub-tpl">
								<li class="level-2" v-for="(item, index) in shopcategorylist" :class="shopCategoryId == shopcategorylist[index].shopCategoryId ? 'on' : ''" :key="index">
									<a href="javascript:;" :data-num="item.shopCount" @click="categoryId(index)">{{item.name}}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="sort-con" v-show="cateFlag == 2">
				<ul>
					<li v-for="(item, index) in sort" :data-order="index" :class="order == index ? 'on' : ''" @click="sortgory(index)">
						<a href="javascript:;">{{item}}</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- 店铺列表 -->
		<scroller class="scroller" :on-infinite="infinite">
			<div class="panel-list-nospace hot-apply-list">
				<div class="hot-apply-bd">
					<router-link :to="{name:'shopDetail',query:{shopId:item.shopId,shopClassName:item.shopClassName}}" class="container panel-item" v-for="(item, index) in shoplist" :key="index">
						<div class="panel-inner">
							<div class="panel-pic">
								<img width="72" height="72" src="../../../assets/images/default-empty.png" alt="">
							</div>
							<div class="gray f12 panel-info">
								<h2 class="panel-tit">{{ item.name }}</h2>
								<p>
									<i class="star2" :class="'star-'+item.score"></i>
									<span class="dib-middle ml5 orange">{{ item.score }}</span>
									<span class="ml30 lightgray">月售：{{ item.self }}单</span>
								</p>
								<p class="nowrap mt5"></p>
								<div class="clearfix mt5">
									<p class="pull-left">
										<span class="i-label mr5">{{ item.shopCategoryName }}</span>
										<span class="i-label">{{ item.shopTypeName }}</span>
									</p>
									<i class="pull-right ml5 mt5">{{ item.distance }}</i>
								</div>
								<!---->
							</div>
						</div>
					</router-link>
				</div>
				<div class="load-panel" style="display: none;">
					<div class="load-no-data">暂无更多数据</div>
				</div>
			</div>
		</scroller>
		
		<!-- 没有店铺时 -->
		<div class="panel-list-nospace hot-apply-list" v-show="shoplist.length === 0">
			<div class="hot-apply-bd">
				<empty :msg="emptyMsg"></empty>
			</div>
		</div>
	</div>
</template>

<script>
	import empty from "@/components/empty/empty"
	import qs from 'qs'
	
	export default{
		data(){
			return {
				querys:{},
				emptyMsg: {
                    mainMsg:'暂无店铺列表'
               },
               sort:['智能排序','离我最近','好评优先','人气最高'],
               page:1,	//分页
               order:0,	//排序类型
               cateFlag : 0,
			   loading: true,
               shoplist:[],		//店铺列表
               shopCategoryId:'',	//当前分类
			   shopcategorylist:[],	//分类列表
			   noData:false
			}
		},
		methods: {
			getQuerys() {
				let querys = this.$route.query;
				this.querys = querys;
			},
			//请求店铺列表
			initData(bConcat, cb) {
				var _this = this;
				if ($.isFunction(bConcat)) {
					cb = bConcat;
					bConcat = null;
				}
				!bConcat  ? (this.loading = true) : '';

				var sortData = {
					page : _this.page,
					shopClassId: _this.querys.shopClassId,
					shopCategoryId: _this.shopCategoryId,
					order: _this.order
				}
				
				
				this.$axios.post(this.$api.shoplist,$.param(sortData))
					.then(({status, data}) => {
						let ordersList = data;
						this.loading = false;
						// 返回空列表，表示无数据
						if (!ordersList.length) {
							this.noData = true
						}
						// 合并
						if (bConcat) {
							this.shoplist = this.shoplist.concat(ordersList)
						} else {
							this.shoplist = ordersList
						}
						this.$nextTick(function () {
							cb && cb(ordersList)
						})
						
					})
			},
			// 分页
			infinite (done) {
				clearTimeout(this.timeId);
				if (this.noData) {
					setTimeout(() => {
						console.log('come over')
						done(true)
					}, 500)
					return;
				}
				this.timeId = setTimeout(() => {
					this.page++;

					this.initData(true, () => {
						done()
					})

				}, 1500)
			},
			//分类隐藏与显示
			showSort(num) {
				if(this.cateFlag == num){
					this.cateFlag = 0;
				} else{
					
					this.cateFlag = num;
				}
			},
			//选择排序
			sortgory(n){
				this.order = n;
				
				this.initData();
			},
			//选择分类
			categoryId(n){
				this.shopCategoryId = this.shopcategorylist[n].shopCategoryId;
				this.querys.shopClassName = this.shopcategorylist[n].name;
				
				this.initData();
			}
		},
		created() {
			this.getQuerys();
			
			var _this = this;
			const shopClassId = qs.stringify({shopClassId:this.querys.shopClassId});
			
			this.$axios.post(this.$api.getshopcategorylist,shopClassId)
	            .then(({ data, status }) => {
	                
	                _this.shopcategorylist = data;
	
	            })
	            
	        this.initData();
		},
		components: {
			empty
		}
	}
</script>

<style scoped="scoped">
.classify-sort-layer.active{display: block}
.scroller{
	padding-top: 91px;
	z-index: -1;
}
</style>