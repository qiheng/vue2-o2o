<template>
  <div>
      <!-- 轮播图 start -->
        <swiper ref="slideAd" v-if="slideList && slideList.length" :not-next-tick="notNextTick" :options="swiperAdOption" class="slideAd">
            <swiper-slide v-for="slide in slideList" :key="slide.id">
                <router-link :to="{name:'chooseShopClass',query:{shopTypeId:slide.id}}">
                  <img width="100%" :src="slide.src+'?x-oss-process=image/resize,m_fixed,h_720,w_320'" alt="">
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 轮播图 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      notNextTick: true,
      swiperAdOption: {
        autoplay: false,
        observeParents: true,
        grabCursor: true,
        pagination: ".slideAd .swiper-pagination",
        autoplayDisableOnInteraction: false,
        onInit: function(swiper) {}
      },
      slideList: [
        {
          id: "feb280f1210c4fefbfd86e33d30eda0a",
          title: "到店消费",
          src: require("../../../assets/images/type-1.jpg")
        },
        {
          id: "29FCFAF9EDD4375DE050AA0A1B2B54AF",
          title: "上门服务",
          src: require("../../../assets/images/type-2.jpg")
        },
        {
          id: "4ede38cc7c69451790d7fe69e224d000",
          title: "商品外卖",
          src: require("../../../assets/images/type-3.jpg")
        },
        {
          id: "29FCFAF9EDD2375DE050AA0A1B2B54AF",
          title: "传统电商",
          src: require("../../../assets/images/type-4.jpg")
        }
      ]
    };
  },
  created() {
    //设置父容器的宽度
    let parent = window.outerWidth,
      parentWidth = parent * this.slideList.length + "px";
    this.$nextTick(function() {
      console.log(
        (this.$refs.slideAd.$el.children[0].style.width = parentWidth)
      );
    });
  }
};
</script>

<style scoped>
.slideAd {
  height: 100vh;
  padding-bottom: 0;
}
.swiper-slide {
  float: left;
}
</style>