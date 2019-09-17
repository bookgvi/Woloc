<template lang="pug">
  .bookings
    filters-list(
      name="bookings"
      v-slot:default="props"
    )
      studio-filter(v-bind="props")
      rooms-filter(v-bind="props")
    bookings-table

</template>

<script>
import StudioFilter from 'components/Filters/StudioFilter'
import FiltersList from 'components/Filters/FiltersList'
import RoomsFilter from 'components/Filters/RoomsFilter'
import BookingsTable from './Table'

export default {
  name: 'Calendar',
  components: { StudioFilter, RoomsFilter, FiltersList, BookingsTable }
}
</script>

<style scoped>
</style>
