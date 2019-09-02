<template lang="pug">
  q-popup-proxy
    q-card.text-body1.q-py-md(
      style="width: 350px"
      )
      q-list.text-black.text-weight-bold(
        bordered
        dense
        )
        q-expansion-item(
          group="new-event"
          :label="`Клиент ${customerName}`"
          default-opened
        )
          q-card
            q-card-section
              calendar-customer(
                @customerChange="newBooking.customer = $event"
                )
        q-expansion-item(
          group="new-event"
          label="Зал"
        )
          q-card
            q-card-section
              calendar-room
        q-expansion-item(
          group="new-event"
          label="Дата"
        )
          q-card
            q-card-section
              calendar-date
        q-expansion-item(
          group="new-event"
          label="Время"
        )
          q-card
            q-card-section
              calendar-time
        q-expansion-item(
          group="new-event"
          label="Цель"
        )
          q-card
            q-card-section
              calendar-event
        q-expansion-item(
          group="new-event"
          label="Доп. услуги"
        )
          q-card
            q-card-section
              calendar-extras
        q-expansion-item(
          group="new-event"
          label="Участники"
        )
          q-card
            q-card-section
              calendar-members
        q-expansion-item(
          group="new-event"
          label="Оплата"
        )
          q-card
            q-card-section
              calendar-price
        q-expansion-item(
          group="new-event"
          label="Коммент"
        )
          q-card
            q-card-section
              calendar-comment
        q-expansion-item(
          group="new-event"
          label="Удалить бронирование"
        )
          q-card
            q-card-section
              calendar-delete
        calendar-apply

</template>

<script>
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
      }
    }
  },
  computed: {
    customerName () {
      return `${this.newBooking.customer.firstName} ${this.newBooking.customer.phone}`
    }
  }
}
</script>

<style scoped>

</style>
