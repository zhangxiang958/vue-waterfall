<script>
    import Util from './util.js';

    export default {
        props: {
            MIN_COLUMN: {
                type: Number,
                default: 2,
                validator: function(value){
                    return value >= 2;
                }
            },
            GAP_WIDTH: {
                type: Number,
                default: 5,
                validator: function(value){
                    return value >= 0;
                }
            },
            GAP_HEIGHT: {
                type: Number,
                default: 15,
                validator: function(value){
                    return value >= 0;
                }
            },
            COLWIDTH: {
                type: Number,
                default: 180,
                validator: function(value){
                    return value >= 0;
                }
            },
            DATALIST: {
                type: Array,
                default: function(){
                    return []
                }
            },
            ItemComponent: {
                required: true
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
                this.manageCell();
            },
            getColAmount(){
                let body = document.body;
                let bodyWidth = body.offsetWidth;
                console.log(bodyWidth);
                let GapWidth = this.GAP_WIDTH;
                let colWidth = this.COLWIDTH;

                console.log(Math.max(
                    this.MIN_COLUMN, 
                    Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) )
                    )
                );
                return Math.max(
                    this.MIN_COLUMN, 
                    Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) )
                    );
            },
            markColumnTop(colAmount) {
                
                //set a array for every column to mark the top, so we can know which column's height is smallest
                for(var i = 0; i < colAmount; i++) {
                    
                    this.columnTop.push(0);
                }

                //init the comtainer width
                let colContainerWidth = colAmount * (this.COLWIDTH + this.GAP_WIDTH) - this.GAP_WIDTH;
                this.colContainer.style.cssText = `width: ${colContainerWidth}px;`;
            },
            manageCell(){

                var minColHeight = Util.getMinVal(this.columnTop);
                console.log(minColHeight);
                this.adjustCells(this.colContainer.children);
            },
            adjustCells(units){
                var columnTop = this.columnTop

                Array.prototype.slice.call(units).forEach((unit, i) => {

                    let colInfo = Util.getMinVal(columnTop),
                        colMinIndex = colInfo.index,
                        colMinHeight = colInfo.minHeight;
                    
                    let height = unit.offsetHeight,
                        left = colMinIndex * (this.COLWIDTH + this.GAP_WIDTH),
                        top = colMinHeight;

                    unit.style.cssText = `width: ${this.COLWIDTH}px;
                                          left: ${left}px;
                                          top: ${top}px`;

                    columnTop[colMinIndex] = colMinHeight + unit.offsetHeight;
                    console.log(columnTop);
                });

                var maxHeightVal = Util.getMaxVal(columnTop).maxHeight;
                this.colContainer.style.cssText += `height: ${maxHeightVal}px`;
            }
        }
    }
</script>

<template>
    <div id="waterfall">
        <div class="waterfall-unit" v-for="(item, index) in DATALIST" :key="item" :index="index">
            <!--<Component :is="ItemComponent" :item="item" :index="index" />-->
            <slot :item="item" :index="index">
                loading
            </slot>
        </div>
    </div>
</template>

<style scoped>
    #waterfall {
        position: relative;
        margin: 0 auto;
    }
    .waterfall-unit {
        position: absolute;
    }
</style>