<template lang="pug">
  .customers
    filters-list(
      name="customers"
      v-slot:default="props"
    )
      rating-filter(v-bind="props")
    customers-table
</template>

<script>
import FiltersList from 'components/Filters/FiltersList'
import RatingFilter from 'components/Filters/RatingFilter'
import CustomersTable from './Table'

export default {
  name: 'CustomersPage',
  components: { RatingFilter, CustomersTable, FiltersList },
}
</script>
