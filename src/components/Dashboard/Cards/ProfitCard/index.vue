<template lang="pug">
  q-card-section
    profit-chart
    nav-bar
    profit-options
</template>

<script>
import NavBar from '../CommonModules/NavBar'
import ProfitChart from './Modules/ProfitChart'
import ProfitOptions from './Modules/ProfitOptions'

export default {
  name: 'ProfitCard',
  components: {
    ProfitChart,
    NavBar,
    ProfitOptions
  },
}
</script>

<style scoped>

</style>
