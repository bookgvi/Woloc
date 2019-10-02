<template lang="pug">
  .calendar
    filters-list(name="calendar")
      template(#prepend="props")
        studio-filter(v-bind="props")
        rooms-filter(v-bind="props")
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
import EventFilter from '../Filters/EventFilter'
import PriceFilter from '../Filters/PriceFilter'

export default {
  name: 'Calendar',
  components: { FiltersList, RoomsFilter, StudioFilter, EventFilter, PriceFilter, CalendarSheet }
}
</script>

<style scoped>
</style>
