<template>
    <div class="example-wrapper" id="example2">
        <loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
            <ul class="example-list">
                <li v-for="item in list" class="example-listitem">{{ item }}</li>
            </ul>
            <!--<div slot="top" class="mint-loadmore-top">-->
                <!--<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>-->
                <!--<span v-show="topStatus === 'loading'">Loading...</span>-->
            <!--</div>-->
        </loadmore>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        list: [],
        topStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0
      };
    },

    methods: {
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 10; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      }
    },

    created() {
      for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }
    }
  };
</script>

<style media="screen">
    * {
        padding: 0;
        margin: 0;
        -webkit-user-select: none;
        -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    }
    html, body {
        height: 100%;
        -webkit-overflow-scrolling: touch;
    }
    .example-title {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        background-color: #dddddd;
    }
    .example-list {
        padding: 4px 4px 0;
        list-style: none;
    }
    .example-listitem {
        height: 50px;
        line-height: 50px;
        border: solid 1px #999;
        border-radius: 2px;
        margin-bottom: 4px;
        text-align: center;
    }
    .example-listitem:last-child {
        margin-bottom: 0;
    }
    .example-wrapper {
        height: 300px;
        overflow: scroll;
    }
    .mint-loadmore-top span {
        display: inline-block;
        transition: .2s linear;
    }
    .rotate {
        transform: rotate(180deg);
    }
</style>




