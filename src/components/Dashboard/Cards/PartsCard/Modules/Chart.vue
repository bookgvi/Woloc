<template lang="pug">
  q-card-section
    span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Доля в бронированиях "}}
    span.row.text-body2.q-py-md.q-pl-sm {{ "23-29 сентября, 2019" }}
    chart(
      :options="options"
      style="width: 100%"
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
      options: {
        series: [{
          data: [12, 34, 56, 10, 23],
          type: 'pie'
        }]
      }
    }
  },
}
</script>

<style scoped>

</style>
