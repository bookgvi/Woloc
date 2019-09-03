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
      first-column
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
import { colors, date } from 'quasar'
import icons from 'src/common/eventType/icons'
// import bookings from '../Data/bookings'
// import rooms from '../../../mocks/rooms'
import roomsColors from 'src/common/rooms/colors'
import NewEventDialog from './Popups/NewEventDialog'
import UpdateEventDialog from './Popups/UpdateEventDialog'
import FirstColumn from './Modules/FirstColumn'

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
        studio: '100',
        from: '2019-05-01',
        to: '2020-01-01'
      },
      bookings: [],
      rooms: [],
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
    await this.$app.customers.getAll()
    await this.$app.events.getAll()
    await this.$app.extras.getAll()
    await this.setRooms()
    // this.getEvents()
  },
  mounted: function () {
    this.timelinePos()
    this.interval = setInterval(() =>
      this.timelinePos(), 1000 * 60)
  },
  computed: {
    month () {
      return date.formatDate(this.selectedDate, 'MMMM YYYY')
    }
  },
  methods: {
    async setRooms () {
      await this.$app.rooms.getAll()
      const roomsNames = this.$app.rooms.list
      this.rooms = roomsNames.map((roomName, index) => {
        const room = {
          name: roomName.name,
          color: roomsColors[index].color
        }
        return room
      })
    },
    dayHeader (dt) {
      return date.formatDate(dt, 'ddd D')
    },
    async placeEvents () {
      let allEvents = []
      const day = +date.formatDate(this.selectedDate, 'E') - 1
      const start = date.subtractFromDate(this.selectedDate, { days: day })
      this.range = Object.assign({}, {
        from: date.formatDate(start, 'YYYY-MM-DD'),
        to: date.formatDate(date.addToDate(start, { days: 6 }), 'YYYY-MM-DD')
      })
      await this.setRange()
      const setEvents = () => {
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
      }
      const setPositionOfEvents = (dt) => {
        let events = []
        let posArray = [...Array(this.rooms.length)].map(() => Array(24).fill(0))
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
        for (let order = 0; order < this.rooms.length; order++) {
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
        allEvents.push(...events)
      }
      const dayOfWeek = +date.formatDate(this.selectedDate, 'E') - 1
      const startDate = date.subtractFromDate(this.selectedDate, { days: dayOfWeek })
      setEvents()
      for (let i = 0; i <= 6; i++) {
        const currentDate = date.addToDate(startDate, { days: i })
        const formattedCurrentDate = date.formatDate(currentDate, 'YYYY-MM-DD')
        setPositionOfEvents(formattedCurrentDate)
      }
      this.events = allEvents
    },
    resetForm () {
      this.$set(this, 'eventForm', formDefault())
    },
    async setRange () {
      await this.$app.bookings.getForCalendar(this.range.studio, this.range.from, this.range.to)
      this.bookings = this.$app.bookings.list
      console.log(this.bookings)
    },
    editEvent (event) {
      this.resetForm()
      const form = formDefault()
      this.contextDay = { ...event }
      let timestamp
      if (event.time) {
        timestamp = event.date + ' ' + event.time
        let startTime = new Date(timestamp)
        let endTime = date.addToDate(startTime, { minutes: event.duration })
        form.dateTimeStart = date.formatDate(startTime) + ' ' + date.formatTime(startTime) // endTime.toString()
        form.dateTimeEnd = date.formatDate(endTime) + ' ' + date.formatTime(endTime) // endTime.toString()
      } else {
        timestamp = event.date
        form.dateTimeStart = timestamp
      }
      form.allDay = !event.time
      // form.bgcolor = event.bgcolor
      // form.icon = event.icon
      // form.title = event.title
      // form.details = event.details
      this.eventForm = Object.assign({}, form, event)
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
      const color = this.rooms.find(item => item.name === room).color
      return color
    },
    setIcon (action) {
      const icon = icons.find(item => item.name === action).icon
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
      console.log(this.$refs.calendar)
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    calendarToday () {
      const timestamp = new Date()
      const today = date.formatDate(timestamp, 'YYYY-MM-DD')
      this.selectedDate = today
    }
  },
  watch: {
    selectedDate (v) {
      console.log('watch selectedDate', v)
      this.placeEvents()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
