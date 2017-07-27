<template>
    <!-- 便民号码 start -->
    <div class="chests-links" v-cloak>
        <div class="general-search ptb15">
            <form action="/bianmin/phonebykeyword" method="post">
                <input type="text" class="search-txt" name="name" placeholder="搜索" />
                <input type="submit" class="btn search-btn" value="" />
            </form>
        </div>
        <nav class="container ptb15">
            <ul class="list-fl">
                <li class="list-item">
                    <a class="" href="/bianmin/phonebycategory?phoneCategoryId=6a5d8a1a24e94ce59f43efd683ed5f2f">
                        <!--2017-03-03 王钢尧 万县云商电话列表图标后台设置了图标，但前端是写死的bug修改-->
                        <img width="50" height="50" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201703/21/14900344416756704.png" alt="" />
                        <h4>银行</h4>
                    </a>
                </li>
                <li class="list-item">
                    <a class="" href="/bianmin/phonebycategory?phoneCategoryId=b8b4d5a70b814480825b8882717d7ebd">
                        <!--2017-03-03 王钢尧 万县云商电话列表图标后台设置了图标，但前端是写死的bug修改-->
                        <img width="50" height="50" src="http://rhytcsht.img-cn-shenzhen.aliyuncs.com/upload/201703/21/14900346071809235.png" alt="" />
                        <h4>快递</h4>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    
    <!-- 便民号码 end -->
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style>
.chests-links a:before {
    content: normal
}

.chests-links a>img {
    display: block;
    margin: 0 auto 5px;
    background-size: 50px;
    border-radius: 50%;
}
</style>