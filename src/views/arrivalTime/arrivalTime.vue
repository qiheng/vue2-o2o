<template>
    <div class="animsition fullPage arrival-time-wrap">
        <!-- 主体 start -->
        <div class="content scroll-wrap">
            <div id="J-scroll-sideNav" class="pull-left scroll-side">
                <div class="side-inner">
                    <ul class="side-nav">
                        <li @click.prevent="tabNav(index, $event)" v-for="(day, index) in days" :class="{on: currentDayIndex == index}">
                            <a v-if="index === 0" href="javascript:;">今日（{{day[3]}}）</a>
                            <a v-else href="javascript:;">{{day[1]}}月{{day[2]}}日（{{day[3]}}）</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="J-scroll-con" class="pull-right scroll-con">
                <div class="scroll-con-inner">
                    <ul class="arrival-time-list">
                        <li v-for="(time, index) in times" class="J-radio">
                            <i class="pull-right i-radio"
                               :data-index="index"
                               :class="{checked: orderParam.comeTime == (time.join(':'))}"></i>{{ time.join(':') }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 主体 end -->
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {setRadio,utils} from '@/assets/js/common'
    import * as types from '@/store/mutation-types'

    export default {
        data() {
            return {
                currentDayIndex:0,
                currentDay:new Date(),
                st:'00:00',
                et:'23:55',
                days:[],
                times:[],
                sideNav: null,
                scrollCon: null,
                orderParam: {
                    comeTime:''
                }
            }
        },
        created() {
//            var __orderParam = JSON.parse(localStorage.getItem('__orderParam')), nextDays = 5;
            var __orderParam = JSON.parse(localStorage.getItem('__orderParam')), nextDays = 5;
            let query = this.query;
            this.days = this.query;
            // 获取本地提交订单需要的参数缓存
            if (__orderParam) {
                this.orderParam = __orderParam;
            }

            if (query.day && !isNaN(Number(query.day))) {
                nextDays = Number(query.day);
            }
            // 0为当天, 1为后一天,以此类推
            nextDays++;
            this.days = this.getDays(nextDays);
            if (this.days.length) {
                this.getTimesResult(this.currentDayIndex)
            }
        },
        mounted: function () {
            bindEvent(this);
        },
        methods: {
            ...mapMutations([types.UPDATE_ORDER_PARAM]),

            getDays: function getDays(num) {
                var result = {
                        days: []
                    },
                    days = [],
                    week = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'],
                    y, m, d, date = new Date();

                num = num != null ? num : 6;

                for (var i = 0; i < num; i++ ) {

                    date.setDate(date.getDate() + (i ? 1 : 0)); // 获取AddDayCount天后的日期

                    y = '' + date.getFullYear();
                    m = '' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)); // 获取当前月份的日期，不足10补0
                    d = '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()); // 获取当前几号，不足10补0

                    days.push([y, m, d, week[date.getDay()]]);
                }
                return days
            },
            getTimes: function getTimes(stime, etime, step) {
                var times = [],
                    h, m, st, et,
                    time = 0;

                // 默认每个十五分钟获取时间
                step = step || 15;

                if (utils.ios) {

                    if (typeof stime == 'string') {
                        stime = stime.replace(/\-/g, '/')
                    }

                    if (typeof etime == 'string') {
                        etime = etime.replace(/\-/g, '/')
                    }
                }
                st = new Date(stime);
                et = new Date(etime);

                // 无效时间处理
                if (st == 'Invalid Date' || et == 'Invalid Date') {
                    return times.unshift(['尽快到达']) && times;
                }

                do {
                    time = et - st;
                    //console.log(time / (60*1000));
                    // 不够十五分钟的，则不返回
                    if (time <= -15 || time / (60*1000) > -15 &&　time / (60*1000) < 15) {
                        // return times.unshift(['尽快到达']) && times;
                        break;
                    }
                    h = '' + (et.getHours() < 10 ? '0' + et.getHours() : et.getHours()); // 获取当前小时，不足10补0
                    m = '' + (et.getMinutes() < 10 ? '0' + et.getMinutes() : et.getMinutes()); // 获取当前分钟，不足10补0

                    times.unshift([h, m]);

                    et.setMinutes(et.getMinutes() - step); // 获取step分钟后的时间

                } while (true);
                return times.unshift(['尽快到达']) && times;
            },
            getTimesResult: function (index) {
                var _this = this,
                    day = [], stime, etime;

                day = Object.create(this.days[index]);
                day.pop();

                this.currentDay = day.join('-');
                if (this.currentDayIndex == 0) {
                    stime = new Date();
                } else {
                    stime = this.currentDay + ' ' + this.st;
                }

                etime = this.currentDay + ' ' + this.et;

                this.times = this.getTimes(stime, etime);

                this.$nextTick(function () {
                    _this.scrollCon && _this.scrollCon.refresh();

                    // 设为默认地址
                    setRadio(function (status) {
                        var $radio = $(this),
                            index = $radio.data('index'),
                            time;

                        if (status) {
                            time = _this.times[index] || [];
                            _this.orderParam.comeTime =  _this.chooseDay + time.join(':');
                            time =  _this.orderParam.comeTime ;
//                            localStorage.setItem(JSON.stringify('__orderParam'),_this.orderParam)

                            // 更新订单参数
                            _this[types.UPDATE_ORDER_PARAM]({
                                comeTime: time
                            })
                            _this.$router.back()
                        }

                    }, null, true);

                })
            },

            tabNav: function (index, ev) {
                this.currentDayIndex = index;
                this.orderParam.comeTime = '';

                this.getTimesResult(index)
            }
        },
        computed: {
            chooseDay: function () {
                var day = this.days[this.currentDayIndex];

                return day[1] + '月' + day[2] + '日（' + day[3] + '）';
            },
            query(){
                return this.$route.query;
            }
        }
    }

    /**
     * 创建普通滚动
     * @param {Object} el
     * @param {Object} opts
     * @returns {Window.IScroll}
     */
    function creatSroll(el, opts) {
//        return new IScroll(el, $.extend({
//            mouseWheel: true,
//            click: true,
//            //tap: true,
//            //click: false,
//            probeType: 1,
//            disableMouse: false,
//            disablePointer: true
//        }, opts || {}));
    }
    // 注册事件
    function bindEvent (_this) {
        // 导航
        _this.sideNav = creatSroll('#J-scroll-sideNav');
        // 右侧内容
        _this.scrollCon = creatSroll('#J-scroll-con', {'probeType':2});

        $(document).on('touchmove', function (e) { e.preventDefault();});

    }
</script>

<style type="text/css">
    /**
     *
     * Pull down styles
     *
     */
    #pullDown, #pullUp {
        background:#fff;
        height:40px;
        line-height:40px;
        padding:5px 10px;
        font-weight:bold;
        font-size:14px;
        color:#888;
    }
    #pullDown .pullDownIcon, #pullUp .pullUpIcon  {
        display:block; float:left;
        width:30px; height:30px;
        /*background:url(images/pull-icon@2x.png) 0 0 no-repeat;*/
        -webkit-background-size:40px 80px; background-size:30px 60px;
        -webkit-transition-property:-webkit-transform;
        -webkit-transition-duration:250ms;
    }
    #pullDown .pullDownIcon {
        -webkit-transform:rotate(0deg) translateZ(0);
    }
    #pullUp .pullUpIcon  {
        -webkit-transform:rotate(-180deg) translateZ(0);
    }

    #pullDown.flip .pullDownIcon {
        -webkit-transform:rotate(-180deg) translateZ(0);
    }

    #pullUp.flip .pullUpIcon {
        -webkit-transform:rotate(0deg) translateZ(0);
    }

    #pullDown.loading .pullDownIcon, #pullUp.loading .pullUpIcon {
        background-position:0 100%;
        -webkit-transform:rotate(0deg) translateZ(0);
        -webkit-transition-duration:0ms;

        -webkit-animation-name:loading;
        -webkit-animation-duration:2s;
        -webkit-animation-iteration-count:infinite;
        -webkit-animation-timing-function:linear;
    }

    @-webkit-keyframes loading {
        from { -webkit-transform:rotate(0deg) translateZ(0); }
        to { -webkit-transform:rotate(360deg) translateZ(0); }
    }

</style>
