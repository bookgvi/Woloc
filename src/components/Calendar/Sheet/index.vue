<template lang="pug">
  .sheet
    .row
      .col-9
        span.room-name Kap"s Studios м. Бауманская, Октябрь 2018
      .col-3
        q-toolbar
          q-btn.btn.btn-calendar(
            color=$primary
            icon="assignment"
            )
          q-btn.btn.btn-today(
            color=$primary
            label="Сегодня"
            no-caps
            @click="calendarToday"
            )
          q-btn.btn.btn-nav(
            color=$primary
            icon="backspace"
            @click="calendarPrev"
            )
          q-btn.btn.btn-nav(
            color=$primary
            icon="forward"
            @click="calendarNext"
            )
    q-calendar(
      ref="calendar"
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      :interval-start="8"
      :interval-count="16"
      :resource-height="50"
      v-model="selectedDate"
      view="week"
      locale="ru-ru"
      short-weekday-label
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
      // this.calendar.
    }
  }
}
</script>

<style scoped lang="stylus">
  // this page
  .calendar-container
    position relative
    width 100%

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

  .btn
    color $text-black
    border: 1px solid #ECECEC
  .btn-calendar
    width 40px
    height 40px
    margin-right 30px
  .btn-today
    font-family: Montserrat
    font-size: 14px
    height 40px
    margin-right 10px
    width 110px
  .btn-nav
    width 40px
    height 40px
  .room-name
    color: #4A4A4A
    font-family: Montserrat
    font-size: 21px
    font-weight: 600
    line-height: 25px
</style>
