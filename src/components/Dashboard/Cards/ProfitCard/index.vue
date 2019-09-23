<template lang="pug">
  q-card-section
    profit-chart
    nav-bar

</template>

<script>
import NavBar from '../CommonModules/NavBar'
import ProfitChart from './Modules/ProfitChart'

export default {
  name: 'ProfitCard',
  components: {
    ProfitChart,
    NavBar
  },
}
</script>

<style scoped>

</style>
