<template lang="pug">
  .wrapper
    .row.q-pa-xs.col-12.justify-center
      .q-px-sm.column.col-4.q-gutter-md
        profit-card
        finances-card
        locations-card
        rooms-card
      .q-px-sm.column.col-4.q-gutter-md
        parts-card
        bookings-card
        invoices-card
      .q-px-sm.column.col-4.q-gutter-md
        calendar-card
        workload-card
        chat-card
</template>

<script>
import ProfitCard from './Cards/ProfitCard'
import PartsCard from './Cards/PartsCard/index'
import CalendarCard from './Cards/CalendarCard/index'
import FinancesCard from './Cards/FinancesCard'
import BookingsCard from './Cards/BookingsCard/index'
import WorkloadCard from './Cards/WorkloadCard/index'
import LocationsCard from './Cards/LocationsCard/index'
import InvoicesCard from './Cards/InvoicesCard/index'
import ChatCard from './Cards/ChatCard/index'
import RoomsCard from './Cards/RoomsCard/index'

export default {
  name: 'Dashboard',
  components: { RoomsCard, ChatCard, InvoicesCard, LocationsCard, WorkloadCard, BookingsCard, FinancesCard, CalendarCard, PartsCard, ProfitCard }
}
</script>

<style scoped>

</style>
