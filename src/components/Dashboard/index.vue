<template lang="pug">
  .wrapper
    .q-py-md.row.col-12.q-col-gutter-sm
      .col-4
        profit-card
      .col-4
        parts-card
      .col-4
        calendar-card
      .col-4
        finances-card

</template>

<script>
import ProfitCard from './Cards/ProfitCard'
import PartsCard from './Cards/PartsCard/index'
import CalendarCard from './Cards/CalendarCard/index'
import FinancesCard from './Cards/FinancesCard'

export default {
  name: 'Dashboard',
  components: { FinancesCard, CalendarCard, PartsCard, ProfitCard }
}
</script>

<style scoped>
</style>
