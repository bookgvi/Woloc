<template lang="pug">
  .wrapper.row.q-py-md
    profit-card.q-ma-sm.col-6
    parts-card.q-ma-sm.col

</template>

<script>
import ProfitCard from './Cards/ProfitCard'
import PartsCard from './Cards/PartsCard/index'

export default {
  name: 'Dashboard',
  components: { PartsCard, ProfitCard }
}
</script>

<style scoped>
</style>
