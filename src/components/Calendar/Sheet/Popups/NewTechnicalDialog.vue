<template lang="pug">
  q-dialog(
    v-model="$app.dialogs.calendarNew"
    persistent
  )
    q-card
      q-card-section
        calendar-room(
          @roomChange="newBooking.room = $event"
          :filter="filter"
          :startRoom="newBooking.room.name"
        )
    q-card
      q-card-section
        calendar-comment

</template>

<script>
export default {
  name: 'NewTechnicalDialog'
}
</script>

<style scoped>

</style>
