<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Загруженность"}}
      nav-bar.q-pb-md(
        @dateChange="selectedDate = $event"
        @studioChange="studio = $event"
      )
      workload-options
</template>

<script>

import NavBar from '../CommonModules/NavBar'
import WorkloadOptions from './Modules/Options'

export default {
  name: 'WorkloadCard',
  components: { WorkloadOptions, NavBar },
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0,
      isMiniTable: true
    }
  },
  computed: {
    bookings () {
      return (this.isMiniTable) ? this.$app.bookings.dashboardList.slice(0, 3) : this.$app.bookings.dashboardList
    }
  },
  methods: {
    async loadData () {
      const filter = {
        studio: this.studio,
      }
      await this.$app.bookings.getForDashBoard({
        ...filter,
        dateFrom: this.selectedDate.format('YYYY-MM-DD'),
        dateTo: this.$moment(this.selectedDate).add(1, 'days').format('YYYY-MM-DD')
      })
    },
    clientSlot (index) {
      const booking = this.bookings[index]
      return `${booking.customer.fullName} • ${booking.duration} ч.`
    },
    prepaymentSlot (index) {
      const booking = this.bookings[index]
      return (booking.amount).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    paymentSlot (index) {
      const booking = this.bookings[index]
      return (booking.price).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
  },
  watch: {
    async selectedDate () {
      await this.loadData()
    },
    studio: {
      async handler () {
        if (this.studio !== 0) {
          await this.loadData()
        }
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
