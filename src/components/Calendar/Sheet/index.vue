<template lang="pug">
  .q-pa-none
    .row.justify-start.items-center.q-px-none.no-wrap
      .justify-start.items-center
        h6.wrap-md.text-weight-bold {{ selectedStudioLabel }}, {{ month }}
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
    template(
      style="width: 100%"
      )
      first-column(
        :isAllDay ="isAllDay"
        @allDayChange="isAllDay=$event"
      )
      q-calendar.row.col-12(
        style="width: 100%; padding-left: 68px"
        ref="calendar"
        :weekdays=[1, 2, 3, 4, 5, 6, 0]
        :interval-start="intervalStartCalendar"
        :interval-count="intervalCountCalendar"
        v-model="selectedDate"
        view="week"
        locale="ru-ru"
        no-scroll
        hour24-format
        short-weekday-label
        column-header-before
      )
        template.row(#interval="{ time, date }")
          .row.fit.q-pa-none
            booking-type-menu(
              @fastClick="setNewTechnical(date, time)"
              @commonClick="setNewBooking(date, time)"
            )
        template(#day-header="{ date }")
          .row.justify-left.q-px-md.q-py-md(
            :style="dayHeaderStyle(date)"
          )
            span.ellipsis.text-uppercase.text-body2.text-weight-bold {{ dayHeader(date) }}
        template(#day-body="{ date, timeStartPos, timeDurationHeight }")
          timeline(
            :timeStartPos="timeStartPos"
            :timeDurationHeight="timeDurationHeight"
            :isAllDay ="isAllDay"
          )
          q-badge.absolute-top.block.q-pa-none(
            multi-line
            v-for="(e, index) in events"
            :value="e"
            v-if="e.date === date"
            :key="index"
            @click="findBooking(index)"
            :style="badgeStyles(e, 'body', timeStartPos, timeDurationHeight)"
          )
            .row.col-12.justify-start.q-pl-xs
              q-icon.col-1.row.justify-start(v-if="!e.technical && e.icon", :name="e.icon")
              .q-pa-none.col-1.offset-4(
                v-if="e.isNotFullVisible"
                :style="arrowUpStyles(e)"
              )
              .q-pa-none.col-1(
                v-if="e.isExtras"
                :style="triangleStyles(e)"
              )
              .row.col-12(v-if="!e.technical")
                span.row.col-12.text-booking.wrap {{ e.title }}
                span.row.col-12.text-booking.wrap {{ e.details }}
              .row.col-12(v-else)
                span.row.col-12.text-booking.wrap {{ e.managerComment }}
      update-event-dialog(
        :isCreate="isCreate"
        :dialogState="dialogState"
        :filter="filter"
        :booking="selectedBooking"
        @setQueryState="setQueryState($event)"
      )
 </template>

<script>
import { colors } from 'quasar'
import { EVENT_TYPES } from 'src/common/constants'
import roomsColors from 'src/common/rooms/colors'
import UpdateEventDialog from './Popups/UpdateEventDialog'
import FirstColumn from './Modules/FirstColumn'
import Timeline from './Modules/Timeline'
import BookingTypeMenu from './Popups/BookingTypeMenu'

const usedColors = {}

export default {
  name: 'CalendarSheet',
  components: { BookingTypeMenu, FirstColumn, UpdateEventDialog, Timeline },
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
      isCreate: true,
      calendarKey: 0,
      isAllDay: false,
      events: [],
      selectedDate: '',
      dialogState: false,
      technicalDialogState: false,
      selectedBooking: {},
    }
  },
  created: async function () {
    this.calendarToday()
  },
  computed: {
    intervalStartCalendar () {
      return this.isAllDay ? 0 : 8
    },
    intervalCountCalendar () {
      return this.isAllDay ? 24 : 16
    },
    selectedStudioLabel () {
      return this.studio ? this.studio.name : 'Студия не выбрана'
    },
    studio () {
      return this.$app.studios.getFiltered(this.filter)
    },
    month () {
      return this.$moment(this.selectedDate).format('MMMM YYYY')
    },
    rooms () {
      return this.$app.rooms.getFiltered(this.filter)
    }
  },
  methods: {
    formatPrice (price) {
      const fixed = +Number(price).toFixed()
      return fixed.toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    setNewBooking (date, time) {
      this.isCreate = true
      this.selectedBooking = Object.assign({}, {
        id: -1,
        customer: {},
        customerComment: '',
        managerComment: '',
        price: 0,
        reservedFrom: this.$moment(`${date}T${time}`),
        reservedTo: this.$moment(`${date}T00:00`),
        room: this.filter.rooms[0] || '',
        eventType: '',
        studio: this.studio,
        filter: this.filter
      })
      // console.log(1111, this.selectedBooking)
      this.dialogState = true
    },
    setNewTechnical (date, time) {
      this.isCreate = true
      this.selectedBooking = Object.assign({}, {
        id: -1,
        managerComment: '',
        reservedFrom: this.$moment(`${date}T${time}`),
        reservedTo: this.$moment(`${date}T${time}`).add(1, 'hours'),
        room: this.filter.rooms[0] || '',
        technical: true
      })
      // console.log(1111, this.selectedBooking)
      this.dialogState = true
    },
    async findBooking (index) {
      this.isCreate = false
      this.selectedBooking = await this.$app.bookings.getOne(this.events[index].id)
      // console.log(this.selectedBooking)
      this.technicalDialogState = true
    },
    dayHeader (dt) {
      return this.$moment(dt).format('ddd D')
    },
    dayHeaderStyle (dt) {
      if (this.$moment(dt).isSame(this.$moment(), 'day')) {
        return {
          color: '#fff',
          'background-color': '#8F7CC2',
        }
      }
    },
    async loadData () {
      await this.$app.bookings.getForCalendar({
        ...this.filter,
        dateFrom: this.range.from,
        dateTo: this.range.to
      })
    },
    async placeEvents () {
      const dayOfWeek = +this.$moment(this.selectedDate).format('e')
      const startDate = this.$moment(this.selectedDate).subtract(dayOfWeek, 'days')
      this.range = Object.assign({}, {
        from: this.$moment(startDate).format('YYYY-MM-DD'),
        to: this.$moment(startDate).add(6, 'days').format('YYYY-MM-DD')
      })
      await this.loadData()
    },
    getDate (timestamp) {
      return timestamp.format('YYYY-MM-DD')
    },
    getTime (timestamp, mask = 'HH:mm') {
      return timestamp.format(mask)
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
    triangleStyles (event) {
      let s = {
        'width': '0',
        'height': '0',
        'border-top': `10px solid ${colors.lighten(event.bgcolor, -30)}`,
        'border-left': '10px solid transparent',
        'margin': '0 0 0 auto'
      }
      return s
    },
    arrowUpStyles (event) {
      let s = {
        'width': '0',
        'height': '0',
        'border-left': '5px solid transparent',
        'border-right': '5px solid transparent',
        'border-bottom': `10px solid ${colors.lighten(event.bgcolor, -30)}`
      }
      return s
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
      this.selectedDate = this.$moment().format('YYYY-MM-DD')
    },
    async setQueryState (state = true) {
      // console.log(999, state)
      if (state === true) {
        await this.placeEvents()
      }
      this.dialogState = false
    }
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
            let from = this.$moment(booking.reservedFrom).parseZone()
            let to = this.$moment(booking.reservedTo).parseZone()
            let isNotFullVisible = false
            if (!this.isAllDay) {
              if (from.hour() < 8) {
                from.hour(8)
                isNotFullVisible = true
              }
              if (to.hour() < 8 && to.hour() > 0) {
                to.hour(8)
              }
            }
            const diff = to.diff(from, 'minutes')
            let title = ''
            if (booking.customer && booking.customer.firstName) {
              title = booking.customer.firstName
            }
            const event = {
              id: booking.id,
              isNotFullVisible,
              isExtras: (booking.extras && booking.extras.length > 0),
              title: title,
              // comment: booking.managerComment,
              details: `${this.formatPrice(booking.amount)}/${this.formatPrice(booking.price)}`,
              date: this.getDate(from),
              time: this.getTime(from),
              duration: diff,
              bgcolor: this.getColor(booking),
              icon: this.setIcon(booking.eventType),
              technical: booking.technical,
              devInfo: {
                time: {
                  from: +this.getTime(from, 'HH'),
                  to: +this.getTime(to, 'H') !== 0 ? +this.getTime(to, 'H') : 24
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
                if (e.date === dt && e.duration > 0) {
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
          const dayOfWeek = +this.$moment(this.selectedDate).format('e')
          const startDate = this.$moment(this.selectedDate).subtract(dayOfWeek, 'days')
          for (let i = 0; i < 7; i++) {
            const currentDate = this.$moment(startDate).add(i, 'days')
            const formattedCurrentDate = this.$moment(currentDate).format('YYYY-MM-DD')
            setPositionOfEvents(formattedCurrentDate)
          }
          this.events = allEvents
        })
      },
      deep: true
    },
    async filter () {
      await this.loadData()
    },
    async isAllDay (v) {
      this.$emit('isAllDayChange', v)
      await this.placeEvents()
    },
    async selectedDate () {
      await this.placeEvents()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
