<template>
    <div class="loadmore" ref="loadmore">
        <div class="loadmore__body">
            <slot></slot>
        </div>
        <div class="loadmore__footer">
      <span v-if="loading">
        <i class="tc-loading"></i>
        <span>正在加载</span>
      </span>
            <span v-else-if="loadable">加载更多</span>
            <span v-else>没有更多了</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                type:false
            }
        }
    }
</script>
<!--<template>-->
    <!--<div>-->
        <!--<br/>-->
        <!--<br/>-->
        <!--<switch-tpl v-model="value" >-->

        <!--</switch-tpl>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data(){-->
            <!--return{-->
                <!--value: true-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--changeFn: function () {-->
                <!--//this.$emit('change', this.currentValue)-->
                <!--this.value =  !this.value-->
            <!--}-->
        <!--},-->
        <!--computed: {-->
<!--//            currentValue: {-->
<!--//                get: function () {-->
<!--//                    return this.value-->
<!--//                },-->
<!--//                set: function (val) {-->
<!--//                    this.$emit('input', val)-->
<!--//                }-->
<!--//            }-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<template>-->
    <!--<div>-->
        <!--<model-layer3-->
        <!--:tt=tt-->
        <!--:layerData=layerData-->
        <!--:province=province-->
        <!--:city=city-->
        <!--:area=area-->
        <!--@onselect = "selectLayerFn"-->
        <!--@onclose = "closeLayerFn"-->
        <!-->
        <!--</model-layer3>-->
    <!--<input type="text" @click="selectFn"/>-->
    <!--<input type="hidden" name="province" v-model="province.areaId"/>-->
    <!--<input type="hidden" name="city" v-model="city.areaId"/>-->
    <!--<input type="hidden" name="area" v-model="area.areaId" />-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--data(){-->
        <!--return {-->
            <!--tt:10,-->
            <!--layerData: {-->
                <!--//required:true,-->
                <!--type: Object,-->
                <!--default: {-->
                    <!--visible: false-->
                <!--}-->
            <!--},-->
            <!--province: {-->
                <!--type: Object,-->
                <!--default: function () {-->
                    <!--return {-->
                        <!--name: '选择省'-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--city: {-->
                <!--type: Object,-->
                <!--default: function () {-->
                    <!--return {-->
                        <!--name: '选择市'-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--area: {-->
                <!--type: Object,-->
                <!--default: function () {-->
                    <!--return {-->
                        <!--name: '选择区/县'-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--layerData: {-->
                <!--visible: false,-->
                <!--title:'选择地址'-->
            <!--},-->

        <!--}-->
    <!--},-->
    <!--methods:{-->
        <!--// 地址选择处理-->
        <!--selectFn: function (index) {-->
            <!--this.layerData.visible = !this.layerData.visible;-->
        <!--},-->
        <!--selectLayerFn: function (address) {-->
            <!--var _this = this;-->

            <!--['province', 'city', 'area'].forEach(function (key, index) {-->
                <!--_this[key] = address[index];-->
            <!--})-->

            <!--console.log('area:',address);-->
        <!--},-->
        <!--closeLayerFn: function () {-->
            <!--this.layerData.visible = false;-->
        <!--}-->

    <!--}-->
<!--}-->
<!--</script>-->




    <!--<template>-->
    <!--<div>-->
    <!--<model-layer1 :layerData="layerData">-->

    <!--</model-layer1>-->
    <!--</div>-->
    <!--</template>-->

    <!--<script>-->

    <!--export default {-->
    <!--data () {-->
    <!--return {-->
    <!--layerData: {-->
    <!--visible: true,-->
    <!--title:'2121221121212',-->
    <!--list: [-->
    <!--{name:'item1'},-->
    <!--{name:'item2'},-->
    <!--{name:'item3'},-->
    <!--{name:'item4'},-->
    <!--]-->
    <!--}-->

    <!--}-->
    <!--}-->
    <!--}-->
    <!--</script>-->







