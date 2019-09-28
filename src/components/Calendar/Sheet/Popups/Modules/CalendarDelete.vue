<template lang="pug">
  .row.q-py-none.justify-center
    q-btn.q-mt-sm(
      @click="deleteBooking"
      color="#FFFFFF"
      text-color="red"
      no-caps
      label="Удалить"
      full-width
    ) {{ idComp }}
</template>

<script>
export default {
  name: 'CalendarDelete',
  data () {
    return {
      id: 0
    }
  },
  computed: {
    idComp () {
      return this.idChange()
    },
  },
  methods: {
    async deleteBooking () {
      await this.$app.bookings.deleteOne({ id: this.id })
    },
    idChange () {
      this.$emit('idChange', this.id)
    }
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
