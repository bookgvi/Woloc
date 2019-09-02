<template lang="pug">
  .row.q-py-none.col-12.justify-center
      q-btn.q-px-lg(
        @click="cancelBooking"
        color="negative"
        label="Отменить"
        dense
      )
      q-btn.q-px-lg(
        @click="saveBooking"
        color="positive"
        label="Сохранить"
        dense
      )
</template>

<script>
export default {
  name: 'CalendarApply',
  methods: {
    cancelBooking () {
      //
    },
    saveBooking () {
      //
    }
  }
}
</script>

<style scoped>

</style>
