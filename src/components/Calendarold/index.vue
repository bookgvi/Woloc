<template lang="pug">
  .calendar
    CalendarMenu
    CalendarDateControls
    CalendarTable

</template>

<script>
import CalendarTable from './Table/index'
import CalendarMenu from './Menu/index'
import CalendarDateControls from './DateControls/index'

export default {
  name: 'Calendarold',
  components: { CalendarTable, CalendarMenu, CalendarDateControls }
}
</script>

<style scoped>
</style>
