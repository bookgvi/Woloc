<template lang="pug">
  .sheet
    .row
      .col-9.row
        span.room-name Kap's Studios м. Бауманская{{month}}
      .col-3.row
        q-toolbar.toolbar.justify-end
          q-btn.btn.btn-calendar(
            color=$primary
            icon="calendar_today"
            @click="dateDialog = true"
            )
          q-btn.btn.btn-today(
              color=$primary
              label="Сегодня"
              no-caps
              @click="calendarToday"
              )
          q-btn.btn.btn-nav(
            color=$primary
            icon="chevron_left"
            @click="calendarPrev"
            )
          q-btn.btn.btn-nav(
            color=$primary
            icon="chevron_right"
            @click="calendarNext"
            )
          q-dialog(
            v-model="dateDialog"
            )
            q-date(
              v-model="selectedDate"
              minimal
              mask="YYYY-MM-DD"
              )

    q-calendar(
      ref="calendar"
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      :interval-start="8"
      :interval-count="16"
      v-model="selectedDate"
      view="week"
      locale="ru-ru"
      short-weekday-label
      animated
      hour24-format
      transition-prev="slide-right"
      transition-next="slide-left"
      class="calendar-container"
      )
      template(#day-header="{ date }")
        .row.justify-center
          template(v-for="(event, index) in eventsMap[date]")
            q-badge.ellipsis(v-if="!event.time", :key="index", style="width: 100%; cursor: pointer;", :class="badgeClasses(event, 'header')", :style="badgeStyles(event, 'header')")
              q-icon.q-mr-xs(v-if="event.icon", :name="event.icon")
              span.ellipsis {{ event.title }}
            q-badge.q-ma-xs(v-else="", :key="index", :class="badgeClasses(event, 'header')", :style="badgeStyles(event, 'header')", style="width: 10px; max-width: 10px; height: 10px; max-height: 10px")
      template(#day-body="{ date, timeStartPos, timeDurationHeight }")
        template(v-for="(event, index) in getEvents(date)")
          q-badge.my-event.justify-center.ellipsis(v-if="event.time", :key="index", :class="badgeClasses(event, 'body')", :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)")
            q-icon.q-mr-xs(v-if="event.icon", :name="event.icon")
            span.ellipsis {{ event.title }}

</template>

<script>
import { date, colors } from 'quasar'

export default {
  name: 'CalendarSheet',
  data () {
    return {
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
      ],
      events: [],
      selectedDate: '',
      dateDialog: false,
      date: ''
    }
  },
  created: function () {
    this.calendarToday()
  },
  computed: {
    eventsMap () {
      const map = {}
      this.events.forEach((event) => (map[event.date] = map[event.date] || []).push(event))
      return map
    },
    month () {
      const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ]
      const date = this.selectedDate.split('-')
      return `, ${months[+date[1] - 1]} ${date[0]}`
    }
  },
  methods: {
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },

    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },

    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      let s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s['color'] = colors.luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s['top'] = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s['height'] = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },

    getEvents (dt) {
      let events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        if (this.events[i].date === dt) {
          if (this.events[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              let startTime = new Date(this.events[i].date + ' ' + this.events[i].time)
              let endTime = date.addToDate(startTime, { minutes: this.events[i].duration })
              for (let j = 0; j < events.length; ++j) {
                let startTime2 = new Date(events[j].date + ' ' + events[j].time)
                let endTime2 = date.addToDate(startTime2, { minutes: events[j].duration })
                if (date.isBetweenDates(startTime, startTime2, endTime2) || date.isBetweenDates(endTime, startTime2, endTime2)) {
                  events[j].side = 'left'
                  this.events[i].side = 'right'
                  events.push(this.events[i])
                  added = true
                  break
                }
              }
            }
          }
          if (!added) {
            this.events[i].side = void 0
            events.push(this.events[i])
          }
        } else if (this.events[i].days) {
          // check for overlapping dates
          let startDate = new Date(this.events[i].date)
          let endDate = date.addToDate(startDate, { days: this.events[i].days })
          if (date.isBetweenDates(dt, startDate, endDate)) {
            events.push(this.events[i])
            added = true
          }
        }
      }
      return events
    },
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    calendarToday () {
      const timestamp = new Date()
      const today = date.formatDate(timestamp, 'YYYY-MM-DD')
      this.selectedDate = today
    }
  }
}
</script>

<style scoped lang="stylus">
  // this page
  .toolbar
    height 80px
  .calendar-container
    position relative
    width 100%

  .my-event
    width 100%
    position absolute
    font-size 12

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
    margin auto 0 auto 0
    display block
    color: #4A4A4A
    font-family: Montserrat
    font-size: 21px
    font-weight: 600
    line-height: 25px
</style>
