<script>
    export default {
        props: {
            MINColumn: {
                type: Number,
                default: 2,
                validator: function(value){
                    return value >= 2;
                }
            },
            GapWidth: {
                type: Number,
                default: 5,
                validator: function(value){
                    return value >= 0;
                }
            },
            colWidth: {
                type: Number,
                default: 100,
                validator: function(value){
                    return value >= 0;
                }
            },
            dataList: {
                type: Array,
                default: function(){
                    return []
                }
            }
        },
        data() {
            return {
                columnTop: [],
                colContainer: null
            }
        },
        created() {
            console.log('water created');         
        },
        mounted() {
            console.log('water mounted');
            this.init();
        },
        methods: {
            init() {
                this.colContainer = document.querySelector('#waterfall');
                var colAmount = this.getColAmount();
                this.markColumnTop(colAmount);
            },
            getColAmount(){
                let body = document.body;
                let bodyWidth = body.offsetWidth;
                let GapWidth = this.GapWidth;
                let colWidth = this.colWidth;

                console.log(Math.max(
                    this.MINColumn, 
                    Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) )
                    )
                );
                return Math.max(
                    this.MINColumn, 
                    Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) )
                    );
            },
            markColumnTop(colAmount) {
                
                //set a array for every column to mark the top, so we can know which column's height is smallest
                for(var i = 0; i < colAmount; i++) {
                    
                    this.columnTop.push(0);
                }

                //init the comtainer width
                let colContainerWidth = colAmount * (this.colWidth + this.GapWidth) - this.GapWidth;
                this.colContainer.style.cssText = `width: ${colContainerWidth}px`;
            }
        }
    }
</script>

<template>
    <div id="waterfall">
        <div class="waterfal-unit" v-for="(item, index) in dataList" :key="index" :index="index">
            <slot name="solt-item-{{$index}}" :slot="item">
                {{ item }}
                <div class="loading">
                    loading...
                </div>
            </slot>
        </div>
    </div>
</template>

<style scoped>
    #waterfall {
        position: relative;
    }
</style>