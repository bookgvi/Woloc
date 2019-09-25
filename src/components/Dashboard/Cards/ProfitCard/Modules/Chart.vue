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
import roomsColors from 'src/common/rooms/colors'

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
        this.chartData.forEach((item, index) => {
          chartOptions.series[index] = Object.assign({
            data: item,
            type: 'line',
            color: roomsColors[index].color
          })
          chartOptions.series[index].data = item
        })
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
