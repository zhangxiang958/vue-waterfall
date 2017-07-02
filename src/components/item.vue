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
    {{ item.name }}
    {{ index }}
  </div>
</template>

<style>

</style>


