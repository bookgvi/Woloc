<template lang="pug">
  .refunds
    filters-list(
      name="refunds"
      v-slot:default="props"
    )
      studio-filter(v-bind="props")
      rooms-filter(v-bind="props")
    RefundsTable
</template>

<script>
import RefundsTable from './Table/index'
import Menu from '../Menu'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    RoomsFilter,
    StudioFilter,
    Menu,
    RefundsTable,
  }
}
</script>

<style>
</style>
