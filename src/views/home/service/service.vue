<template>
	<div class="">
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
		<div class="classify-sort-layer" style="top: 91px;" v-show="cateFlag != 0" @click="showSort(0)">
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
								<li class="level-2" v-for="(item, index) in shopcategorylist" :class="shopCategoryId == shopcategorylist[index].shopCategoryId ? 'on' : ''">
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
               page:1,
               order:0,
               cateFlag : 0,
               shoplist:[],
               shopCategoryId:'',
               shopcategorylist:[]
			}
		},
		methods: {
			getQuerys() {
				let querys = this.$route.query;
				this.querys = querys;
			},
			//请求店铺列表
			initData() {
				var _this = this;
				var sortData = {
					page : _this.page,
					shopClassId: _this.querys.shopClassId,
					shopCategoryId: _this.shopCategoryId,
					order: _this.order
				}
				
				sortData = qs.stringify(sortData);
				
				this.$axios.post(this.$api.shoplist,sortData)
					.then(({status, data}) => {
						
						_this.shoplist = data;
						
					})
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
</style>