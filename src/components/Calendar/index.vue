<template lang="pug">
  .calendar
    CalendarMenu
    CalendarSheet
    // UpdateEventDialog
</template>

<script>
import CalendarMenu from '../Menu'
import CalendarSheet from './Sheet'
import UpdateEventDialog from './Dialogs/UpdateEventDialog'

export default {
  name: 'Calendar',
  components: { CalendarMenu, CalendarSheet, UpdateEventDialog }
}
</script>

<style scoped>
</style>
