<template lang="pug">
  .wrapper
    .row.q-pa-xs.col-12.justify-center
      .q-px-sm.column.col-4.q-gutter-md
        profit-card
        finances-card
        locations-card
        rooms-cards-creator
        documents-card
        notifications-card
      .q-px-sm.column.col-4.q-gutter-md
        parts-card
        bookings-card
        requests-card
        refunds-card
        promocodes-card
        notes-card
      .q-px-sm.column.col-4.q-gutter-md
        calendar-card
        workload-card
        chat-card
        reviews-card
        widget-card
</template>

<script>
import ProfitCard from './Cards/ProfitCard'
import PartsCard from './Cards/PartsCard/index'
import CalendarCard from './Cards/CalendarCard/index'
import FinancesCard from './Cards/FinancesCard'
import BookingsCard from './Cards/BookingsCard/index'
import WorkloadCard from './Cards/WorkloadCard/index'
import LocationsCard from './Cards/LocationsCard/index'
import RequestsCard from './Cards/RequestsCard/index'
import ChatCard from './Cards/ChatCard/index'
import RoomsCardsCreator from './Cards/RoomsCardsCreator/index'
import RefundsCard from './Cards/RefundsCard/index'
import PromocodesCard from './Cards/PromocodesCard/index'
import ReviewsCard from './Cards/ReviewsCard/index'
import DocumentsCard from './Cards/DocumentsCard/index'
import NotificationsCard from './Cards/NotificationsCard/index'
import NotesCard from './Cards/NotesCard/index'
import WidgetCard from './Cards/WidgetCard/index'

export default {
  name: 'Dashboard',
  components: { WidgetCard, NotesCard, NotificationsCard, DocumentsCard, ReviewsCard, PromocodesCard, RefundsCard, RoomsCardsCreator, ChatCard, RequestsCard, LocationsCard, WorkloadCard, BookingsCard, FinancesCard, CalendarCard, PartsCard, ProfitCard }
}
</script>

<style scoped>

</style>
