<template lang="pug">
  .editExtras
    .row.justify-center
      .col
        .text-h6 Дополнительная услуга
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
    .row
      span Название
</template>

<script>
export default {
  props: {
    singleStudio: Object,
    rooms: Array,
    dataset: Object
  },
  name: 'editExtras',
  data: () => ({
    isLimit: false
  }),
  filters: {
    imgUrl () {
      return 'http://placeimg.com/640/480/animals'
    }
  }
}
</script>

<style scoped>

</style>
