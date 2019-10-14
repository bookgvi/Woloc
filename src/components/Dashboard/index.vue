<template lang="pug">
  .q-pa-none
    .q-py-md.row.col-12.q-col-gutter-sm
      .col-4
        profit-card
      .col-4
        parts-card
      .col-4
        calendar-card
      .col-4
        finances-card
      .col-4
        bookings-card
      .col-4
        workload-card
</template>

<script>
import ProfitCard from './Cards/ProfitCard'
import PartsCard from './Cards/PartsCard/index'
import CalendarCard from './Cards/CalendarCard/index'
import FinancesCard from './Cards/FinancesCard'
import BookingsCard from './Cards/BookingsCard/index'
import WorkloadCard from './Cards/WorkloadCard/index'

export default {
  name: 'Dashboard',
  components: { WorkloadCard, BookingsCard, FinancesCard, CalendarCard, PartsCard, ProfitCard }
}
</script>

<style scoped>
</style>
