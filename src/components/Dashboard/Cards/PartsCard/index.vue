<template lang="pug">
  q-card
    chart(
      :options ="options"
    )
    nav-bar
    options(
      :options ="options"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'
import roomsColors from 'src/common/rooms/colors'

const rawData = {
  week: [
    {
      room: 'Зал 11',
      total: '4600'
    },
    {
      room: 'Зал 12',
      total: '3600'
    },
    {
      room: 'Зал 13',
      total: '2700'
    },
    {
      room: 'Зал 14',
      total: '5800'
    }
  ],
  month: [
    {
      room: 'Зал 11',
      total: '46000'
    },
    {
      room: 'Зал 12',
      total: '57000'
    },
    {
      room: 'Зал 13',
      total: '69000'
    },
    {
      room: 'Зал 14',
      total: '36000'
    }
  ],
  quarter: [
    {
      room: 'Зал 11',
      total: '148000'
    },
    {
      room: 'Зал 12',
      total: '127000'
    },
    {
      room: 'Зал 13',
      total: '157000'
    },
    {
      room: 'Зал 14',
      total: '181000'
    }
  ]
}

let period = 'month'

export default {
  name: 'ProfitCard',
  components: {
    Chart,
    NavBar,
    Options
  },
  computed: {
    options () {
      const sum = rawData[period].reduce((acc, cv) => +acc + +cv.total || 0)
      return rawData[period].map((item, index) => {
        const point = {
          name: item.room,
          total: item.total,
          percent: (item.total / sum * 100).toFixed(2),
          color: roomsColors[index].color
        }
        return point
      })
    }
  }
}
</script>

<style scoped>

</style>
