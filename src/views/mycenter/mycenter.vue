<template>
    <div>
        <!--<transition name="slide-left" mode="out-in">-->
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data () {
            return {

            }
        },
        created () {

            /*if (!this.userInfo) {
                this.$router.push({
                    name: 'login',
                    query: {redirect: this.$route.fullPath}
                })
            }*/

        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        watch: {
            userInfo: {
                handler (newval, oldVal) {
                    var _newval = newval;
//                    console.log(+new Date(),'---oldVal---:', oldVal)
//                    console.log(+new Date(),'---val---: ', _newval)
//                    for (var k in _newval) {
//                        localStorage[k] = _newval[k]
//
//                    }

                    //setTimeout(() => {
                    console.log(+new Date(),'---strval---: ', JSON.stringify(_newval))

                    localStorage.userInfo = JSON.stringify(newval)
                    //}, 0)
                },
                deep: true
            }
        }
    }
</script>


