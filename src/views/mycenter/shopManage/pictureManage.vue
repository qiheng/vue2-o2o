<template>
    <div>
        <div class="picture-manage-panel pb60">
            <form class="setup-slide-pic" action="?" method="POST" enctype="multipart/form-data">
                <loading v-show="loading"></loading>
                <template v-show="!loading">
                    <ul v-if="shopSlideList.length" class="list-fl picture-manage-list" :class="{'J-gallery':isView}">
                        <li v-for="(shopSlideItem, index) in shopSlideList" @click="isView ? '' : choosePic(index)" class="minPic" data-size="720x720" :key="shopSlideItem.shopSlideId" :class="{choose:shopSlideItem.selfChoose}">
                            <img width="100%" :src="shopSlideItem.pic+'?x-oss-process=image/resize,m_fixed,h_100,w_100'" alt="" />
                            <span class="cover-txt" v-if="shopSlideItem.status == 2">封面图</span>
                        </li>
                    </ul>
                    <empty v-else :msg="emptyMsg"></empty>
                </template>

                <div v-if="!isView" class="container mt30">
                    <a class="btn btn-block btn-primary btn-lg" href="javascript:;">
                        <input @change="addShopSlide" type="file" name="pic" class="file-pic"> 上传
                    </a>
                </div>
                <div class="fixed-footer picture-manage-meun" :class="{active:shopSlideId != ''}">
                    <div class="text-center f12">
                        <a @click="del" href="javascript:;" class="dib del mr30">
                            <img width="25" height="25" src="../../../assets/images/icons-v3/icons1/icon_del.png" alt="" />
                            <p class="mt5">删除</p>
                        </a>
                        <a v-if="coverStatus !== 3" @click="setCover" href="javascript:;" class="dib setcover">
                            <img width="25" height="25" src="../../../assets/images/icons-v3/icons1/icon_swfm.png" alt="" />
                            <p class="mt5 emb-red">{{ coverStatus === 1 ? '设为' : '取消' }}封面</p>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      coverList: [],
      emptyMsg: {
        mainMsg: "暂无图片~",
        subMsg: "赶紧添加图片吧~"
      },
      shopSlideList: []
    };
  },
  created() {
    this.getShopSlideList();
  },
  methods: {
    getShopSlideList() {
      let shopId = this.query.shopId;

      this.$axios
        .get(this.$api.shopslidelist, { params: { shopId } })
        .then(({ data }) => {
          this.loading = false;
          this.shopSlideList = data;
          for (let item of data) {
            if (item.status == 2) {
              this.coverList.push(item.shopSlideId);
            }
          }
        });
    },
    choosePic(index) {
      let selfChoose = !!this.shopSlideList[index].selfChoose;

      selfChoose = !selfChoose;
      this.$set(this.shopSlideList[index], "selfChoose", selfChoose);
    },
    setCover() {
      let that = this, 
      aShopSlideId = this.shopSlideId.split(",");

      // 无图作任何处理
      if (!aShopSlideId.length) return;

      switch (this.coverStatus) {
        // 设置封面图
        case 1:
          var choosePicsNum = aShopSlideId.length + this.coverList.length;

          // 数量限制
          if (choosePicsNum > 5) {
            this.$notiejs({
              state: 1,
              msg: "封面图片最多只能设置5张",
              end() {}
            });
            return;
          }

        this.$axios
            .post(
                this.$api.setshopslide,
                $.param({ shopSlideId: this.shopSlideId })
            )
              .then(({ data, msg }) => {
                this.$notiejs({
                  state: 1,
                  msg,
                  end() {
                      that.getShopSlideList()
                  }
                });
              });

          break;
        // 默认 取消封面图
        default:
          this.$axios
            .post(
                this.$api.delshopslide,
                $.param({ shopSlideId: this.shopSlideId })
            )
              .then(({ data, msg }) => {
                this.$notiejs({
                  state: 1,
                  msg,
                  end() {
                      that.getShopSlideList()
                  }
                });
              });

          break;
      }
    },
    addShopSlide() {},
    del() {
      this.$axios
        .post(
          this.$api.deleteshopslide,
          $.param({ shopSlideId: this.shopSlideId })
        )
        .then(({ data, msg }) => {
          this.$notiejs({
            state: 1,
            msg,
            end() {
                that.getShopSlideList()
            }
          });
        });
    }
  },
  computed: {
    isView() {
      return this.query.type == "preview";
    },
    query() {
      return this.$route.query;
    },
    shopSlideId() {
      let result = [];

      for (let item of this.shopSlideList) {
        if (item.selfChoose) {
          result.push(item.shopSlideId);
        }
      }

      return result.join(",");
    },
    coverStatus() {
      let _this = this,
        result = -1,
        coverNum = 0,
        shopSlideIdList = this.shopSlideId.split(",").filter(function(item) {
          return item != "";
        }),
        len = shopSlideIdList.length;
      // 判断选择的图片中是否有封面图
      shopSlideIdList.forEach(function(item) {
        if (_this.coverList.indexOf(item) != -1) {
          coverNum++;
        }
      });

      // 无封面图
      if (coverNum === 0) {
        result = 1;
      } else {
        // 全是封面图
        if (len === coverNum) {
          result = 2;
        } else {
          // 有封面图也普通图片
          result = 3;
        }
      }
      console.log(coverNum);
      return result;
    }
  }
};
</script>

<style scopde>
.picture-manage-list {
  padding-top: 10px;
  padding-left: 10px;
}

.picture-manage-list li {
  width: 50%;
  padding-right: 10px;
  margin-bottom: 10px;
}

.picture-manage-list .choose:before {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  /* background: url(assets/images/icons-v3/icons1/icon_radio.png) no-repeat 0 100%; */
  background-color: red;
  background-size: 20px;
  border-radius: 50%;
}

.picture-manage-panel .cover-txt {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}

.picture-manage-meun {
  display: none;
  padding: 5px;
}

.picture-manage-meun.active {
  display: block;
}

.btn {
  position: relative;
  overflow: hidden;
}

.btn .file-pic {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 10;
  opacity: 0;
}
</style>
