<template lang="pug">
  standart-card
    name-slot(name="Доля в бронированиях")
    q-card-section
      span.row.text-body2 {{ dateFormatForLabel }}
    chart(
      :options ="options"
    )
    nav-bar(
      :startPeriod="period"
      @studioChange="studio = $event"
      @periodChange="period = $event"
      @dateChange="date = $event"
    )
    options(
      :options ="options"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'PartsCard',
  data () {
    return {
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 326,
      period: 'month',
      date: {
        from: this.$moment().subtract(1, 'month'),
        to: this.$moment()
      }
    }
  },
  components: {
    StandartCard,
    NameSlot,
    Chart,
    NavBar,
    Options
  },
  computed: {
    options () {
      if (!this.$app.bookings.dashboardBookingsShareList) return
      const listForStudio = this.$app.bookings.dashboardBookingsShareList.find(item =>
        item.id === this.studio)
      if (!listForStudio || !listForStudio.rooms) return
      return listForStudio.rooms.map((item, index) => {
        const point = {
          name: item.name,
          total: item.totalProfit,
          percents: (item.totalProfit / listForStudio.totalProfit * 100).toFixed(2),
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16)
        }
        return point
      })
    },
    dateFormatForLabel () {
      if (this.date.from === '') return '23-29 сентября, 2019'
      return `${this.$moment(this.date.from).format('D MMMM, YYYY')} — ${this.$moment(this.date.to).format('D MMMM, YYYY')}`
    }
  },
  methods: {
    async loadData () {
      await this.$app.bookings.dashboardBookingsShare({
        dateFrom: this.$moment(this.date.from).format('YYYY-MM-DD'),
        dateTo: this.$moment(this.date.to).format('YYYY-MM-DD'),
      })
    },
  },
  watch: {
    date: {
      async handler () {
        await this.loadData()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
