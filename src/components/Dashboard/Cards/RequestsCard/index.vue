<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm Заявки
      nav-bar.q-pb-md(
        @dateChange="selectedDate = $event"
        @studioChange="studio = $event"
      )
      q-card-section.q-pb-none
        q-markup-table(
          separator="none"
          style="max-width: 400px"
          dense
          flat
        )
          thead.text-left
            tr
              th(style="width: 80%")
                span.text-bold.text-black.text-body2 Клиент • Зал
              th
              th
                span.text-bold.text-black.text-body2 Дата
          tbody
            tr(
              v-for="(booking, index) in bookings"
              :key="index"
            )
              td {{ clientSlot(index) }}
              td
                q-icon(
                  size="7px"
                  color="red"
                  name="fas fa-circle"
                )
              td
                span.text-black.text-body2 {{ dateSlot(index) }}
      q-card-section(
        v-if="isMiniTable"
        class="cursor-pointer"
        @click="isMiniTable = false"
      )
        span.row.text-body2.text-blue-5.q-pt-md.q-pl-sm  Ещё {{ $app.bookings.dashboardList.length - 3 }}
      q-card-section(
        v-else
        class="cursor-pointer"
        @click="isMiniTable = true"
      )
        span.row.text-body2.text-blue-5.q-pt-md.q-pl-sm  Свернуть

</template>

<script>

import NavBar from '../CommonModules/NavBar'

export default {
  name: 'RequestsCard',
  components: { NavBar },
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
        dateTo: this.selectedDate.format('YYYY-MM-DD')
      })
    },
    clientSlot (index) {
      const booking = this.bookings[index]
      return `${booking.customer.fullName} • ${booking.room.name}`
    },
    dateSlot (index) {
      const booking = this.bookings[index]
      return `${this.$moment(booking.reservedFrom).format('DD MMMM')}`
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
