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

  
## License

  Released under the MIT License.

---

#### contact：
- 个人Blog [Jarvis](http://zhangxiang958.github.io/)
- 邮箱 958033967@qq.com
