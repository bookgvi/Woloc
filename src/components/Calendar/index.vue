<template lang="pug">
  .calendar
    filters-list(
      name="calendar"
      v-slot:default="props"
    )
      studio-filter(v-bind="props")
      rooms-filter(v-bind="props")
      events-filter(v-bind="props")
      price-filter(v-bind="props")
    CalendarSheet(
      :filter="$app.filters.getValues('calendar')"
      :bookings="$app.bookings.calendarList"
    )
</template>

<script>
import CalendarSheet from './Sheet'
import FiltersList from '../Filters/FiltersList'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import EventsFilter from '../Filters/EventsFilter'
import PriceFilter from '../Filters/PriceFilter'

export default {
  name: 'Calendar',
  components: { EventsFilter, FiltersList, RoomsFilter, StudioFilter, PriceFilter, CalendarSheet }
}
</script>

<style scoped>
</style>
