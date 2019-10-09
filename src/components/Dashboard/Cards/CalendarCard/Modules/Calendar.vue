<template lang="pug">
  q-card-section
    q-calendar(
      :interval-start="intervalStartCalendar"
      :interval-count="intervalCountCalendar"
      v-model="selectedDate"
      locale="ru-ru"
      no-scroll
      hide-header
      hour24-format
      view="day"
    )
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
          :key="index"
          :style="badgeStyles(e, 'body', timeStartPos, timeDurationHeight)"
        )
          .row.col-12.justify-start.q-pl-xs
            q-icon.col-1.row.justify-start(v-if="e.icon", :name="e.icon")
            .q-pa-none.col-1.offset-4(
              v-if="e.isNotFullVisible"
              :style="arrowUpStyles(e)"
            )
            .q-pa-none.col-1(
              v-if="e.isExtras"
              :style="triangleStyles(e)"
            )
            .row.col-12
              span.row.text-body2.ellipsis {{ e.title }}
            .row.col-12
              span.row.text-body2.ellipsis {{ e.details }}

</template>

<script>
import Timeline from 'src/components/Calendar/Sheet/Modules/Timeline'
import { colors } from 'quasar'
import { formatPrice, getDate, getTime, getColor, setIcon } from 'src/utils/helpersForCalendar'

export default {
  name: 'Calendar',
  components: { Timeline },
  data () {
    return {
      events: [],
    }
  },
  computed: {
    intervalStartCalendar () {
      return this.isAllDay ? 0 : 8
    },
    intervalCountCalendar () {
      return this.isAllDay ? 24 : 16
    },
    selectedDate () {
      if (!this.startDate) return this.$moment().format('YYYY-MM-DD')
      return this.$moment(this.startDate).format('YYYY-MM-DD')
    },
    rooms () {
      return this.$app.rooms.getAvailable({ studio: this.studio }).map(item => item.id)
    },
    studio () {
      return (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0
    }
  },
  props: {
    startDate: Object,
    bookings: Array,
    isAllDay: Boolean
  },
  methods: {
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
    setOrder (roomId) {
      const order = this.rooms.findIndex(item => item === roomId)
      return order
    },
    async loadData () {
      const filter = {
        studio: this.studio,
        rooms: this.rooms
      }
      await this.$app.bookings.getForCalendar({
        ...filter,
        dateFrom: this.selectedDate,
        dateTo: this.$moment(this.selectedDate).add(1, 'days').format('YYYY-MM-DD')
      })
    },
  },
  watch: {
    async isAllDay () {
      await this.loadData()
    },
    async selectedDate () {
      await this.loadData()
    },
    studio: {
      async handler () {
        if (this.studio !== 0) {
          await this.loadData()
        }
      },
      immediate: true
    },
    bookings: {
      handler (v) {
        // console.log('watch bookings', v)
        this.events = []
        let bookings = []
        this.$nextTick(function () {
          v.map((booking) => {
            if (this.$moment(this.selectedDate).isSame(booking.reservedFrom, 'day')) {
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
                details: `${formatPrice(booking.amount)}/${formatPrice(booking.price)}`,
                date: getDate(from),
                time: getTime(from),
                duration: diff,
                bgcolor: getColor(booking),
                icon: setIcon(booking.eventType),
                devInfo: {
                  time: {
                    from: +getTime(from, 'HH'),
                    to: +getTime(to, 'H') !== 0 ? +getTime(to, 'H') : 24
                  },
                  room: booking.room.name
                },
                posx: this.setOrder(booking.room.id),
                countInRow: this.rooms.length
              }
              bookings.push(event)
            }
          })
          this.events = bookings
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
