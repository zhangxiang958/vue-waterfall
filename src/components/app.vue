<script>
    import WaterFall from './waterfall.vue';

    export default {
        data() {
            return {
                items: [{
                    name: 'hah'
                },{
                    name: 'test2'
                },{
                    name: 'test3'
                },{
                    name: 'test4'
                },{
                    name: 'test5'
                }]
            }
        },
        components: {
            WaterFall
        }
    }
</script>

<template>
    <div class="app">
        <!--堆糖网数据格式 https://www.duitang.com/napi/index/hot/?start=0&include_fields=sender%2Calbum&limit=24&_=1498375527639-->
        <WaterFall 
            :dataList="items"
        >
            <div>
                <!--{{ item.name }}-->
            </div>
        </WaterFall>
    </div>
</template>

<style scoped>
    .item {
        margin: 5px;
        width: 200px;
        height: 300px;
        line-height: 300px;
        background: #ccc;
        text-align: center;
    }
</style>