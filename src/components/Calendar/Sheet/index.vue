<template lang="pug">
  .sheet
    q-toolbar
      q-btn(stretch flat label="Prev" @click="calendarPrev")
        q-separator(vertical)
      q-btn(stretch flat label="Next" @click="calendarNext")
        q-space
        q-separator
    q-calendar(
      ref="calendar"
      :resources="resources"
      v-model="selectedDate"
      view="week"
      locale="ru-ru"
      short-weekday-label
      body
      animated
      hour24-format
      transition-prev="slide-right"
      transition-next="slide-left"
    )
</template>

<script>

export default {
  name: 'CalendarSheet',
  data () {
    return {
      selectedDate: '',
      resources: []
    }
  },
  methods: {
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    calendarToday () {
      //
    }
  }
}
</script>

<style scoped lang="stylus">
  // this page
  .calendar-container
    position relative

  .my-event
    width 100%
    position absolute
    font-size 12px

  .full-width
    left 0
    width 100%

  .left-side
    left 0
    width 49.75%

  .right-side
    left 50.25%
    width 49.75%
</style>
