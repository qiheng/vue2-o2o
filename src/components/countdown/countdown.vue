<template>
    <span class="time">
        <ins v-if="format != 1" class="D">{{ time.day }}</ins>:<ins class="H">{{ time.hours }}</ins>:<ins class="M">{{ time.minutes }}</ins>:<ins class="S">{{ time.seconds }}</ins>
    </span>
</template>

<script>
    export default {
        props:{
            times: {
                type: [Number,String],
                required: true,
                default: 0
            },
            format: {
                type:[Number,String],
                default:1
            }
        },
        data () {
            return {
                timeId: null,
                dtimes: 0,
                countTime:0,
                time: {
                    day:0,
                    hours:0,
                    minutes:0,
                    seconds:0
                }
            }
        },
        created () {
            this.dtimes = this.times;

            this.countDown()
        },
        methods: {
            fillZero (num, digit) {
                digit = digit != null || 2;

                num = num ? '' + num : '';

                while (num.length < digit) {
                    num = '0' + num;
                }

                return num;
            },
            countDown () {
                let _this = this, etime = 0, domTime = '';

                if (this.dtimes <= 0) {
                    clearTimeout(this.timeId);
                    this.endTime();
                    return;
                }

                this.countTime++;

                this.dtimes = this.dtimes - 1;


                var	day = parseInt(this.dtimes / 86400),
                    hours = parseInt(this.dtimes % 86400 / 3600),
                    //_hours = parseInt(_totalTime / 3600),
                    minutes = parseInt(this.dtimes % 86400 % 3600 / 60),
                    seconds = parseInt(this.dtimes % 86400 % 3600 % 60);

                this.time = Object.assign(this.time, {
                    day,
                    hours,
                    minutes,
                    seconds
                });

                switch (Number(this.format)) {
                    //'hh:ii:mm'
                    case 1:
                        this.time.hours += day * 24;
                        break;
                    default :
                        // todo
                        break;
                }

                for (let key in this.time) {
                    //console.log(this.time[key])
                    this.time[key] = this.fillZero(this.time[key])
                }

                this.timeId = setTimeout(this.countDown, 1000, this);

            },
            endTime () {
                this.$emit('end-time');
            }
        }

    }
</script>

<style>

</style>