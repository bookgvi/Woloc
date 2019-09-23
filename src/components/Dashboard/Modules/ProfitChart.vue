<template lang="pug">
  q-card-section
    v-chart(
      :options="linear"
      style="width: 100%; height: 100%"
    )

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'

export default {
  name: 'ProfitChart',
  components: {
    'profit': ECharts
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    return {
      polar: {
        title: {
          text: 'yt'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  },
}
</script>

<style scoped>

</style>
