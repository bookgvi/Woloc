<template lang="pug">
  .sheet
    q-toolbar
      q-btn(stretch='' flat='' label='Prev' @click='calendarPrev')
        q-separator(vertical='')
      q-btn(stretch='' flat='' label='Next' @click='calendarNext')
        q-space
        q-separator
    q-calendar(ref='calendar'
      hour24-format=true
      now
      :interval-start="8"
      :interval-count="16"
      v-model='selectedDate'
      view="week"
      locale='ru-ru'
      short-weekday-label
      body=''
      )
</template>

<script>

export default {
  name: 'CalendarSheet',
  data () {
    return {
      selectedDate: '',
      resources: [
        { label: '08:00 - 09:00' },
        { label: '09:00 - 10:00' },
        { label: '10:00 - 11:00' },
        { label: '11:00 - 12:00' },
        { label: '12:00 - 13:00' },
        { label: '13:00 - 14:00' },
        { label: '14:00 - 15:00' },
        { label: '15:00 - 16:00' },
        { label: '16:00 - 17:00' },
        { label: '17:00 - 18:00' },
        { label: '18:00 - 19:00' },
        { label: '19:00 - 20:00' },
        { label: '20:00 - 21:00' },
        { label: '21:00 - 22:00' },
        { label: '22:00 - 23:00' },
        { label: '23:00 - 00:00' }
      ]
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
