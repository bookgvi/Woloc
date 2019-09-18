<template lang="pug">
  .wrapper
    .row.justify-start.items-center.q-px-none.no-wrap
      .justify-start.items-center
        h6.wrap-md.text-weight-bold {{ selectedStudioLabel }} {{ month }}
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
            new-event-dialog(
              :date="date"
              :time="formatTimeToHours(time)"
              :studio="studio"
              :filter="filter"
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
            @click="click(index)"
            :style="badgeStyles(e, 'body', timeStartPos, timeDurationHeight)"
          )
            update-event-dialog(
              :filter="filter"
              :booking="findBooking(index)"
            )
            .row.col-12.justify-start.q-px-xs
              q-icon.row.justify-start(v-if="e.icon", :name="e.icon")
              .row.col-12
                span.text-body2.ellipsis {{ e.title }}
              .row.col-12
                span.text-body2.ellipsis {{ e.details }}
 </template>

<script>
import { date, colors } from 'quasar'
import { EVENT_TYPES } from 'src/common/constants'
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

const usedColors = {}

export default {
  name: 'CalendarSheet',
  components: { FirstColumn, UpdateEventDialog, NewEventDialog },
  props: {
    filter: Object,
    bookings: Array
  },
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
    selectedStudioLabel () {
      return this.studio ? this.studio.name : ''
    },
    studio () {
      return this.$app.studios.getFiltered(this.filter)
    },
    month () {
      return date.formatDate(this.selectedDate, 'MMMM YYYY')
    },
    rooms () {
      return this.$app.rooms.getFiltered(this.filter)
    }
  },
  methods: {
    click (index) {
      console.log(666, index)
    },
    formatTimeToHours (time) {
      return +time.split(':')[0]
    },
    findBooking (index) {
      return this.$app.bookings.calendarGetObjById(this.events[index].id)
    },
    dayHeader (dt) {
      return date.formatDate(dt, 'ddd D')
    },
    async loadData () {
      await this.$app.bookings.getForCalendar({
        ...this.filter,
        dateFrom: this.range.from,
        dateTo: this.range.to
      })
    },
    async placeEvents () {
      const day = +date.formatDate(this.selectedDate, 'E') - 1
      const start = date.subtractFromDate(this.selectedDate, { days: day })
      this.range = Object.assign({}, {
        from: date.formatDate(start, 'YYYY-MM-DD'),
        to: date.formatDate(date.addToDate(start, { days: 6 }), 'YYYY-MM-DD')
      })
      await this.loadData()
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
    getColor ({ room: { id } }) {
      if (!(id in usedColors)) {
        const i = Object.keys(usedColors).length
        usedColors[id] = roomsColors[i < roomsColors.length ? i : 0]
      }

      return usedColors[id].color
    },
    setIcon (action) {
      const icon = EVENT_TYPES[action].icon
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
          'width': `${100 / event.countInRow}%`,
          'left': `${100 / event.countInRow * (event.posx)}%`
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
    bookings: {
      handler (v) {
        // console.log('watch bookings', v)
        this.events = []
        let allEvents = []
        let bookings = []
        this.$nextTick(function () {
          v.map((booking) => {
            const diff = date.getDateDiff(
              dtFormat(booking.reservedTo),
              dtFormat(booking.reservedFrom),
              'minutes'
            )
            const event = {
              id: booking.id,
              title: booking.customer.firstName,
              details: `${booking.amount}/${booking.price}`,
              date: this.getDate(booking.reservedFrom),
              time: this.getTime(booking.reservedFrom),
              duration: diff,
              bgcolor: this.getColor(booking),
              icon: this.setIcon(booking.eventType),
              devInfo: {
                time: {
                  from: +this.getTime(booking.reservedFrom, 'H'),
                  to: +this.getTime(booking.reservedTo, 'H')
                },
                room: booking.room.name
              },
              posx: 0,
              countInRow: 1
            }
            bookings.push(event)
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
            let widthArray = Array(24).fill(0)
            for (let i = 0; i < widthArray.length; i++) {
              for (let j = posArray.length - 1; j >= 0; j--) {
                if (posArray[j][i] !== 0) {
                  widthArray[i] = (widthArray[i] < (j + 1) ? j + 1 : widthArray[i])
                }
              }
            }
            let isNormalizedWidth = false
            while (isNormalizedWidth === false) {
              events = events.map((event) => {
                let maxCountInRow = 0
                for (let i = event.devInfo.time.from; i < event.devInfo.time.to; i++) {
                  maxCountInRow = (maxCountInRow < widthArray[i]) ? widthArray[i] : maxCountInRow
                }
                event.countInRow = (event.countInRow < maxCountInRow) ? maxCountInRow : event.countInRow
                return event
              })
              isNormalizedWidth = true
              events = events.map((event) => {
                for (let i = event.devInfo.time.from; i < event.devInfo.time.to; i++) {
                  if (widthArray[i] < event.countInRow) {
                    widthArray[i] = event.countInRow
                    isNormalizedWidth = false
                  }
                }
                return event
              })
            }
            // console.log(widthArray)
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
      deep: true
    },
    async filter (v) {
      await this.loadData()
    },
    selectedDate (v) {
      this.placeEvents()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
