<template lang="pug">
  .q-pa-none(
    v-if="rerender"
  )
    filters-list(name="calendar")
      template(#prepend="props")
        studio-filter(v-bind="props")
        rooms-filter(v-bind="props")
        events-filter(v-bind="props")
        price-filter(v-bind="props")
    CalendarSheet(
      :filter="filter"
      :bookings="$app.bookings.calendarList"
      @isAllDayChange="isAllDay = $event"
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
  data () {
    return {
      rerender: true,
      isAllDay: true
    }
  },
  components: { EventsFilter, FiltersList, RoomsFilter, StudioFilter, PriceFilter, CalendarSheet }
}
</script>

<style scoped>
</style>
