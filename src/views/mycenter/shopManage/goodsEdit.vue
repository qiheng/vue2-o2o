<template>
	<div>
		<form class="fm-control" action="/manage/creategoods" enctype="multipart/form-data" method="POST" v-cloak>
			<div class="add-server1 pb60">
				<input v-if="goodsData.goodsId" type="hidden" name="goodsId" :value="goodsData.goodsId" />
				<div class="fm-group">
					<div class="fm-line">
						<label class="l-label pull-left">商品名称</label>
						<div class="bfc-panel"><input class="inp-txt" type="text" name="name" v-model.trim="goodsData.name" placeholder="请输入商品名称"></div>
					</div>
					<div class="fm-line clearfix">
						<label class="l-label pull-left mr10">所属分组</label>
						<template v-if="goodscategorylist.length">
							<div class="self-slt bfc-panel" style="display: block">
								<select name="goodsCategoryId" class="slt" v-model="goodsData.goodsCategoryId">
									<option v-for="opt in goodscategorylist" :value="opt.goodsCategoryId" v-text="opt.name" :key="opt.goodsCategoryId"></option>
								</select>
							</div>
						</template>

						<a v-else class="bfc-panel bg-gray" href="classify-manage.html?forward=add-goods.html"><input class="bg-gray half" type="text" value="添加分类" readonly="readonly">
							<i class="arr-rt pos-rt-middle"></i>
						</a>

					</div>
				</div>

				<div class="fm-group mt10">
					<div class="fm-line">
						<label class="l-label pull-left">价格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<div class="bfc-panel"><input class="inp-txt" type="tel" name="price" v-model.trim="goodsData.price" placeholder="请输入价格"></div>
					</div>
					<div class="fm-line clearfix">
						<label class="l-label pull-left mr10">计量单位</label>
						<template v-if="serviceformatlist.length">
							<div class="self-slt bfc-panel" style="display: block">
								<select name="format" class="slt" v-model="goodsData.format">
									<option v-for="(format, index) in serviceformatlist" :value="format.name" v-text="format.name" :key="index"></option>
								</select>
							</div>
						</template>
					</div>
					<div class="fm-line">
						<label class="l-label pull-left">库存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<div class="bfc-panel"><input class="inp-txt" type="tel" name="inventory" v-model.trim="goodsData.inventory" placeholder="请设置合理库存"></div>
					</div>
					<input type="hidden" name="goodsDepot" value="0">
				</div>

				<div class="fm-group mt10">
					<div class="fm-line add-pic-handle bg-content">
						<label class="l-label">商品图片</label>
						<ul class="J-gallery list-fl mod-box1" data-pswp-uid="1">
							<input type="hidden" name="pics" v-model.trim="goodsData.pics" />
							<template v-if="goodsData.pics">
								<li v-for="(pic, index) in goodsData.pics" class="minPic box-flex" data-size="720x720" data-type="add">
									<img class="min-pic" width="100%" :src="pic.picUrl" alt="" />
									<i @click="delPic(index)" class="J-del i-del"></i>
								</li>
							</template>

							<li class="box-flex jia-btn" :class="{hidden: isHiddenAddPic}">
								<img class="min-pic" width="100%" alt="" />
								<input type="file" name="pic" class="file-pic" @change="addPic">
								<i class="i-del"></i>
							</li>

						</ul>
					</div>

					<div class="fm-line">
						<label class="l-label">商品描述</label>
						<textarea class="block one-full inp-area" name="content" cols="30" rows="3" v-model.trim="goodsData.content" placeholder="请填写商品描述"></textarea>
					</div>
				</div>

			</div>

			<div class="fixed-footer text-right">
				<router-link :to="{name:'goodsStore'}" class="dib mr15">
					<i class="i-jia3"></i>
					从商品库添加
				</router-link>
				<a @click="SaveSubmit( query.type == 'add'?'add':'edit' )" href="javascript:;" class="J-submit btn btn-primary" :class="{disabled:disabled}">
					{{query.type=='add'?'提交':'保存'}}
				</a>
			</div>
		</form>

	</div>
</template>
<script>
import validator from '@/assets/js/validator'

export default {
	data() {
		return {
			// 商品分类
			goodscategorylist: [],
			// 获取规格
			serviceformatlist: [],
			// 商品信息
			goodsData: {
				name: '',
				goodsCategoryId: '',
				format: '',
				price: '',
				content: '',
				inventory: '',
				pics: [{ picUrl: "http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201710/13/15078772715308119.png" }]
			},
			disabled: false

		}
	},
	created() {
			let arr = ['a','b',8,7]
			
		
			console.error(arr.includes('a'))

		//初始化分组和计量单位数据，以及商品数据（编辑状态下）
		this.Init()
	},
	methods: {
		async Init() {
			await this.$axios.get(this.$api.goodscategorylist)
				.then(({ data }) => {
					this.goodscategorylist = data
				})
			await this.$axios.get(this.$api.serviceformatlist)
				.then(({ data }) => {
					this.serviceformatlist = data
				})
			if (this.query.type == 'edit') {
				this.$set(this.goodsData, 'goodsId', this.query.goodsId)
				await this.goodsView()
			}
		},
		goodsView() {
			this.$axios.get(this.$api.goodsview, { params: { goodsId: this.query.goodsId } })
				.then(({ data }) => {
					this.goodsData = data
				})
		},
		addPic() { },
		delPic() { },
		SaveSubmit(type) {
			let that = this,
				oValChar = {};

			if (this.isDisabled) return;
			this.isDisabled = true;
			// 校验字段
			$.each(validator.config, key => {
				let val = this.goodsData[key]
				oValChar[key] = this.goodsData[key]
				if (key === 'pics') {
					oValChar['pics'] = val.length == 0 ? '' : JSON.stringify(val)
				}
			});
			// 校验表单
			if (!validator.validate(oValChar, true)) {
				return $.each(validator.messages, (i, val) => {
					this.$notiejs({
						state: 2,
						msg: val,
						end() {
							that.isDisabled = false
						}
					});
					return false;
				})
			}
			if (type != 'add') {
				oValChar['goodsId'] = this.goodsData.goodsId;
			}
			this.$axios.post(type == 'add' ? this.$api.creategoods : this.$api.updategoods, $.param(oValChar)).then(({ data, msg }) => {
				this.$notiejs({
					state: 1,
					msg,
					end() {
						that.$router.back()
					}
				});
			})
		},
	},
	mounted() {
		bindEvent(this)
	},
	computed: {
		query() {
			return this.$route.query
		},
		picsTostr() {
			return JSON.stringify(this.goodsData.pics || '');
		},
		// 控制新增图片上传按钮
		isHiddenAddPic() {
			return this.goodsData.pics && this.goodsData.pics.length > 5
		}

	}
};
function bindEvent(vm) {
	// 配置验证信息
	validator.config = {
		name: [{ strategy: 'isNonEmpty', errorMsg: '请输入商品名称' }, { strategy: 'minLength:2', errorMsg: '商品名称长度(2~45)必须符合规范' }],
		goodsCategoryId: [{ strategy: 'isNonEmpty', errorMsg: '请选择所属分类' }],
		price: [{ strategy: 'isNonEmpty', errorMsg: '请输入价格' }, { strategy: 'isPrice' }],
		inventory: [{ strategy: 'isNonEmpty', errorMsg: '请输入库存' }, { strategy: 'isIntege', errorMsg: '请输入正确的库存数' }],
		format: [{ strategy: 'isNonEmpty', errorMsg: '请输入规格' }],
		pics: [{ strategy: 'isNonEmpty', errorMsg: '请至少上传一张商品图片' }],
		content: [{ strategy: 'isNonEmpty', errorMsg: '请输入介绍' }, { strategy: 'minLength:2', errorMsg: '介绍必须大于2个字符' }]
	}
}
</script>
