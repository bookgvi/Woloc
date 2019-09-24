<template lang="pug">
  q-card-section
    chart(
      :options="options"
    )

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'

export default {
  name: 'ProfitChart',
  components: {
    'chart': ECharts
  },
  data () {
    return {
      options: {
        title: {
          text: 'Доход',
          textStyle: {
            color: 'black',
            fontWeight: 'bold'
          }
        },
        xAxis: {
          type: 'time',
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [
            ['2019-09-21', 3900],
            ['2019-09-22', 5600],
            ['2019-09-23', 3200],
            ['2019-09-24', 2600],
            ['2019-09-25', 4300],
            ['2019-09-26', 6200],
            ['2019-09-27', 1500]
          ],
          type: 'line'
        }]
      }
    }
  },
}
</script>

<style scoped>

</style>
