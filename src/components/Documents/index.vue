<template lang="pug">
  .documents
    filters-list(
      name="documents"
      v-slot:default="props"
    )
      q-btn.q-py-none.q-px-sm(
        outline
        dense
        no-caps
        label="Дата и время"
      )
    DocumentsTable
</template>

<script>
import DocumentsTable from './Table/index.vue'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
export default {
  components: {
    DocumentsTable,
    StudioFilter,
    RoomsFilter,
    FiltersList
  }
}
</script>

<style scoped>

</style>
