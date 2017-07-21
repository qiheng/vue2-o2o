/**
 * Created by qiheng on 2017/4/28.
 */

const Notiejs = {};
Notiejs.install = (Vue, options = {}) => {
    // 弹层默认参数
    let _default = {
        msg: '提示内容',
        time: 1000 * 3,
        state: 3, // 通知的状态[1-成功, 2-警告/错误, 3-普通]
        align: 'top',
        end () {}
        //skin: ''
    },
    doc = document,
    //toString = Object.prototype.toString,
    statusArr = ['alert-success', 'alert-danger', 'alert-info'];

    // 弹层构造函数
    const NotiejsConstructor = Vue.extend(require('./notiejs.vue'));

    // 弹层实例存储队列
    let notiejsPool = [];

    // 获取一个弹层实例
    let getAnInstance = () => {
        if (notiejsPool.length > 0) {
            let instance = notiejsPool[0];
            notiejsPool.splice(0, 1);
            return instance;
        }
        return new NotiejsConstructor({
            el: document.createElement('div')
        });
    };
    // 存储一个弹层实例
    let returnAnInstance = instance => {
        if (instance) {
            notiejsPool.push(instance);
        }
    };
    // 移除元素节点
    let removeDom = event => {
        if (event.target.parentNode) {
            event.target.parentNode.removeChild(event.target);
        }
    };
    // 关闭层
    NotiejsConstructor.prototype.close = function() {
        this.visible = false;
        this.$el.addEventListener('transitionend', removeDom);
        this.closed = true;
        returnAnInstance(this);
    };

    /**
     * 对外调用弹层方法
     * 参数 { Object }
     * - msg 提示信息
     * - time 关闭时间 默认 3秒
     * - state 弹层状态 默认 普通(3)
     */
    Vue.prototype.$notiejs = (params) => {
        /*let opts = {};

        switch (arguments.length) {
            case 3:
                opts.state = arguments[0];
                opts.msg = arguments[1];
                opts.end = arguments[2];
                break;
            case 2:
                if (arguments[0]) {

                }
                opts.state = arguments[0];
                opts.msg = arguments[1];
                opts.end = arguments[2];
                break;
            case 3:
                opts.state = arguments[0];
                opts.msg = arguments[1];
                opts.end = arguments[2];
                break;
        }*/


        if (typeof params === 'string') {
            // opts = Object.assign(_default, options, params);
            params = {
                msg: params
            }
        }

        let opts = Object.assign(_default, options, params);
        //let duration = opts.time;
        // 1、获取弹层实例
        let instance = getAnInstance();
        clearTimeout(instance.timer);
        // 实例数据初始化
        instance.closed = false;
        instance.msg = opts.msg;
        instance.stateClass = statusArr[(opts.state - 1)];
        instance.alignclass = 'fixed-' + opts.align;

        // 2、创建实例div class地方
        document.body.appendChild(instance.$el);

        // 3、延迟n秒后移除该提示
        Vue.nextTick(function () {
            instance.visible = true;
            instance.$el.removeEventListener('transitionend', removeDom);
            ~opts.time && (instance.timer = setTimeout(function () {
                if (instance.closed) return;
                instance.close();
                opts.end();
            }, opts.time));
        });

        return instance;
    }

    // 提示层在页眉、页脚显示 (this.$notiejs.top(params))
    ['top', 'bottom'].forEach((type) => {
        Vue.prototype.$notiejs[type] = (params) => {
            params.align = type;
            Vue.prototype.$notiejs(params)
        }
    })

}
// 对外接口
export default Notiejs
