<script>
    import WaterFall from './waterfall.vue';
    import item from './item.vue';

    export default {
        data() {
            return {
                items: [
                    {
                        name: 'hah',
                        imgURL: 'http://p2.qhimg.com/t01f3bb4410996dc19d.jpg'
                    },
                    {
                        name: 'test2',
                        imgURL: 'http://im5.tongbu.com/tbnews/201604/5ba60557-2.gif?w=500,281&b=559'                        
                    },
                    {
                        name: 'test3',
                        imgURL: 'http://upload.shunwang.com/2013/0906/1378432550743.jpg'                        
                    },
                    {
                        name: 'test4',
                        imgURL: 'http://bbsdown10.cnmo.com/attachments/201111/02/222208zmss9ysqselye98j.jpg'                        
                    },
                    {
                        name: 'test5',
                        imgURL: 'http://img.sc115.com/uploads/sc/jpgs/0519apic3677_sc115.com.jpg'                        
                    }
                ]
            }
        },
        components: {
            WaterFall, item
        }
    }
</script>

<template>
    <div class="app">
        <!--堆糖网数据格式 https://www.duitang.com/napi/index/hot/?start=0&include_fields=sender%2Calbum&limit=24&_=1498375527639-->
        <WaterFall 
            :dataList="items"
            :item-component="$options.components.item"
        />
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