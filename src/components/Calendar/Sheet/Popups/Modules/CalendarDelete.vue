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
  data () {
    return {
      id: 0
    }
  },
  methods: {
    async deleteBooking () {
      await this.$app.bookings.deleteOne({ id: this.id })
    },
  },
  props: ['startId'],
  watch: {
    'startId' (v) {
      this.id = v
    }
  }
}
</script>

<style scoped>

</style>
