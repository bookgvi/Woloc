<template lang="pug">
  .bookings
    filters-list(
      name="bookings"
      v-slot:default="props"
    )
      rooms-filter(v-bind="props")
    bookings-table

</template>

<script>
import BookingsTable from './Table'
import FiltersList from 'components/Filters/FiltersList'
import RoomsFilter from 'components/Filters/RoomsFilter'

export default {
  name: 'Calendar',
  components: { RoomsFilter, FiltersList, BookingsTable }
}
</script>

<style scoped>
</style>
