<template lang="pug">
  .bookingDialog.q-pa-md
    .row.justify-between.q-pb-md
      .col
        .text-h5 Бронь {{ row.id }}
      .col-1
        q-icon.cursor-pointer(name="close" @click="$emit('hasModal')" style="font-size: 20px;")
    .row
      .col
        q-input.readonly(label="Зал" readonly=true borderless)
          template(#append)
            .data {{ row.room.name }}
    .row
      .col
        q-input.readonly(label="Дата" readonly borderless)
          template(#append)
            .data {{ date }}
    .row
      .col
        q-input.readonly(label="Время" readonly borderless)
          template(#append)
            .data {{ time }}
    .row
      .col
        q-input.readonly(label="Цель" readonly borderless)
          template(#append)
            .data {{ row.eventType }}
    .row
      .col
        q-input.readonly(label="Количество гостей" readonly borderless)
          template(#append)
            .data {{  }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Источник брони" readonly borderless)
          template(#append)
            .data {{  }}
    .row
      .col
        .text-h5 Данные клиента
    .row
      .col
        q-input.readonly(label="Имя" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.fullName }}
    .row
      .col
        q-input.readonly(label="Телефон" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.phone }}
    .row
      .col
        q-input.readonly(label="Эл. почта" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.email }}

</template>
<script>
import { date } from 'quasar'
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    room: Object
  },
  computed: {
    date () {
      return date.formatDate(this.row.reservedFrom, 'D MMM YYYY')
    },
    time () {
      const time = [this.row.reservedFrom, this.row.reservedTo].map(
        part => date.formatDate(part, 'H:mm')
      ).join(' — ')
      return time
    }
  },
  created () {
    console.log('Created BookingDialog', this.row)
  }
}
</script>

<style lang="stylus">
  .data
    font-size: 1rem

  .readonly
    border-bottom #e5e5e5 solid 1px
</style>
