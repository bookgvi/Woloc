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
          #day-body='{ date, timeStartPos, timeDurationHeight }'
        )
          template(
            v-for='(event, index) in getEvents(date)'
          )
            .row.col-12.justify-start.ellipsis
              q-badge.my-event(
                v-if='event.time'
                :key='index'
                :class="badgeClasses(event, 'body')"
                :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
              )
                q-icon.q-mr-xs(v-if='event.icon', :name='event.icon')
                span.ellipsis {{ event.title }}
 </template>

<script>

import { date, colors } from 'quasar'
import bookings from '../Data/bookings'
import icons from '../Data/icons'

export default {
  name: 'CalendarSheet',
  data () {
    return {
      events: [
        {
          title: bookings[0].user.name,
          details: 'Time to pitch my idea to the company',
          date: '2019-08-19',
          time: '10:00',
          duration: 360,
          bgcolor: 'red',
          icon: 'fas fa-camera-retro'
        },
        {
          title: bookings[0].user.name,
          details: 'Company is paying!',
          date: '2019-08-21',
          time: '10:00',
          duration: 120,
          bgcolor: 'green',
          icon: 'fas fa-camera-retro'
        },
        {
          title: bookings[0].user.name,
          details: 'Always a nice chat with mom',
          date: '2019-08-18',
          time: '10:00',
          duration: 120,
          bgcolor: 'blue-grey',
          icon: 'fas fa-camera-retro'
        },
        {
          title: bookings[0].user.name,
          details: 'Teaching Javascript 101',
          date: '2019-08-20',
          time: '10:00',
          duration: 180,
          bgcolor: 'blue',
          icon: 'fas fa-camera-retro'
        }
      ],
      addEvent: false,
      selectedDate: '',
      dateDialog: false,
      date: ''
    }
  },
  created: function () {
    console.log(this)
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
    setIcon (action) {
      for
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
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
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

  .full-width
    left 0
    width 100%
</style>
