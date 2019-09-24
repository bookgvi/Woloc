<template lang="pug">
  q-card
    chart
    nav-bar
    options
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'

export default {
  name: 'ProfitCard',
  components: {
    Chart,
    NavBar,
    Options
  },
}
</script>

<style scoped>

</style>
