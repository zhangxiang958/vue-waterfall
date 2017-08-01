<script>
    import WaterFall from './vue-waterfall/index.vue';
    import Unit from './vue-waterfall/unit.vue';
    // import item from './item.vue';

    export default {
        mounted() {
            window.onscroll = () => {
                this.getList();
            }
        },
        data() {
            return {
                page: 3,
                perpage: 2,
                items: [
                    {
                        name: 'hah',
                        imgURL: 'http://p2.qhimg.com/t01f3bb4410996dc19d.jpg',
                        imgHeight: '422*563'
                    },
                    {
                        name: 'test2',
                        imgURL: 'http://im5.tongbu.com/tbnews/201604/5ba60557-2.gif?w=500,281&b=559',
                        imgHeight: '500*281'                                                
                    },
                    {
                        name: 'test3',
                        imgURL: 'http://upload.shunwang.com/2013/0906/1378432550743.jpg',
                        imgHeight: '2500*1797'                        
                    },
                    {
                        name: 'test4',
                        imgURL: 'http://bbsdown10.cnmo.com/attachments/201111/02/222208zmss9ysqselye98j.jpg',
                        imgHeight: '1280*720'                        
                    },
                    {
                        name: 'test5',
                        imgURL: 'http://img.sc115.com/uploads/sc/jpgs/0519apic3677_sc115.com.jpg',
                        imgHeight: '650*649'                        
                    },
                    {
                        name: 'test4',
                        imgURL: 'http://bbsdown10.cnmo.com/attachments/201111/02/222208zmss9ysqselye98j.jpg',
                        imgHeight: '1280*720'                        
                    },
                ]
            }
        },
        methods: {
            getList() {
                
                this.items.push({
                    name: 'test3',
                    imgURL: 'http://upload.shunwang.com/2013/0906/1378432550743.jpg',
                    imgHeight: '2500*1797'
                }, {
                    name: 'test4',
                    imgURL: 'http://bbsdown10.cnmo.com/attachments/201111/02/222208zmss9ysqselye98j.jpg',
                    imgHeight: '1280*720'
                });
                this.page ++;
                // console.log(this.items);
            }
        },
        components: {
            WaterFall,Unit
        }
    }
</script>

<template>
    <div class="app">
        <!--堆糖网数据格式 https://www.duitang.com/napi/index/hot/?start=0&include_fields=sender%2Calbum&limit=24&_=1498375527639-->
        <!--WaterFall 所有 props 配置项全部用大写，本组件数据项全部用小写-->
        <!--<WaterFall 
            :DATALIST="items"
        >
            <template scope="waterfallItem">
                {{ waterfallItem.width }}
                {{ waterfallItem.item.name }}
                <img :src="waterfallItem.item.imgURL" alt="" style="width: 100%;" :height="waterfallItem.item.imgHeight">
                {{ waterfallItem.index }}
            </template>
        </WaterFall>-->
        <WaterFall>
            <template scope="scope">
                <Unit v-for="(item,index) in items" :key="index">
                    <div class="imgContainer">
                        <!--<img :src="item.imgURL" alt="" style="width: 100%;" :height="((scope.width - 10) * item.imgHeight.split('*')[1]) / item.imgHeight.split('*')[0]">                        -->
                        <img :src="item.imgURL" alt="" style="width: 100%;">
                    </div>
                    {{ item.name }}
                </Unit>
            </template>
        </WaterFall>
    </div>
</template>

<style scoped>
    .app {
        margin: 0;
    }
    .text {
        width: 100%;
        height: 50px;
    }
    .imgContainer {
        width: 100%;
        overflow: hidden;
    }
</style>