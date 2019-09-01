<template lang="pug">
  .row
    .col-6
      q-btn.q-mt-sm(
        @click="cancelBooking"
        color="negative"
        label="Отменить"
        dense
      )
    .col-6
      q-btn.q-mt-sm(
        @click="saveBooking"
        color="positive"
        label="Сохранить"
        dense
      )
</template>

<script>
export default {
  name: 'CalendarDelete',
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
