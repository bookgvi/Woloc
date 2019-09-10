<template lang="pug">
  .wrapper
    .row.justify-start.items-center.q-px-none.no-wrap
      .justify-start.items-center
        h6.wrap-md.text-weight-bold Kap's Studios м. Бауманская, {{ month }}
      q-space
      .justify-end.items-center
        .row.justify-end.q-px-none.q-gutter-sm
          q-btn.q-px-sm(
            icon="calendar_today"
            outline
            color="secondary"
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
            outline
            label="Сегодня"
            no-caps
            @click="calendarToday"
            color="secondary"
          )
          q-btn-group(outline)
            q-btn.q-px-sm(
              outline
              icon="chevron_left"
              @click="calendarPrev"
              color="secondary"
             )
            q-separator(vertical inset)
            q-btn.q-px-sm(
              outline
              icon="chevron_right"
              @click="calendarNext"
              color="secondary"
             )
    template
      FirstColumn
      q-calendar.row.col-12(
        style="width: 95%; margin-left: 5%"
        ref="calendar"
        :weekdays=[1, 2, 3, 4, 5, 6, 0]
        :interval-start="8"
        :interval-count="16"
        v-model="selectedDate"
        view="week"
        locale="ru-ru"
        no-scroll
        hour24-format
        short-weekday-label
        column-header-before
        )
        template.row(#interval="{ time, date }")
          .fit.flex.justify-center.items-center
            NewEventDialog(
              :date="date"
              :interval="time"
              :studio="studio"
            )
        template(#day-header="{ date }")
          .row.justify-left.q-px-md.q-py-md
            span.ellipsis.text-uppercase.text-body2.text-weight-bold {{ dayHeader(date) }}
        template(#day-body="{ date, timeStartPos, timeDurationHeight }")
          q-separator.absolute(
            color="red"
            :style="timelineCoords"
          )
          q-badge.my-event.absolute-top(
            multi-line
            v-for="(e, index) in events"
            :value="e"
            v-if="e.date === date"
            :key="index"
            :style="badgeStyles(e, 'body', timeStartPos, timeDurationHeight)"
          )
            // UpdateEventDialog
            .row.col-12.justify-start.q-px-xs
              q-icon.row.justify-start(v-if="e.icon", :name="e.icon")
              .row.col-12
                span.text-body2.ellipsis {{ e.title }}
              .row.col-12
                span.text-body2.ellipsis {{ e.details }}
 </template>

<script>
import { date, colors } from 'quasar'
import icons from 'src/common/eventTypes'
import roomsColors from 'src/common/rooms/colors'
import NewEventDialog from './Popups/NewEventDialog'
import UpdateEventDialog from './Popups/UpdateEventDialog'
import FirstColumn from './Modules/FirstColumn'
import { dtFormat } from '../../../utils/helpers'

const formDefault = () => ({
  title: '',
  details: '',
  allDay: false,
  dateTimeStart: '',
  dateTimeEnd: '',
  icon: '',
  bgcolor: '#0000FF'
})

export default {
  name: 'CalendarSheet',
  components: { FirstColumn, UpdateEventDialog, NewEventDialog },
  data () {
    return {
      range: {
        from: '2019-05-01',
        to: '2020-01-01'
      },
      timelineCoords: {
        top: 0,
        left: 0,
        width: 0
      },
      eventForm: formDefault(),
      interval: {},
      events: [],
      addEvent: false,
      selectedDate: '',
      dateDialog: false,
      date: ''
    }
  },
  created: async function () {
    this.calendarToday()
  },
  mounted: function () {
    this.timelinePos()
    this.interval = setInterval(() =>
      this.timelinePos(), 1000 * 60)
  },
  computed: {
    studio () {
      return this.$app.studios.studio
    },
    month () {
      return date.formatDate(this.selectedDate, 'MMMM YYYY')
    },
    rooms () {
      if (this.$app.studios.list.length === 0) return []
      const arr = this.$app.studios.getFilteredRoomsByStudio(this.studio).map((item, index) => {
        const room = Object.assign({}, {
          name: item.name,
          color: roomsColors[index].color
        })
        return room
      })
      return arr
    }
  },
  methods: {
    dayHeader (dt) {
      return date.formatDate(dt, 'ddd D')
    },
    async placeEvents () {
      const day = +date.formatDate(this.selectedDate, 'E') - 1
      const start = date.subtractFromDate(this.selectedDate, { days: day })
      this.range = Object.assign({}, {
        from: date.formatDate(start, 'YYYY-MM-DD'),
        to: date.formatDate(date.addToDate(start, { days: 6 }), 'YYYY-MM-DD')
      })
      await this.$app.bookings.getForCalendar(this.studio, this.range.from, this.range.to)
    },
    resetForm () {
      this.$set(this, 'eventForm', formDefault())
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
      if (+this.$moment.parseZone(timestamp).format('HH') === 0) {
        timestamp = date.addToDate(timestamp, { days: -1 })
      }
      return this.$moment.parseZone(timestamp).format('YYYY-MM-DD')
    },
    getTime (timestamp, mask = 'HH:mm') {
      const hours = this.$moment.parseZone(timestamp).format('HH') !== '00' ? this.$moment.parseZone(timestamp).format(mask) : 24
      return hours
    },
    setColor (room) {
      const color = this.rooms.find(item => item.name === room).color
      return color
    },
    setIcon (action) {
      const icon = icons[action].icon
      return icon
    },
    setOrder (room) {
      const order = this.rooms.findIndex(item => item.name === room)
      return order
    },
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      let s = {
        'box-shadow': `inset 3px -3px 0 ${event.bgcolor}`,
        'font-size': '13px',
        'background-color': `${event.bgcolor}40`,
        'color': colors.lighten(event.bgcolor, -30),
        'align-items': 'flex-start'
      }
      if (timeStartPos) {
        s = Object.assign({}, s, {
          'top': timeStartPos(event.time) + 'px',
          'width': `${100 / event.max}%`,
          'left': `${100 / event.max * (event.posx)}%`
        })
      }
      if (timeDurationHeight) {
        s = Object.assign({}, s, { 'height': timeDurationHeight(event.duration) + 'px' })
      }
      return s
    },
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    calendarToday () {
      this.selectedDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
  },
  watch: {
    '$app.bookings.calendarList' (v) {
      // console.log('watch $app.bookings.calendarList', v)
      this.$nextTick(function () {
        let allEvents = []
        let bookings = []
        v.map((booking) => {
          if (this.$app.studios.checkedRooms.indexOf(booking.room.id) !== -1) {
            const diff = date.getDateDiff(
              dtFormat(booking.reservedTo),
              dtFormat(booking.reservedFrom),
              'minutes'
            )
            const event = {
              title: booking.customer.firstName,
              details: `${booking.amount}/${booking.price}`,
              date: this.getDate(booking.reservedFrom),
              time: this.getTime(booking.reservedFrom),
              duration: diff,
              bgcolor: this.setColor(booking.room.name),
              icon: this.setIcon(booking.eventType),
              devInfo: {
                time: {
                  from: +this.getTime(booking.reservedFrom, 'H'),
                  to: +this.getTime(booking.reservedTo, 'H')
                },
                room: booking.room.name
              },
              posx: 0,
              width: 1
            }
            bookings.push(event)
          }
        })
        const setPositionOfEvents = (dt) => {
          const roomsAmount = this.rooms.length
          let events = []
          let posArray = [...Array(roomsAmount + 10)].map(() => Array(24).fill(0))
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
          for (let order = 0; order < roomsAmount; order++) {
            for (let i = 0; i < bookings.length; i++) {
              const e = bookings[i]
              const timeFrom = e.devInfo.time.from
              const timeTo = e.devInfo.time.to
              if (e.date === dt && +timeFrom >= 8) {
                if (this.setOrder(e.devInfo.room) === order) {
                  let col = posArray.length - 1
                  if (col !== 0) {
                    col = findEmptyPlace(col, timeFrom, timeTo)
                  }
                  for (let time = timeFrom; time < timeTo; time++) {
                    posArray[col][time] = 1
                  }
                  e.posx = col
                  events.push(e)
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
          allEvents.push(...events)
        }
        const dayOfWeek = +date.formatDate(this.selectedDate, 'E') - 1
        const startDate = date.subtractFromDate(this.selectedDate, { days: dayOfWeek })
        for (let i = 0; i < 7; i++) {
          const currentDate = date.addToDate(startDate, { days: i })
          const formattedCurrentDate = date.formatDate(currentDate, 'YYYY-MM-DD')
          setPositionOfEvents(formattedCurrentDate)
        }
        this.events = allEvents
      })
    },
    async 'studio' (v) {
      await this.$app.bookings.getForCalendar(this.studio, this.range.from, this.range.to)
    },
    async '$app.studios.checkedRooms' (v) {
      await this.$app.bookings.getForCalendar(this.studio, this.range.from, this.range.to)
    },
    selectedDate (v) {
      // console.log('watch selectedDate', v)
      this.placeEvents()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
