<template lang="pug">
  q-popup-proxy
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
                :studio="studio"
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
                :date="this.date"
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
                :startTime="this.time"
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
                @extrasChange="newBooking.extras = $event"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Участники" }}
            .col-7.q-py-sm
              span.text-grey {{ membersSlot }}
          q-card
            q-card-section
              calendar-members(
                @membersChange="newBooking.members = $event"
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
              calendar-comment
        q-expansion-item(
          group="new-event"
          dense
          label="Удалить бронирование"
        )
          q-card
            q-card-section
              calendar-delete
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
export default {
  name: 'NewEventDialog',
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
      newBooking: {
        id: 8983249234,
        reservedFrom: '',
        reservedTo: '',
        eventType: '',
        price: '',
        discount: 0,
        amount: '',
        duration: 0,
        extras: [],
        members: [],
        customer: {
          email: '',
          firstName: '',
          lastName: '',
          phone: ''
        },
        studio: {
          id: '',
          name: ''
        },
        room: {
          id: '',
          name: ''
        }
      },
      helpers: {
        date: '',
        time: {
          from: 0,
          to: 0
        }
      }
    }
  },
  computed: {
    fee () {
      const duration = this.helpers.time.to - this.helpers.time.from
      const price = 1200 - this.newBooking.eventType.length * 10
      return {
        name: `${this.newBooking.eventType} ${duration} ч. • ${price} р.`,
        value: duration * price
      }
    },
    extras () {
      return this.newBooking.extras.map(item => Object.assign({
        name: item,
        value: 400 - item.length * 10
      }))
    },
    customerSlot () {
      if (this.newBooking.customer.firstName && this.newBooking.customer.phone) {
        return `${this.newBooking.customer.firstName} ${this.newBooking.customer.phone}`
      } else {
        return 'Введите имя пользователя'
      }
    },
    roomSlot () {
      return this.newBooking.room.name
    },
    dateSlot () {
      const formatDate = date.formatDate(this.helpers.date, 'D MMMM YYYY')
      return formatDate
    },
    timeSlot () {
      return `${this.helpers.time.from}:00-${this.helpers.time.to}:00`
    },
    eventSlot () {
      return this.newBooking.eventType
    },
    extrasSlot () {
      console.log(this.newBooking.extras.length)
      return this.newBooking.extras.length
    },
    membersSlot () {
      return this.newBooking.members.length
    },
    priceSlot () {
      return `${this.newBooking.price} р.`
    },
    reservedTime () {
      // const timeOffset = '+03:00'
      const bookingDate = date.extractDate(date.formatDate(this.helpers.date, 'YYYY-MM-DD'), 'YYYY-MM-DD')
      const from = date.addToDate(bookingDate, { hours: this.helpers.time.from })
      const to = (this.helpers.time.to !== 0 && this.helpers.time.to !== 24)
        ? date.addToDate(bookingDate, { hours: this.helpers.time.to })
        : date.addToDate(bookingDate, { days: 1 })
      return { from, to }
    }
  },
  methods: {
    applyBooking () {
      this.newBooking.reservedFrom = this.reservedTime.from
      this.newBooking.reservedTo = this.reservedTime.to
      this.newBooking.studio.id = this.$app.studios.studio
      this.newBooking.studio.name = this.$app.studios.selectedStudioLabel
      this.$app.bookings.calendarList.push(this.newBooking)
      console.log(888, this.$app.bookings.calendarList)
    }
  },
  props: ['date', 'time', 'studio']
}
</script>

<style scoped>

</style>
