<template lang="pug">
  .wrapper
    .row.q-pa-mg.col-12.justify-center
      .q-px-sm.column.col-4.q-gutter-md
        profit-card
        finances-card
      .q-px-sm.column.col-4.q-gutter-md
        parts-card
        bookings-card
      .q-px-sm.column.col-4.q-gutter-md
        calendar-card
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
