<template lang="pug">
  .calendar
    CalendarMenu
    CalendarSheet
</template>

<script>
import CalendarMenu from './Menu/index'
import CalendarSheet from './Sheet/index'
// import UpdateEventDialog from './Dialogs/UpdateEventDialog'

export default {
  name: 'Calendar',
  components: { CalendarMenu, CalendarSheet }
}
</script>

<style scoped>
</style>
