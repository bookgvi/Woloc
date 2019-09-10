<template lang="pug">
  .calendar
    CalendarMenu
    CalendarSheet
</template>

<script>
import CalendarMenu from '../Menu'
import CalendarSheet from './Sheet'

export default {
  name: 'Calendar',
  components: { CalendarMenu, CalendarSheet }
}
</script>

<style scoped>
</style>
