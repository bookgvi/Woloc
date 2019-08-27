<template lang="pug">
  .sheet.row.q-px-none
    .row.col-12.justify-start.items-center.q-px-md.no-wrap
      .justify-start.items-center
        h6.wrap-md Kap's Studios м. Бауманская{{ month }}
      q-space
      .justify-end.items-center
        q-toolbar.row.justify-end.q-px-none
          q-btn.btn.btn-calendar(
            icon="calendar_today"
          )
            q-popup-proxy
              q-card
                q-date(
                  full-width
                  v-model="selectedDate"
                  minimal
                  mask="YYYY-MM-DD"
                )
          q-btn(
            label="Сегодня"
            no-caps
            @click="calendarToday"
          )
          q-btn(
            icon="chevron_left"
            @click="calendarPrev"
           )
          q-btn(
            icon="chevron_right"
            @click="calendarNext"
           )
    template
      q-calendar.row.col-12.q-px-md.relative-position(
        style="width: 100%;"
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
        )
        template(
          #day-body="{ date, timeStartPos, timeDurationHeight }"
        )
          q-separator.absolute(
            color="red"
            :style="timelineCoords"
          )
          q-badge.my-event.absolute-top(
            multi-line
            v-for='(event, index) in getEvents(date)'
            v-if='event.time'
            :key='index'
            :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
          )
            .row.col-12.justify-start.q-px-xs
              q-icon.row.justify-start(v-if='event.icon', :name='event.icon')
              .row.col-12
                span {{ event.title }}
              .row.col-12
                span.ellipsis {{ event.details }}
 </template>

<script>

import { date, colors } from 'quasar'
import icons from '../Data/icons'
// import bookings from '../Data/bookings'
import rooms from '../Data/rooms'
// import axios from 'axios'

const formDefault = {
  title: '',
  details: '',
  allDay: false,
  dateTimeStart: '',
  dateTimeEnd: '',
  icon: '',
  bgcolor: '#0000FF'
}

export default {
  name: 'CalendarSheet',
  data () {
    return {
      timelineCoords: {
        top: 0,
        left: 0,
        width: 0
      },
      eventForm: { ...formDefault },
      interval: {},
      events: [],
      bookings: [],
      addEvent: false,
      selectedDate: '',
      dateDialog: false,
      date: ''
    }
  },
  created: async function () {
    this.calendarToday()
    await this.$app.bookings.getForTime(100, '20190501', '20200101')
    this.events = this.$app.bookings.list.map((booking) => {
      const event = {
        title: booking.customer.firstName,
        details: `${booking.amount}/${booking.price}`,
        date: this.getDate(booking.reservedFrom),
        time: `${this.getTime(booking.reservedFrom)}:00`,
        duration: (+this.getTime(booking.reservedTo) - +this.getTime(booking.reservedFrom)) * 60,
        bgcolor: this.setColor(booking.room.name),
        icon: this.setIcon(booking.eventType),
        devInfo: {
          time: {
            from: this.getTime(booking.reservedFrom),
            to: this.getTime(booking.reservedTo)
          },
          room: booking.room.name
        },
        posx: 0,
        width: 1
      }
      return event
    })
  },
  mounted: function () {
    this.timelinePos()
    this.interval = setInterval(() =>
      this.timelinePos(), 1000 * 60)
  },
  computed: {
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
    resetForm () {
      this.$set(this, 'eventForm', { ...formDefault })
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
      this.$app.bookings.dialogs.update = true // show dialog
    },
    timelinePos () {
      const timestamp = new Date()
      const hours = date.formatDate(timestamp, 'HH')
      const minutes = date.formatDate(timestamp, 'mm')
      if (this.$refs.calendar) {
        this.timelineCoords['top'] = (hours >= 8) ? `${this.$refs.calendar.timeStartPos(hours) + +this.$refs.calendar.timeDurationHeight(1) * minutes}px` : 0
      } else {
        this.timelineCoords['top'] = '0px'
      }
      this.timelineCoords['left'] = '0px'
      this.timelineCoords['width'] = '100%'
    },
    getDate (timestamp) {
      if (+date.formatDate(timestamp, 'HH') === 0) {
        timestamp = date.addToDate(timestamp, { days: -1 })
      }
      return date.formatDate(timestamp, 'YYYY-MM-DD')
    },
    getTime (timestamp) {
      const hours = (date.formatDate(timestamp, 'HH') !== '00') ? date.formatDate(timestamp, 'HH') : 24
      return hours
    },
    setColor (room) {
      const color = rooms.find(item => item.name === room).color
      return color
    },
    setIcon (action) {
      const icon = icons.find(item => item.name === action).icon
      return icon
    },
    setOrder (room) {
      const order = rooms.findIndex(item => item.name === room)
      return order
    },
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      let s = {}
      s['box-shadow'] = `inset 3px -3px 0 ${event.bgcolor}`
      s['font-size'] = '13px'
      s['background-color'] = `${event.bgcolor}40`
      s['color'] = colors.lighten(event.bgcolor, -30)
      if (timeStartPos) {
        s['top'] = timeStartPos(event.time) + 'px'
        s['width'] = `${100 / event.max}%`
        s['left'] = `${100 / event.max * (event.posx)}%`
      }
      if (timeDurationHeight) {
        s['height'] = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    getEvents: function (dt) {
      let posArray = [...Array(rooms.length)].map(() => Array(24).fill(0))
      const findEmptyPlace = (col, from, to) => {
        const isEmptyPlace = (c) => {
          for (let i = +from; i < +to; i++) {
            if (posArray[c][i] !== 0) {
              return false
            }
          }
          return true
        }
        for (let c = col; c >= 0; c--) {
          if (isEmptyPlace(c) === false) {
            return c + 1
          }
        }
        return 0
      }
      let events = []
      for (let order = 0; order < rooms.length; order++) {
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].date === dt) {
            if (this.setOrder(this.events[i].devInfo.room) === order) {
              const timeFrom = this.events[i].devInfo.time.from
              const timeTo = this.events[i].devInfo.time.to
              let col = order
              if (col !== 0) {
                col = findEmptyPlace(col, timeFrom, timeTo)
              }
              for (let time = timeFrom; time < timeTo; time++) {
                posArray[col][time] = 1
              }
              this.events[i].posx = col
              events.push(this.events[i])
            }
          }
        }
      }
      let widthArray = Array(24).fill(1)
      for (let i = 0; i < widthArray.length; i++) {
        for (let j = posArray.length - 1; j >= 0; j--) {
          if (posArray[j][i] !== 0) {
            widthArray[i] = (widthArray[i] < (j + 1) ? j + 1 : widthArray[i])
          }
        }
      }
      events = events.map((event) => {
        let max = 0
        for (let i = event.devInfo.time.from; i < event.devInfo.time.to; i++) {
          max = (max < widthArray[i]) ? widthArray[i] : max
        }
        event.max = max
        return event
      })
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
</style>
