<template lang="pug">
  .calendar
    CalendarMenu
    CalendarSheet
    UpdateEventDialog
</template>

<script>
import CalendarMenu from './Menu/index'
import CalendarSheet from './Sheet/index'
import UpdateEventDialog from './Dialogs/UpdateEventDialog'

export default {
  name: 'Calendar',
  components: { CalendarMenu, CalendarSheet, UpdateEventDialog }
}
</script>

<style scoped>
</style>
