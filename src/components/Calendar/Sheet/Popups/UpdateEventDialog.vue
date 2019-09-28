<template lang="pug">
  q-dialog(
    v-model="$app.dialogs.calendarUpdate"
    persistent
  )
    q-card.q-py-md(
      style="width: 330px"
    )
      q-list.text-body2.text-black.text-weight-bold(
        dense
      )
        q-expansion-item(
          group="new-event"
          dense
          default-opened
        )
          template(v-slot:header).row.items-center
            .col-4.q-py-sm
              span {{ "Клиент" }}
            .col-7.q-py-sm
              span.text-grey {{ customerSlot }}
          q-card
            q-card-section
              calendar-customer(
                :startCustomer="newBooking.customer"
                @customerChange="newBooking.customer = $event"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Зал" }}
            .col-7.q-py-sm
              span.text-grey {{ roomSlot }}
          q-card
            q-card-section
              calendar-room(
                @roomChange="newBooking.room = $event"
                :filter="filter"
                :startRoom="room.name"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Дата" }}
            .col-7.q-py-sm
              span.text-grey {{ dateSlot }}
          q-card
            q-card-section
              calendar-date(
                @dateChange="helpers.date = $event"
                :date="helpers.date"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Время" }}
            .col-7.q-py-sm
              span.text-grey {{ timeSlot }}
          q-card
            q-card-section
              calendar-time(
                @timeChange="helpers.time = $event"
                :startTime="helpers.time.from"
                :endTime="helpers.time.to"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Цель" }}
            .col-7.q-py-sm
              span.text-grey {{ eventSlot }}
          q-card
            q-card-section
              calendar-event(
                @eventChange="newBooking.eventType = $event"
                :startEvent="newBooking.eventType"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Доп. услуги" }}
            .col-7.q-py-sm
              span.text-grey {{ extrasSlot }}
          q-card
            q-card-section
              calendar-extras(
                @extrasChange="helpers.checkedExtras = $event.slice()"
                :startExtras="helpers.checkedExtras.slice()"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Оплата" }}
            .col-7.q-py-sm
              span.text-grey {{priceSlot }}
          q-card
            q-card-section
              calendar-price(
                @priceChange="newBooking.price = $event"
                :extras="extras"
                :fee="fee"
              )
        q-expansion-item(
          group="new-event"
          dense
          label="Коммент"
        )
          q-card
            q-card-section
              calendar-comment(
                @customerCommentChange="newBooking.customerComment = $event"
                :startCustomerComment="newBooking.customerComment"
                @managerCommentChange="newBooking.customerComment = $event"
                :startManagerComment="newBooking.customerComment"
              )
        q-expansion-item(
          group="new-event"
          dense
          label="Удалить бронирование"
        )
          q-card
            q-card-section
              calendar-delete(

              )
        calendar-apply(
          :applyBooking="applyBooking"
        )

</template>

<script>
import { date } from 'quasar'
import CalendarCustomer from './Modules/CalendarCustomer'
import CalendarRoom from './Modules/CalendarRoom'
import CalendarDate from './Modules/CalendarDate'
import CalendarTime from './Modules/CalendarTime'
import CalendarEvent from './Modules/CalendarEvent'
import CalendarExtras from './Modules/CalendarExtras'
import CalendarMembers from './Modules/CalendarMembers'
import CalendarPrice from './Modules/CalendarPrice'
import CalendarComment from './Modules/CalendarComment'
import CalendarDelete from './Modules/CalendarDelete'
import CalendarApply from './Modules/CalendarApply'
import { EVENT_TYPES } from 'src/common/constants'

export default {
  name: 'UpdateEventDialog',
  components: { CalendarDelete,
    CalendarComment,
    CalendarPrice,
    CalendarMembers,
    CalendarExtras,
    CalendarEvent,
    CalendarTime,
    CalendarDate,
    CalendarRoom,
    CalendarCustomer,
    CalendarApply
  },
  data () {
    return {
      newBooking: {},
      helpers: {
        date: '',
        checkedExtras: [],
        time: {
          from: 0,
          to: 0
        }
      },
    }
  },
  computed: {
    fee () {
      const duration = this.helpers.time.to - this.helpers.time.from
      let price = 1000
      if (this.newBooking.eventType) {
        price = EVENT_TYPES[this.newBooking.eventType].price
      }
      return {
        name: `${this.newBooking.eventType} ${duration} ч. • ${price} р.`,
        price: duration * price
      }
    },
    room () {
      if (!this.newBooking.room) {
        return {}
      } else {
        return this.newBooking.room
      }
    },
    extras () {
      if (!this.helpers.checkedExtras) {
        return []
      } else {
        return this.helpers.checkedExtras.map(item => {
          return {
            name: item,
            price: this.$app.extras.list.find(extra => extra.name === item).price
          }
        })
      }
    },
    customerSlot () {
      if (this.newBooking.customer && this.newBooking.customer.firstName && this.newBooking.customer.phone) {
        return `${this.newBooking.customer.firstName} ${this.newBooking.customer.phone}`
      } else {
        return 'Введите имя пользователя'
      }
    },
    roomSlot () {
      if (this.newBooking.room) {
        return this.newBooking.room.name
      } else {
        return 'Выберите зал'
      }
    },
    dateSlot () {
      const formatDate = date.formatDate(this.helpers.date, 'D MMMM YYYY')
      return formatDate
    },
    timeSlot () {
      return `${this.helpers.time.from}:00-${this.helpers.time.to}:00`
    },
    eventSlot () {
      if (this.newBooking.eventType) {
        return this.newBooking.eventType
      } else {
        return 'Выберите цель'
      }
    },
    extrasSlot () {
      if (!this.helpers.checkedExtras) return 0
      return this.helpers.checkedExtras.length
    },
    membersSlot () {
      return this.newBooking.members.length
    },
    priceSlot () {
      return `${this.newBooking.price} р.`
    },
    reservedTime () {
      const bookingDate = date.extractDate(date.formatDate(this.helpers.date, 'YYYY-MM-DD'), 'YYYY-MM-DD')
      const from = date.addToDate(bookingDate, { hours: this.helpers.time.from })
      const to = (this.helpers.time.to !== 0 && this.helpers.time.to !== 24)
        ? date.addToDate(bookingDate, { hours: this.helpers.time.to })
        : date.addToDate(bookingDate, { days: 1 })
      return { from, to }
    }
  },
  methods: {
    setParamsForPost () {
      return {
        roomId: this.newBooking.room.id,
        consumerId: this.newBooking.customer.id,
        reserveFrom: this.$moment(this.newBooking.reservedFrom).utcOffset('+03:00').format('YYYY-MM-DDThh:mm:ssZ'),
        reserveTo: this.$moment(this.newBooking.reservedTo).utcOffset('+03:00').format('YYYY-MM-DDThh:mm:ssZ'),
        // userComment: this.newBooking.customerComment || '',
        priceType: this.newBooking.eventType,
        extras: [],
        seats: 1,
        // description: this.newBooking.managerComment || ''
      }
    },
    async applyBooking () {
      this.newBooking.reservedFrom = this.reservedTime.from
      this.newBooking.reservedTo = this.reservedTime.to
      this.newBooking.studio.id = this.filter.studio
      this.newBooking.studio.name = this.selectedStudioLabel
      const index = this.$app.bookings.calendarGetIndexById(this.newBooking.id)
      if (index === -1) {
        const payload = this.setParamsForPost()
        console.log(54, payload)
        await this.$app.bookings.addNew(payload)
      } else {
        this.$app.bookings.calendarList[index] =
          Object.assign(this.$app.bookings.calendarList[index], this.newBooking)
      }
      console.log(9, this.newBooking.id, index)
    }
  },
  props: ['booking', 'filter'],
  watch: {
    'booking' (v) {
      this.$nextTick(function () {
        this.newBooking = Object.assign(v)
        const hDate = this.$moment.parseZone(this.newBooking.reservedFrom).format('YYYY-MM-DD')
        const hFrom = +this.$moment.parseZone(this.newBooking.reservedFrom).format('k')
        let hTo = +this.$moment.parseZone(this.newBooking.reservedTo).format('k')
        if (hTo === 0) {
          hTo = 24
        }
        let checkedExtras = []
        if (this.newBooking.extras) {
          checkedExtras = this.newBooking.extras.map(item => item.name)
        }
        this.helpers = Object.assign(this.helpers, {
          date: hDate,
          time: {
            from: hFrom,
            to: hTo
          },
          checkedExtras: Object.assign([], checkedExtras)
        })
        console.log(545, this.helpers, this.newBooking)
      })
    }
  }
}
</script>

<style scoped>

</style>
