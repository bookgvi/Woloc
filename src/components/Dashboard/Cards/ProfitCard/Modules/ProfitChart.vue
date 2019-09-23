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
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
}
</script>

<style scoped>

</style>
