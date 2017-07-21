/**
* Created by qiheng on 2017/4/26.
*/

/**
* Created by Administrator on 2017/3/10.
*/

// export default (Vue) => {

//import Vue from 'vue'

// 过滤器
exports.timeFormat = (time, format) => {
    // 返回处理后的值

    var date = {};

    try {
        date = new Date( Number( time ) );
    } catch(e) {}

    var fillZero = function (num) {
        return num < 10 ? '0' + num : num;

    };

    if (format=== 'yyyy-MM-dd hh:mm') {
        return date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate()) + ' ' + fillZero(date.getHours()) + ':' + fillZero(date.getMinutes());
    } else {
        return date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate());
    }
}
//方法二:使用正则替换所有中文字符,然后再计算
//Vue.filter('getByteLen', function (str) {
//    // 返回处理后的值
//
//    if (str == null) return 0;
//    if (typeof str != 'string'){
//        str += '';
//    }
//
//    // 采取将255意外的字符替换成"aa"的做法，取长度
//    return str.replace(/[^\x00-\xff]/g, 'ab').length;
//
//});

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
exports.cutstr = (str, len) => {
    let str_length = 0,
        str_cut = '',
        tmp_str = '',
        str_len = 0;

    if (str == null) {
        return ''
    }

    if (len == null) {
        return str;
    }

    if (typeof str != 'string'){
        str += '';
    }

    str_len = str.length;

    for (let i = 0; i < str_len; i++) {

        tmp_str = str.charAt(i);
        str_length++;

        if (escape(tmp_str).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }

        str_cut = str_cut.concat(tmp_str);

        if (str_length >= len) {

            str_cut = str_cut.concat('...');
            return str_cut

        }

    }

    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}


/**
 * 格式化数字 12 -> 12.00
 * @param {Number} num
 * @param {Number} count 默认 2
 * @returns {string}
 */
exports.toFixed = (num, count) => {
    num = Number(num);

    if (isNaN(num)) {
        return ''
    }

    if (count == undefined) {
        count = 2;
    }

    return (num).toFixed(count);
}


// 加载效果
// var Loading = {
//     template:'<div id="conLoading" class="text-center ptb10"><img src="images/loading-1.gif" alt="" /></div>'
// };
// Vue.component('loading', Loading);
//
//
// // 列表选择弹层
// var ModelLayer1 = {
//     props:{
//         layerData: {
//             //required:true,
//             type:Object
//         }
//         //,isLayerShow: {
//         //    required:true,
//         //    type:Boolean,
//         //    default: true
//         //}
//     },
//     data: function () {
//         return {
//             currentIndex:-1,
//             type:''
//         }
//     },
//     updated: function () {
//         if (this.type != this.layerData.type) {
//             this.currentIndex = -1;
//         }
//     },
//     template: '<div @click="closeFn" class="mod-layer-1 classify-choose-layer" :class="{show: layerData.visible}">\
//                     <div class="mod-layer-con">\
//                         <div class="mod-layer-hd">\
//                             <h2 class="mod-layer-tit">{{ layerData.title }}</h2>\
//                         </div>\
//                         <div class="mod-layer-bd">\
//                             <ul class="panel classify-choose-list">\
//                                 <li @click.stop="selectFn(index)" v-for="(item, index) in layerData.list"\
//                                 :key="item.name"\
//                                  class="panel-chunk" :class="{on: currentIndex === index}">{{ item.name }}</li>\
//                             </ul>\
//                         </div>\
//                     </div>\
//                 </div>',
//     methods: {
//         selectFn: function (index) {
//             var item = this.layerData.list[index];
//
//             this.currentIndex = index;
//             this.$emit('onselect', this.layerData.type, item);
//             this.type = this.layerData.type;
//
//         },
//         closeFn: function () {
//             this.$emit('onclose')
//         }
//     }
// };
//
// Vue.component('mod-layer', ModelLayer1);



// }