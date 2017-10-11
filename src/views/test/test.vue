<template>
    <div>
        <h1>asdfasd</h1>
        {{name}}
    </div>
</template>
<script>
    export default{
        data(){
            return{
                name: 'xxxx',
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
        created: () => {
            console.dir(this === window)
        },
        computed: {
            query () {

                return this.$route.query;
            }
        }
    }

</script>
