<template lang="pug">
  q-card-section
    chart(
      :options="chartOptions"
      style="width: 100%; height=100%;"
    )

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'

export default {
  name: 'Chart',
  components: {
    'chart': ECharts
  },
  data () {
    return {
    }
  },
  computed: {
    chartData () {
      if (!this.options) return [100]
      return this.options
    },
    chartOptions () {
      const chartOptions = {
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [100],
          type: 'line'
        }]
      }
      if (this.chartData) {
        chartOptions.series[0].data = this.chartData
      }
      return chartOptions
    }
  },
  props: {
    options: Array,
  }
}
</script>

<style scoped>

</style>
