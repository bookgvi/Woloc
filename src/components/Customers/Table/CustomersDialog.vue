<template lang="pug">
  .modalCustomer.q-pa-lg
    .row
      .col
        .text-h6.text-bold Личные данные
      .col-1
        q-btn.q-mr-md(icon="close" flat v-close-popup)
    .row
      .col
        q-input.readonly(label="Имя" readonly=true borderless)
          template(#append)
            .data {{ row.fullName }}
    .row
      .col
        q-input.readonly(label="Дата рождения" readonly borderless)
          template(#append)
            .data {{ row.birthday }}
    .row
      .col
        q-input.readonly(label="Телефон" readonly borderless)
          template(#append)
            .data {{ row.phone }}
    .row
      .col
        q-input.readonly(label="Эл. почта" readonly borderless)
          template(#append)
            .data {{ row.email }}
    .row.q-pb-md
      .col
        q-input.readonly(label="Скидка" readonly borderless)
          template(#append)
            .data {{ row.discount }}%
    .row.q-pb-sm
      .col
        .text-h6.text-bold История бронирований
    .row.q-py-sm.readonly
      .col
        .data Всего
      .col
        .row.justify-center
          .data Завершено
      .col
        .row.justify-end
          .data Отменено
    .row.q-py-sm.readonly
      .col
        .data {{ row.bookings.count.total }}
      .col
        .row.justify-center
          .data {{ row.bookings.count.done }}
      .col
        .row.justify-end
          .data {{ row.bookings.count.cancelled }}
    .row.q-py-md
      .col
        .text-h6.text-bold Бронирования

</template>

<script>
export default {
  name: 'CustomersDialog',
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    details: Array,
    readonly: Boolean,
  },
  created () {
    console.log(this.row)
  }
}
</script>

<style lang="stylus" scoped>
  .data
    font-size: 1rem

  .readonly
    border-bottom #e5e5e5 solid 1px
</style>
