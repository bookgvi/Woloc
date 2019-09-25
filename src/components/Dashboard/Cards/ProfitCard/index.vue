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
    options(
      @checkedChange="checked = $event"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'

const rawData = [
  {
    week: [3200, 4300, 5400, 3200, 1500, 2300, 4200],
    month: [12500, 14300, 15200, 11700],
    year: [129000, 160300, 119000, 165800, 202300, 111500, 106000, 175800, 123400, 132900, 124700, 189000]
  },
  {
    week: [2680, 410, 5400, 3100, 1100, 1300, 3200],
    month: [11500, 10300, 13200, 10700],
    year: [99000, 140300, 134000, 142500, 153300, 95500, 100000, 135800, 113400, 121700, 122700, 111000]
  },
  {
    week: [6400, 3200, 5400, 6700, 4200, 900, 2100],
    month: [22500, 17300, 11500, 8700],
    year: [127000, 140300, 153000, 178500, 121600, 156500, 188000, 177600, 126600, 115400, 124700, 142000]
  },
  {
    week: [6400, 2100, 5400, 3200, 2300, 400, 1100],
    month: [15500, 15300, 10200, 6000],
    year: [98000, 134700, 119000, 154300, 70300, 135500, 106000, 172800, 111200, 90700, 106800, 134000]
  }
]

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
      period: 'week',
      date: {
        from: '',
        to: ''
      },
      checked: []
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
      let opt = []
      this.checked.forEach((item, index) => {
        const arr = rawData[index][this.period].map((item, index) => {
          const point = []
          point.push(this.dateArray[index])
          point.push(item)
          return point
        })
        opt.push(arr)
      })
      return opt
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
