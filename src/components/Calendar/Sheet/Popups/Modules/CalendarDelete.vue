<template lang="pug">
  .row.q-py-none.justify-center
    q-btn.q-mt-sm(
      @click="deleteBooking"
      color="#FFFFFF"
      text-color="red"
      no-caps
      label="Удалить"
      full-width
    )
</template>

<script>
export default {
  name: 'CalendarDelete',
  methods: {
    async deleteBooking () {
      console.log(this.id)
      await this.$app.bookings.deleteOne(+this.id)
      this.$app.dialogs.calendarUpdate = false
      this.$emit('changeBookingsList')
    },
  },
  props: ['id']
}
</script>

<style scoped>

</style>
