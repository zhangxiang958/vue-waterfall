<script>
    import WaterFall from './waterfall.vue';

    export default {
        data() {
            return {
                items: [1,2,3,4,5]
            }
        },
        components: {
            WaterFall
        }
    }
</script>

<template>
    <div class="app">
        <WaterFall>
            <div v-for="item in items" class="item" v-if="items">
                {{ item }}
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