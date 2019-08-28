<template lang="pug">
  q-page(class="q-layout-padding")
    div.top-btn-container.flex
      div.main-btn.flex.q-mr-auto
        q-btn(
          no-caps
          label="Оплата"
        )
      q-btn.reset-btn(
        no-caps
        label="Сбросить все"
      )
    q-separator.q-mt-xs.q-px-none.q-my-md
    q-toolbar.row.justify-end.q-px-none.q-mb-md
      p(
        class="text-h5 q-ma-none"
        ) Бронирования
      q-input(
        class="offset-1 col-3"
        v-model="search"
        :dense="true"
        square
        outlined
        type="search"
        placeholder="Поиск"
        )
        template(v-slot:prepend)
            q-icon(name="search")
      q-space
      div(
        class="flex flex-center q-mr-md"
        )
        q-pagination(
          v-model="current"
          color="primary"
          :max="12"
          :maxPages="3"
          :boundary-numbers="true"
          )
      q-select(
        square
        outlined
        v-model="some"
        :options="options"
        :dense="true"
        class="q-mr-md"
        )
      q-btn(
        outline
        color="secondary"
        class="no-shadow"
        icon="chevron_left"
        :dense="true"
       )
      q-btn(
         outline
         color="secondary"
         class="no-shadow q-mr-md"
         icon="chevron_right"
         :dense="true"
        )
    q-table(
      class="no-shadow"
      :data="data"
      :columns="columns"
      row-key="name"
      )
      template(v-slot:body-cell-room="props")
        q-td(:props="props")
          q-chip(dense square :color="props.value.color") {{props.value.name}}
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageBookings',
  data () {
    return {
      options: [10, 50, 100, 250],
      some: 100,
      current: 1,
      search: '',
      columns: [
        {
          name: 'id',
          label: 'id',
          field: 'id',
        },
        {
          name: 'customer',
          label: 'клиент',
          field: row => row.customer.name,
        },
        {
          name: 'room',
          label: 'зал',
          field: 'room',
        },
        {
          name: 'eventType',
          label: 'цель',
          field: 'room',
        },
        {
          name: 'amount',
          label: 'оплата, р.',
          field: row => [row.prepayment, row.amount].join(' / '),
        },
        {
          name: 'guestsCount',
          label: 'гости',
          field: 'guestsCount',
        },
        {
          name: 'servicesCount',
          label: 'допы',
          field: 'servicesCount',
        },
        {
          name: 'date',
          label: 'дата',
          field: 'date',
          format: value => date.formatDate(value, 'D MMM')
        },
        {
          name: 'time',
          label: 'время',
          field: 'date',
          format: value => date.formatDate(value, 'H:mm') + ' -'
        },
        {
          name: 'promo',
          label: 'промо',
          field: 'promo',
        },
        {
          name: 'comment',
          label: 'коммент',
          field: 'comment',
        },
      ].map(col => ({
        ...col,
        align: 'left'
      })),
      data: [
        {
          id: 55799,
          customer: {
            name: 'Андрей Ревин'
          },
          room: {
            name: 'Зал №13 капотня',
            color: 'orange',
          },
          prepayment: 4800,
          amount: 4800,
          guestsCount: 6,
          servicesCount: 2,
          date: '2019-10-15',
          comment: 'Подготовить что-то'
        },
        {
          id: 55778,
          customer: {
            name: 'Джим кэмп'
          },
          room: {
            name: 'Зал №11 капотня',
            color: 'red',
          },
          prepayment: 2400,
          amount: 4800,
          guestsCount: 3,
          date: '2019-10-14'
        },
      ],
    }
  }
}
</script>

<style lang="stylus">
  .top-btn-container
    .q-btn
      border 1px solid #ECECEC
    .reset-btn
      justify-self flex-end
  thead tr:first-child th
      opacity 1
      background-color #F5F5F5
      text-transform uppercase
      text-align left
  .q-btn
      min-height 40px
      border-radius 0
      box-shadow none
  .q-pagination
      .q-btn
          margin 0 4px
          width 3em
          padding-left 0 !important
          padding-right 0 !important
  button.q-btn--flat
      /* background-color rgba(0, 0, 0, .05) */
      color #4A4A4A !important
      border 1px solid #ECECEC
  table tr td i.fa-star
      color $primary
  table p
      margin 0
</style>
