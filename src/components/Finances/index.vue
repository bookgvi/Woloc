<template lang="pug">
  .finances
    filters-list(
      name="finance"
      v-slot:default="props"
    )
      studio-filter(v-bind="props")
      rooms-filter(v-bind="props")
    FinancesTable
</template>

<script>
import StudioFilter from 'components/Filters/StudioFilter'
import FiltersList from 'components/Filters/FiltersList'
import RoomsFilter from 'components/Filters/RoomsFilter'
import FinancesTable from './Table/index'
export default {
  name: 'RefundsIndex',
  components: {
    StudioFilter,
    RoomsFilter,
    FiltersList,
    FinancesTable
  }
}
</script>

<style>
</style>
