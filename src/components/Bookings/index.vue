<template lang="pug">
  .bookings
    Filters
    BookingsTable

</template>

<script>
import BookingsTable from './Table/index'
import Filters from '../Menu/index'

export default {
  name: 'Calendar',
  components: { Filters, BookingsTable }
}
</script>

<style scoped>
</style>
