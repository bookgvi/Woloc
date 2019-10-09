<template lang="pug">
  .calendar
    filters-list(name="calendar")
      template(#prepend="props")
        studio-filter(v-bind="props")
        rooms-filter(v-bind="props")
        events-filter(v-bind="props")
        price-filter(v-bind="props")
    CalendarSheet(
      :filter="filter"
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
  components: { EventsFilter, FiltersList, RoomsFilter, StudioFilter, PriceFilter, CalendarSheet },
  computed: {
    filter () {
      const studio = this.$app.studios.list[0].id
      const filter = {
        studio,
        rooms: this.$app.rooms.getAvailable({ studio }).map(item => item.id)
      }
      return filter
    }
  }

}
</script>

<style scoped>
</style>
