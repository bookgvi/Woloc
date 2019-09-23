<template lang="pug">
  q-card.column.q-py-md
    profit-chart.q-pa-sm(style="width: 33%;")
    profit-chart.q-pa-sm(style="width: 33%;")
    profit-chart.q-pa-sm(style="width: 33%;")

</template>

<script>
import ProfitChart from './Modules/ProfitChart'

export default {
  name: 'Dashboard',
  components: { ProfitChart }
}
</script>

<style scoped>
</style>
