<template lang="pug">
  .sheet
    .row
      .col-9.row
        span Kap's Studios м. Бауманская{{month}}
      .col-3.row
        q-toolbar.toolbar.justify-end
          q-btn.btn.btn-calendar(
            icon="calendar_today"
            push
            )
            q-popup-proxy
              q-card
                q-date(
                  full-width
                  v-model="selectedDate"
                  minimal
                  mask="YYYY-MM-DD"
                )
          q-btn.btn.btn-today(
              label="Сегодня"
              no-caps
              @click="calendarToday"
              )
          q-btn.btn.btn-nav(
            icon="chevron_left"
            @click="calendarPrev"
            )
          q-btn.btn.btn-nav(
            icon="chevron_right"
            @click="calendarNext"
            )

    q-calendar(
      ref="calendar"
      :weekdays=[1, 2, 3, 4, 5, 6, 0]
      :interval-start="8"
      :interval-count="16"
      v-model="selectedDate"
      view="week"
      locale="ru-ru"
      animated
      no-scroll
      hour24-format
      transition-prev="slide-right"
      transition-next="slide-left"
      class="calendar-container"
      @click:time="addEventMenu"
    )
</template>

<script>

const formDefault = {
  title: '',
  details: '',
  allDay: false,
  dateTimeStart: '',
  dateTimeEnd: '',
  icon: '',
  bgcolor: '#0000FF'
}

import { date, colors } from 'quasar'

export default {
  name: 'CalendarSheet',
  data () {
    return {
      events: [],
      addEvent: false,
      selectedDate: '',
      dateDialog: false,
      date: '',
      eventForm: {}
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
    addEventMenu (day, type) {
      console.log(this)
      this.resetForm()
      this.contextDay = { ...day }
      let timestamp
      if (this.contextDay.hasTime === true) {
        timestamp = this.getTimestamp(this.adjustTimestamp(this.contextDay))
        let startTime = new Date(timestamp)
        let endTime = date.addToDate(startTime, { hours: 1 })
        this.eventForm.dateTimeEnd = this.formatDate(endTime) + ' ' + this.formatTime(endTime) // endTime.toString()
      } else {
        timestamp = this.contextDay.date + ' 00:00'
      }
      this.eventForm.dateTimeStart = timestamp
      this.eventForm.allDay = this.contextDay.hasTime === false
      this.eventForm.bgcolor = '#0000FF' // starting color
      this.$app.calendar.dialogs.update = true
    },
    editEvent (event) {
      this.resetForm()
      this.contextDay = { ...event }
      let timestamp
      if (event.time) {
        timestamp = event.date + ' ' + event.time
        let startTime = new Date(timestamp)
        let endTime = date.addToDate(startTime, { minutes: event.duration })
        this.eventForm.dateTimeStart = this.formatDate(startTime) + ' ' + this.formatTime(startTime) // endTime.toString()
        this.eventForm.dateTimeEnd = this.formatDate(endTime) + ' ' + this.formatTime(endTime) // endTime.toString()
      } else {
        timestamp = event.date
        this.eventForm.dateTimeStart = timestamp
      }
      this.eventForm.allDay = !event.time
      this.eventForm.bgcolor = event.bgcolor
      this.eventForm.icon = event.icon
      this.eventForm.title = event.title
      this.eventForm.details = event.details
      this.$app.calendar.dialogs.update = true
    },
    resetForm () {
      this.$set(this, 'eventForm', { ...formDefault })
    },
    adjustTimestamp (day) {
      day.minute = day.minute < 15 || day.minute >= 45 ? 0 : 30
      return day
    },
    getTimestamp (day) {
      return day.date + ' ' + (day.hour) + ':' + (day.minute) + ':00.000'
    },
    formatDate (date) {
      let d = date !== void 0 ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      return [year, month, day].join('-')
    },
    formatTime (date) {
      let d = date !== void 0 ? new Date(date) : new Date(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes()

      return [hours, minutes].join(':')
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
  /*.toolbar*/
  /*  height 80px*/
  /*.calendar-container*/
  /*  position relative*/
  /*  width 100%*/

  /*.my-event*/
  /*  width 100%*/
  /*  position absolute*/
  /*  font-size 12*/

  /*.full-width*/
  /*  left 0*/
  /*  width 100%*/

  /*.left-side*/
  /*  left 0*/
  /*  width 49.75%*/

  /*.right-side*/
  /*  left 50.25%*/
  /*  width 49.75%*/

  /*.btn*/
  /*  color black*/
  /*  border: 1px solid #ECECEC*/

  /*.btn-calendar*/
  /*  width 40px*/
  /*  height 40px*/
  /*  margin-right 30px*/

  /*.btn-today*/
  /*  font-size: 14px*/
  /*  height 40px*/
  /*  margin-right 10px*/
  /*  width 110px*/

  /*.btn-nav*/
  /*  width 40px*/
  /*  height 40px*/

  /*.room-name*/
  /*  margin auto 0 auto 0*/
  /*  display block*/
  /*  color: #4A4A4A*/
  /*  font-size: 21px*/
  /*  font-weight: 600*/
  /*  line-height: 25px*/
</style>
