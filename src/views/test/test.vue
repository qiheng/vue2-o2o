<template>
    <div>
        <menus :types="type" @onchange="onchange"></menus>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                type:[
                    {
                        text:'全部订单'
                    },
                    {
                        text:'未发货'
                    },
                    {
                        text:'已发货'
                    },
                    {
                        text:'未评价'
                    },
                ]
            }
        },
        methods:{
            onchange:function (index) {
                console.log(index)
            }
        }
    }

</script>
