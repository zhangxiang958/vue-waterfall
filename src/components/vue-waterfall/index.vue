<script>
    /**
     * http://cued.xunlei.com/log031
     * todo:
     * 1. 不可能使用 imagesLoaded 然后再使用布局，我的想法是用户的网络加载可能图片加载比较慢，但是不应该妨碍用户观看其他数据，如果数据库不返回宽高，会导致页面性能非常差， 结合自己的业务
     * 可以发现都会返回图片的 dpi，所以一定要提供宽高值，接下来就是需要考虑怎么传这个宽高值比较优雅，如果不需要知道宽高就可以达到瀑布流是最好的。
     * 2. 绝对定位的方式不仅复杂，而且性能比较差
     * 3.列表插入的方式简单，性能好，问题就在于怎么在 vue 中实现
    */
    /**
     * 1. 想做一个响应式的瀑布流，目前都需要定死一个宽度，根据这个宽度计算屏幕可以容纳多少个列
     * 2. 既然发现上面这一点无法避免，那就换个思路，只要我的用户体验好就没问题
     * 发现堆糖网上，移动端单元宽度是 style 动态写的，而 pc 端是定死的 224 px，我猜测他们是手机端都是固定两列，动态计算宽度，然后电脑端（包括 ipad，ipad pro， PC 是 CSS 样式固定的宽度）
     * 然后也发现花瓣网上的也是类似的（花瓣居然不兼容 ipad 尺寸，估计 min-width = 768 了），ipad 上是 236， 堆糖是 224，发现这两个网站都没有用 flexible 布局，和自己的业务需求有点不符合
     * 可以根据屏幕宽度，如果小于等于 768 px，那么就认为是手机，大于的就认为是 PC 端，手机端固定为两列
     * 对于自己的业务来说，因为使用了 flexible 布局，页面宽度一定会是 10 rem 的,这个可以通过 getBoundingClientRect 来获取宽度
     * 3. 自己之前做的那个虽然也是用列表包裹起来， 但是还是需要计算位置， 在想能不能用 css 搞定定位问题, 原本想用 inline-block 加上 text-align:justify 自适应布局的，但是 vue 列表循环的
     *  代码 <span></span><span> 之间没有空格，所以不能使用这个方案
     * 4. 对于 unit 传入的高度我觉得应该是单元格的高度，不然复杂度太高，而且作为一个组件不应该知道里面的内容是什么，而且也没办法知道用户到底想设置那个块的内容高度
    */
    import Util from './vue-waterUtil.js';

    export default {
        props: {
            Gap_Width: {
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
                columnGap: this.Gap_Width,
            }
        },
        watch: {
            unitList: function(val){
                console.log('val length:' + val.length);
                // console.log(oldVal.length);
                console.log('lastlength: ' + this.lastUnitLength);
                let list = val.slice(this.lastUnitLength);
                this.layout(list);
                this.lastUnitLength = val.length;
            }
        },
        mounted() {
            this.unitList = this.$children;
            this.init();
        },
        methods: {
            init() {
                console.log('screen:' + window.screen.width);
                var waterfallContainer = document.querySelector('.waterfall');
                this.containerWidth = waterfallContainer.getBoundingClientRect().width;
                console.log('container width:' + this.containerWidth);
                //使用这个宽度做判断
                //小于 768 的是手机固定两列(单元格动态计算，减去各种间隔后的一半) ，大于 768 的是 ipad ，ipad pro 与 pc 端(固定单元格是 224 px， 然后计算可以容纳多少列)
                console.log(this.getColumnCount(this.containerWidth));
                //初始化有多少列
                this.columnCount = this.getColumnCount(this.containerWidth);
                //初始化列宽
                this.initColumnWidth(this.columnCount);
                //记录每一列的高度
                this.initColumnTop(this.columnCount);
                console.log(this.column);
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
                    this.setContainerBox(this.column.length, this.columnWidth, minHeightList.top);
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
