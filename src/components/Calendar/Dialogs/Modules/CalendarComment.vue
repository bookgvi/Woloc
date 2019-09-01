<template lang="pug">
  .q-py-md
    .col-12.row.justify-left.items-center
      q-input.col-12(
        v-model="customerComment"
        readonly
        filled
        type="textarea"
      )
    .col-12.row.justify-left.items-center
      .text Админ
    .col-12.row.justify-left.items-center
      q-input.col-12(
        v-model="managerComment"
        filled
        type="textarea"
      )
</template>

<script>
export default {
  name: 'CalendarComment',
  data () {
    return {
      customerComment: '',
      managerComment: ''
    }
  }
}
</script>

<style scoped>

</style>
