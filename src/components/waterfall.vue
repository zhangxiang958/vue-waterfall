<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            console.log('water created');         
        },
        mounted() {
            console.log('water mounted');
        }

    }
</script>

<template>
    <div id="waterfall">
        <slot>
            <div class="loading">
                loading...
            </div>
        </slot>
    </div>
</template>

<style scoped>
    #waterfall {

    }

    #waterfall .loading {
        
    }
</style>