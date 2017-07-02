<script>
export default {
    props: {
      item: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    data() {
      return {
      }
    }
}
</script>

<template>
  <div>
    <div>
      <img :src="item.imgURL" />
    </div>
    {{ item.name }}
    {{ index }}
  </div>
</template>

<style>
  img {
    width: 100%;
  }
</style>


