<template>
    <div id="app">
        <!--<img src="./assets/images/logo.png">-->
        <transition name="slide-left" mode="out-in">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>

    @import "./assets/css/public.css";
    @import "./assets/css/login_reg.css";
    @import "./assets/css/home.css";

    html, body, #app {
        width:100%;
        height: 100%;
        overflow-x: hidden;
    }
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }

    .child-view {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    .viewbox-container, .viewbox {
        height: 100%;
        overflow:hidden;
    }

    .viewbox {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

</style>
