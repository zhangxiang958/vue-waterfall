# vue-waterfall

> make a simple waterfall component for Vuejs

## Requirements
Because this component must use the feature of vue -- scope slot, so 

  ```
    vue >= 2.1.x
  ```

## Installation

  Download the component(waterfall.vue) and util.js

## Usage

  ```
    import WaterFall from './waterfall.vue';

    <WaterFall 
        :DATALIST="items"
    >
        <template scope="templateName">
            {{ templateName.width }}
            {{ templateName.item.name }}
            <img :src="templateName.item.imgURL" alt="" style="width: 100%;" :height="templateName.item.imgHeight">
            {{ templateName.index }}
        </template>
    </WaterFall>
  ```

## Demo

  see it in https://zhangxiang958.github.io/vue-waterfall/src/index.html
  
## License

  Released under the MIT License.

---
#### what i think in component
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
#### contact：
- 个人Blog [Jarvis](http://zhangxiang958.github.io/)
- 邮箱 958033967@qq.com
