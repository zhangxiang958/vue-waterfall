<script>
    import Util from './Util.js';

    export default {
        props: {
            GapWidth: {
                type: Number,
                default: 5
            },
            Column_Width: {
                type: Number,
                default: 224
            }
        },
        data() {
            return {
                unitList: [],
                lastUnitLength: 0,
                containerWidth: 0,
                column: [],
                columnCount: 0,
                columnWidth: this.Column_Width,
                columnGap: this.GapWidth,
            }
        },
        watch: {
            unitList: function(val){
                // console.log('val length:' + val.length);
                // console.log(oldVal.length);
                // console.log('lastlength: ' + this.lastUnitLength);
                let list = val.slice(this.lastUnitLength);
                this.layout(list);
                this.lastUnitLength = val.length;
            }
        },
        mounted() {
            this.unitList = this.$children;
            this.init();
            window.onresize = () => {
                this.init();
                this.layout(this.unitList);
            }
        },
        methods: {
            init() {
                // console.log('screen:' + window.screen.width);
                var waterfallContainer = document.querySelector('.waterfall');
                this.containerWidth = waterfallContainer.getBoundingClientRect().width;
                // console.log('container width:' + this.containerWidth);
                //使用这个宽度做判断
                //小于 768 的是手机固定两列(单元格动态计算，减去各种间隔后的一半) ，大于 768 的是 ipad ，ipad pro 与 pc 端(固定单元格是 224 px， 然后计算可以容纳多少列)
                // console.log(this.getColumnCount(this.containerWidth));
                //初始化有多少列
                this.columnCount = this.getColumnCount(this.containerWidth);
                //初始化列宽
                this.initColumnWidth(this.columnCount);
                //记录每一列的高度
                this.initColumnTop(this.columnCount);
                // console.log(this.column);
                //设置单元格宽度
                // this.layout(this.unitList);
            },
            getColumnCount(width) {
                // width < 768
                if(Util.isMobile()) {
                    return 2;
                } else {
                    return Math.floor((width + this.columnGap) / (this.columnWidth + this.columnGap));
                }
            },
            initColumnTop(columnCount) {
                let columnWidth = this.columnWidth;
                for(let i = 0; i < columnCount; i++) {
                    this.column[i] = {
                        left: columnWidth * i,
                        top: 0,
                        count: 0
                    };
                }
                this.setContainerBox(this.column.length, this.columnWidth, 0);
            },
            initColumnWidth(columnCount) {
                if(columnCount === 2) {
                    this.columnWidth = (this.containerWidth - this.columnGap) / 2;
                }
                return this.columnWidth;
            },
            layout(unitList) {
                unitList.forEach((item, index) => {
                    // console.log(item.itemHeight);
                    let minHeightList = this.getMinHeightList();
                    this.adjustCell(item.$el, this.columnWidth, minHeightList.left, minHeightList.top);
                    // console.log('clientHeight:' + item.$el.clientHeight);
                    let height = item.$el.clientHeight;
                    //item.itemHeight
                    this.adjustList(minHeightList, height);
                    this.setContainerBox(this.column.length, this.columnWidth, this.getMaxHeightList().top);
                });
            },
            adjustList(list, height) {
                list.top += height;
                list.count ++;
            },
            adjustCell(item, width, left, top) {
                item.style.cssText += `; width: ${width}px; left: ${left}px; top: ${top}px;`;
            },
            getMinHeightList() {
                var list = this.column.slice(0);
                list = list.sort(function(prev, next){
                    return prev.top - next.top;
                });
                return list[0];
            },
            getMaxHeightList() {
                var list = this.column.slice(0);
                list = list.sort(function(prev, next){
                    return next.top - prev.top;
                });
                return list[0];
            },
            setContainerBox(count, width, height) {
                document.querySelector('.waterfall').style.cssText += `; width: ${count * width}px; height: ${height}px;`;
            }
        }
    }
</script>

<template>
    <div class="waterfall">
        <slot :width="columnWidth"></slot>
    </div>
</template>

<style scoped>
    .waterfall {
        position: relative;
        margin: 0 auto;
        width: 100%;
        overflow-x: hidden;
    }
</style>
