<template lang="pug">
  q-card
    q-card-section
      span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Доход"}}
      span.row.text-body2.q-py-md.q-pl-sm {{ dateFormatForLabel }}
    chart(
      :options ="options"
    )
    nav-bar(
      :startPeriod="period"
      @periodChange="period = $event"
      @dateChange="date = $event"
      )
    options
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'

const rawData = {
  week: [3200, 4300, 5400, 3200, 1500, 2300, 4200],
  month: [12500, 14300, 15200, 11700],
  year: [129000, 160300, 119000, 165800, 202300, 111500, 106000, 175800, 123400, 132900, 124700, 189000]
}

export default {
  name: 'ProfitCard',
  components: {
    Chart,
    NavBar,
    Options
  },
  created () {
    this.date.from = this.$moment({ hour: 0 }).parseZone()
    this.date.to = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      period: 'year',
      date: {
        from: '',
        to: ''
      }
    }
  },
  computed: {
    dateArray () {
      let arr = []
      switch (this.period) {
        case 'week':
          for (let i = 0; i < 7; i++) {
            const date = this.$moment(this.date.from).add({ days: i })
            const formatDate = this.$moment(date).format('D')
            arr.push(formatDate)
          }
          break
        case 'month':
          for (let i = 0; i < 4; i++) {
            const date = this.$moment(this.date.from).add({ weeks: i })
            const formatDate = this.$moment(date).format('D')
            arr.push(formatDate)
          }
          break
        case 'year':
          for (let i = 0; i < 12; i++) {
            const date = this.$moment(this.date.from).add({ months: i })
            const formatDate = this.$moment(date).format('MMM')
            arr.push(formatDate)
          }
          break
      }
      console.log(arr)
      return arr
    },
    options () {
      const arr = rawData[this.period].map((item, index) => {
        const point = []
        point.push(this.dateArray[index])
        point.push(item)
        return point
      })
      console.log(arr)
      return arr
    },
    dateFormatForLabel () {
      if (this.date.from === '') return '23-29 сентября, 2019'
      return `${this.$moment(this.date.from).format('D MMMM, YYYY')} — ${this.$moment(this.date.to).format('D MMMM, YYYY')}`
    }
  }
}
</script>

<style scoped>

</style>
