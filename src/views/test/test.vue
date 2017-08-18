<template>
    <div>
        <group>
            <cell title="title" value="xx"></cell>
        </group>
        <!--<x-loading v-model="show"></x-loading>-->
        <o-nav-bar v-model="selected" :type="'primary'" fixed>
            <o-tab-item :id="meun" v-for="meun in meunList">
                {{ meun }}
            </o-tab-item>
        </o-nav-bar>
    </div>
</template>

<script>
    import { Group, Cell } from 'vux'

    export default {
        components: {
            Group,
            Cell
        },
        data () {
            return {
                show: true,
                selected:'news',
                meunList:['my', 'news', 'job', 'cheseina']
            }
        }
    }
</script>
