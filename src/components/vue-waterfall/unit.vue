<script>
    export default {
        props: {
            itemHeight: {
                type: Number,
                required: true
            }
        }
    }
</script>

<template>
    <div class="waterfall-unit" :style="{ padding: `${this.$parent.columnGap}px` }">
        <slot>
            loading.....
        </slot>
    </div>
</template>

<style scoped>
    .waterfall-unit {
        position: absolute;
        box-sizing: border-box;
    }
</style>
