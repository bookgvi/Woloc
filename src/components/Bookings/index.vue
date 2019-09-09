<template lang="pug">
  .bookings
    CalendarMenu
    BookingsTable

</template>

<script>
import CalendarMenu from '../Menu/CalendarMenu'
import BookingsTable from './Table/index'

export default {
  name: 'Calendar',
  components: { BookingsTable, CalendarMenu }
}
</script>

<style scoped>
</style>
