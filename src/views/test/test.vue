<template>
    <div>
        <h1>插件</h1>
        <button @click="btn">button</button>
        <toast v-model="show">component</toast>
        <loading v-model="show1">
        </loading>
        <!--<component :is="vv" v-model="show" :text="'aaaa'"></component>-->
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Toast } from 'vux'
    import seflloading from '@/components/loading/loading'

    let $vm;

    let ld = {
        install (vue, options = {}) {

            const Load = Vue.extend(seflloading)

            if (!$vm) {
                $vm = new Load({
                    el: document.createElement('div')
                })

                document.body.appendChild($vm.$el);
                /*$vm.$nextTick(() => {

                })*/

            }

        }
    }

    Vue.use(ld)
    console.log(Toast)

    export default{
        data(){
            return{
                show: true,
                show1: true,
                vv: seflloading
            }
        },
        components: {
            Toast,

        },
        created () {
            this.$vux.toast.show({
                text: 'toast',
                time: 1000 * 5,
                onShow () {}
            })


        },
        methods:  {
            btn () {
                //this.$vux.toast.text('5秒，是吗')
                this.$vux.toast.show({
//                    text: 'toast',
//                    time: 1000 * 5,
                    onShow () {}
                })
            }
        },
        mounted () {
            $vm.show = true;
            $vm.text = 'loading...';
        },
        computed: {

        }
    }

</script>
