<template lang="pug">
  .finances
    filters-list(
      name="finances"
      v-slot:default="props"
    )
      studio-filter(v-bind="props")
      rooms-filter(v-bind="props")
    FinancesTable
</template>

<script>
import FinancesTable from './Table/index'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    RoomsFilter,
    StudioFilter,
    FinancesTable,
  }
}
</script>

<style>
</style>
