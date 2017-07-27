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
    <div class="waterfall-unit cellready">
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
