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

    <script type="text/babel">
    import axios from 'axios'

    const CancelToken = axios.CancelToken

    export default {
        data() {
        return {
            /**
             * 总页数（由服务端返回）
             * @type {number}
             */
            count: 0,

            /**
             * 是否正在拖拽中
             * @type {boolean}
             */
            dragging: false,

            /**
             * 已加载次数
             * @type {number}
             */
            times: 0,

            /**
             * 已开始记载
             * @type {boolean}
             */
            started: false,

            /**
             * 正在加载中
             * @type {boolean}
             */
            loading: false,

            dom: null,
        }
    },

    props: {
        /**
         * 初始化后自动开始加载数据
         */
        autoload: {
            type: Boolean,
            default: true,
        },

        /**
         * 离组件最近的可滚动父级元素（用于监听事件及获取滚动条位置）
         */
        container: {
            // Selector or Element
        default: () => (global),
        },

        /**
         * Axios请求参数配置对象
         * {@link https://github.com/mzabriskie/axios#request-config}
         */
        options: {
            type: Object,
        default: null,
        },

        /**
         * 起始页码
         */
        page: {
            type: Number,
        default: 1,
        },

        /**
         * 每页加载数据条数
         */
        rows: {
            type: Number,
        default: 10,
        },

        /**
         * 数据加载请求地址
         */
        url: {
            type: String,
        default: '',
        },

        /**
         * 距离底部多远加载
         */
        distance: {
            type: Number,
        default: 200,
        },
    },

//        mounted() {
//            this.dom.addEventListener('scroll', this.scroll, false)
//
//            },
//
//        beforeDestroy() {
//
//            this.dom.removeEventListener('scroll', this.scroll, false)
//
//        },

    computed: {
        /**
         * 是否可以加载
         * @returns {boolean} 是与否
         */
        loadable() {
            return !this.started || (this.page + this.times) <= this.count
        },
    },

    mounted() {
        if (this.container !== global) {
            this.dom = document.querySelector(this.container)
        } else {
            this.dom = this.container
        }
        if (!this.dom) {
            return
        }
        this.dom.addEventListener('scroll', this.scroll, false)
        if (this.autoload && !this.loading) {
            this.load()
        }
    },

    // eslint-disable-next-line
    beforeDestroy() {
        if (this.dom) {
            this.dom.removeEventListener('scroll', this.scroll, false)
        }
    },

    methods: {
        /**
         * 滚动钩子
         */
        scroll() {
            const viewHeight = global.innerHeight
            let parentNode
            if (this.container !== global) {
                parentNode = this.$el
            } else {
                parentNode = this.$el.parentNode
            }
            if (parentNode) {
                const rect = parentNode.getBoundingClientRect()
                if ((rect.bottom <= viewHeight + this.distance) && this.loadable && !this.loading) {
                    this.load()
                }
            }
        },
        /**
         * 加载一组数据的方法
         */
        load() {
            if (this.loading) {
                return
            }
            this.started = true
            this.loading = true

            const params = {
                currentPage: this.page + this.times,
                pageSize: this.rows,
            }
            const options = Object.assign({}, this.options, {
                url: this.url,
                cancelToken: new CancelToken((cancel) => {
                    this.cancel = cancel
                }),
            })

            if (String(options.method).toUpperCase() === 'POST') {
                options.data = Object.assign({}, options.data, params)
            } else {
                options.params = Object.assign({}, options.params, params)
            }

            this.$axios.request(options).then((res) => {
                const data = res.result
                this.times += 1
                this.loading = false
                this.count = data.pageCount
                this.$emit('success', data.list)
                this.$emit('complete')
            }).catch((e) => {
                this.loading = false
                this.$emit('error', e)
                this.$emit('complete')
            })
        },

        /**
         * 重置加载相关变量
         */
        reset() {
            this.count = 0
            this.times = 0
            this.started = false
            this.loading = false
        },

        /**
         *重新开始加载
         */
        restart() {
            this.reset()
            this.load()
        },
    },
    }
</script>


<style>

</style>
