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
                @extrasChange="helpers.extras = $event"
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
                @membersChange="helpers.members = $event"
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
                :extras="helpers.extras"
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
        calendar-apply

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
        'reservedFrom': '',
        'reservedTo': '',
        'eventType': '',
        'price': '',
        'discount': '0.00',
        'amount': '',
        'duration': 0,
        'customer': {
          'email': '',
          'firstName': '',
          'lastName': '',
          'phone': ''
        },
        'studio': {
          'name': ''
        },
        'room': {
          'name': ''
        }
      },
      helpers: {
        date: '',
        time: {
          from: 0,
          to: 0
        },
        extras: [],
        members: [],
        prices: []
      }
    }
  },
  computed: {
    fee () {
      const duration = this.helpers.time.to - this.helpers.time.from
      const price = 1200
      return duration * price
    },
    customerSlot () {
      return `${this.newBooking.customer.firstName} ${this.newBooking.customer.phone}`
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
      console.log(this.helpers.extras)
      return this.helpers.extras.length
    },
    membersSlot () {
      return this.helpers.members.length
    },
    priceSlot () {
      return this.newBooking.price
    }
  },
  props: ['date', 'time', 'studio']
}
</script>

<style scoped>

</style>
