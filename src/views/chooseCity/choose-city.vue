<template>
    <div class="choose-city-wrap">
        <scroller>
            <div v-if="currentCity" class="panel">
                <p class="panel-chunk">当前城市：{{ currentCity }}</p>
            </div>
            <div class="choose-city-list">
                <dl v-if="!(gpsCity.name.indexOf('失败') != -1)" class="panel">
                    <dt class="panel-chunk">当前定位城市</dt>
                    <dd @click="chooseCity" :data-city="JSON.stringify(gpsCity)" class="panel-chunk">{{ gpsCity.name }}</dd>
                </dl>
                <loading v-show="loading"></loading>
                <dl @click="chooseCity" v-for="(citysItem, key) in citysList" :id="key" class="panel">
                    <dt class="panel-chunk">{{ key }}</dt>
                    <dd v-for="city in citysItem" :data-city="JSON.stringify(city)" class="panel-chunk">{{ city.name }}</dd>
                </dl>
            </div>
        </scroller>

        <!-- 导航 -->
        <ul class="anchor-layer">
            <li @click="moveTo(nav)" v-for="nav in navList"><a href="javascript:;">{{ nav }}</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading: true,
                currentCity: '',
                gpsCity:{
                    name: '定位中...'
                },
                citysList:{},
                navList:[]
            }
        },
        created () {
            var _this = this, key;

            // 获取城市列表

            this.$axios.post(this.$api.getcitys)
                .then(({data, status}) => {

                    this.citysList = data;
                    this.loading = false;

                    // 获取导航锚点
                    for (key in this.citysList) {
                        this.navList.push(key)
                    }

                    this.$nextTick(function () {
                        //bindEvent(this)
                    })
                });

            // gps 定位
            //this.getPlaceInfo()

        },
        mounted () {
            if (this.query.currentCity != null) {
                this.currentCity = this.query.currentCity;
            }
        },
        methods: {
            // 选择地区
            chooseCity (ev) {
                var el = ev.target, city;

                if (el.nodeName.toLowerCase() == 'dd') {
                    city = JSON.parse(el.dataset.city) || {};

                    if (!city.longitude) {
                        console.log('失败的地区数据:', city);
                        alert('请选择地区')
                        return;
                    };
                    console.log('city--',city)
                    this.currentCity = el.innerHTML;
                    //this.myScroll.scrollTo(0,0,400,false)

                    // 返回
                    this.$router.push({
                        name: 'home',
                        query:{
                            areaChose: 1,
                            areaName: city.name,
                            longitude: city.longitude,
                            latitude: city.latitude
                        }
                    })
                }

            },
            // 滚动到指定的地区选择
            moveTo: function (nav) {
                this.myScroll.scrollToElement(document.querySelector('#'+nav), 400, null, null, false)
            },
            // 获取定位经纬度
            getPlaceInfo: function getPlaceInfo() {
                var mapPoint = {},
                    gpsFail = {
                        name: '定位失败'
                    },
                    _this = this;

                // 获取经纬度成功
                function getPositionSuccess(e) {
                    mapPoint.culLongitude = e.coords.longitude; // 经度
                    mapPoint.culLatitude = e.coords.latitude; // 纬度

                    store.set('mapPoint', mapPoint);

                    // 解析地址
                    this.$axios.post(this.$api.getareabylonglat, {longitude: mapPoint.culLongitude, latitude: mapPoint.culLatitude})
                        .then(({data, status}) => {

                        _this.gpsCity = Object.assign(_this.gpsCity, {name: city.area.name}, mapPoint);
                        //_this.gpsCity = $.extend({}, _this.gpsCity, {name: city.area.name}, mapPoint);

                    }, getPositionError)
                }

                // 获取经纬度失败
                function getPositionError(e) {
                    _this.gpsCity = gpsFail;
                }

                // 获取经纬度
                if (navigator.geolocation) { // 支持
                    navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);
                } else { // 不支持
                    _this.gpsCity = gpsFail;
                }

            }
        },
        computed: {
            query () {
                return this.$route.query
            }
        }
    }
</script>

<style lang="less" scoped>
    .panel {
        margin-bottom: -1px;

        dt {
            &.panel-chunk {
                 background-color: #f2f2f2;
                 color: #666
             }
        }
    }

    .anchor-layer {
        position: fixed;
        right: 5px;
        top:50%;
        padding: 20px 0;
        text-align: center;
        -webkit-transform: translate(0,-50%);

        li a {
            display: block;
            padding: 2px 5px 2px 30px;
        }
    }
</style>
