<template lang="pug">
  q-popup-proxy
    q-card.row.justify-center.items-center(
      style="width: 320px;"
      )
      .q-pa-md
        q-list(
          bordered
          dense
          )
          q-expansion-item(
            group="new-event"
            label="Клиент"
            default-opened
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-customer
          q-expansion-item(
            group="new-event"
            label="Зал"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-room
          q-expansion-item(
            group="new-event"
            label="Дата"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-date
          q-expansion-item(
            group="new-event"
            label="Время"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-time
          q-expansion-item(
            group="new-event"
            label="Цель"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-event
          q-expansion-item(
            group="new-event"
            label="Доп. услуги"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-extras
          q-expansion-item(
            group="new-event"
            label="Участники"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-members
          q-expansion-item(
            group="new-event"
            label="Оплата"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-price
          q-expansion-item(
            group="new-event"
            label="Коммент"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-comment
          q-expansion-item(
            group="new-event"
            label="Удалить бронирование"
            header-class="text-primary"
          )
            q-card
              q-card-section
                calendar-delete

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
    CalendarCustomer
  }
}
</script>

<style scoped>

</style>
