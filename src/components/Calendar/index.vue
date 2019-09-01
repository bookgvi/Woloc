<template lang="pug">
  .calendar
    CalendarMenu
    CalendarSheet
    NewEventDialog
    // UpdateEventDialog
</template>

<script>
import CalendarMenu from './Menu/index'
import CalendarSheet from './Sheet/index'
import UpdateEventDialog from './Dialogs/UpdateEventDialog'
import NewEventDialog from './Dialogs/NewEventDialog'

export default {
  name: 'Calendar',
  components: { NewEventDialog, CalendarMenu, CalendarSheet, UpdateEventDialog }
}
</script>

<style scoped>
</style>
