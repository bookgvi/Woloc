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
      q-calendar.row.col-12.q-px-md(
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
        transition-prev="slide-right"
        transition-next="slide-left"
        class="calendar-container"
        )
        template(
          #day-body="{ date, timeStartPos, timeDurationHeight }"
        )
          q-separator.timeline(
            color="red"
            :style="timelinePos(timeStartPos)"
          )
          q-badge.my-event(
            v-for='(event, index) in getEvents(date)'
            v-if='event.time'
            :key='index'
            :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
          )
            q-icon.q-mr-xs(v-if='event.icon', :name='event.icon')
            span.ellipsis {{ event.title }}
 </template>

<script>

import { date, colors } from 'quasar'
import bookings from '../Data/bookings'
import icons from '../Data/icons'
import rooms from '../Data/rooms'
import eventsColors from '../Data/colors'

export default {
  name: 'CalendarSheet',
  data () {
    return {
      events: [],
      addEvent: false,
      selectedDate: '',
      dateDialog: false,
      date: ''
    }
  },
  created: function () {
    this.calendarToday()
    this.events = bookings.map((booking) => {
      const event = {
        title: booking.user.name,
        details: `${booking.prepayment}/${booking.price}`,
        date: booking.date,
        time: `${booking.time.from}:00`,
        duration: (+booking.time.to - +booking.time.from) * 60,
        bgcolor: this.setColor(booking.room.name),
        icon: this.setIcon(booking.action.name),
        devInfo: {
          time: {
            from: booking.time.from,
            to: booking.time.to
          },
          room: booking.room.name
        },
        amount: 1,
        posx: 0
      }
      return event
    })
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
    setColor (action) {
      const color = eventsColors.find(item => item.name === action).color
      return color
    },
    setIcon (action) {
      const icon = icons.find(item => item.name === action).icon
      return icon
    },
    setOrder (room) {
      const order = rooms.find(item => item.name === room).order
      return order
    },
    timelinePos (timeStartPos) {
      let pos = {}
      const timestamp = new Date()
      const hours = date.formatDate(timestamp, 'HH')
      const minutes = date.formatDate(timestamp, 'mm')
      pos['top'] = (hours >= 8) ? `${timeStartPos(hours) + +40 / 60 * minutes}px` : 0
      pos['left'] = '0px'
      pos['width'] = '100%'
      return pos
    },
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      let s = {}
      s['background-color'] = event.bgcolor
      s['color'] = colors.luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
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
    getEvents (dt) {
      let events = []
      // массив 24 элемента, соответствует каждому часу суток, при создании события,
      // час, который событие цепляет увеличивается на 1
      let timeChecker = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let order = 0; order < rooms.length; order++) {
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].date === dt) {
            if (this.setOrder(this.events[i].devInfo.room) === order) {
              console.log(order)
              for (let time = this.events[i].devInfo.time.from; time < this.events[i].devInfo.time.to; time++) {
                this.events[i].posx = (this.events[i].posx < timeChecker[time]) ? timeChecker[time] : this.events[i].posx
                timeChecker[time]++
                console.log(time)
              }
              console.log(timeChecker)
              events.push(this.events[i])
            }
          }
        }
      }
      events = events.map((event) => {
        let max = 0
        for (let i = event.devInfo.time.from; i < event.devInfo.time.to; i++) {
          max = (max < timeChecker[i]) ? timeChecker[i] : max
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
  .calendar-container
    position relative

  .my-event
    position absolute
    font-size 12px

  .timeline
    position absolute
    z-index: 9999999
</style>
