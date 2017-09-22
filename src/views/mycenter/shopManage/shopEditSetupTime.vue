<template>
    <div class="shop-hours-panel pb60" v-cloak>
        <div class="lightgray shop-hours">
            <!--<div>-->
                <!--<input @focus="chooseTime" data-t="st" class="time st" type="text" :value="shop.opentime.st" readonly="readonly"/>-->
                <!--<ins>AM</ins>-->
                <!--<span>&nbsp;→&nbsp;</span>-->
                <!--<input @focus="chooseTime" data-t="et" class="time et" type="text" v-model="shop.opentime.et" readonly="readonly"/>-->
                <!--<ins>PM</ins>-->
            <!--</div>-->
            <p>轻触修改时间</p>
        </div>

        <div class="shop-days-list">
            <div @click.capture="switchFn" v-for="(day, key) in weekDay" class="panel-chunk">
                <span>{{ day }}</span>
                <span  :data-day="key" class="btn-switch pay-select-otps"
                       :data-checked="shop.opentime[key]"
                       :class="{checked: shop.opentime[key]}"></span>
            </div>
        </div>

        <div class="container mt30">
            <input @click.prevent="submitFn" type="submit" value="保存" class="btn btn-block btn-lg btn-primary">
        </div>
    </div>
</template>

<script>

</script>

<style>
    .shop-hours-panel .shop-hours {
        margin: 10px;
        padding: 15px 0;
        text-align: center;
        background-color: #fff;
        border-radius: 5px;
    }
    .shop-hours-panel .time {
        font: 700 30px/1.2 Arial,Microsoft Yahei;
        color: #333;
        width: 90px;
        padding: 0;
        text-align: center;
    }
    .shop-days-list .panel-chunk {
        margin: 10px;
        padding: 15px 20px;
        background-color: #fff;
        border: 0;
        border-radius: 5px;
    }
</style>
