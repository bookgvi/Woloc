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
      row-key="id"
      hide-bottom
    )
      template(v-slot:body-cell-room="props")
        q-td.room(:props="props")
          q-chip(dense square :color="props.value.color" :title="props.value.name") {{props.value.name}}
      template(v-slot:body-cell-eventType="props")
        q-td(:props="props")
          q-icon(size="md" :name='getEventIcon(props.value)')
      template(v-slot:body-cell-isPaid="props")
        q-td(:props="props")
          q-icon(size="md" name="check" color="green" v-if="props.value")
      template(v-slot:body-cell-comment="props")
        q-td.comment(:props="props")
          span(:title="props.value") {{props.value}}
      template(v-slot:body-cell-actions="props")
        q-td.flex.items-center(:props="props")
          i(class="fas fa-ellipsis-v")
</template>

<script>
import icons from 'src/common/eventType/icons'
import { date } from 'quasar'

export default {
  name: 'PageBookings',
  methods: {
    getEventIcon: (eventType) => icons.find(({ name }) => name === eventType).icon
  },
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
          style: 'width: 70px'
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
          style: 'width: 120px'
        },
        {
          name: 'eventType',
          label: 'цель',
          field: 'eventType',
          style: 'width: 50px'
        },
        {
          name: 'amount',
          label: 'оплата, р.',
          field: row => [row.prepayment, row.amount].join(' / '),
          style: 'width: 100px'
        },
        {
          name: 'isPaid',
          field: 'isPaid',
          style: 'width: 10px'
        },
        {
          name: 'guestsCount',
          label: 'гости',
          field: 'guestsCount',
          style: 'width: 60px'
        },
        {
          name: 'servicesCount',
          label: 'допы',
          field: 'servicesCount',
          format: value => value || '—',
          style: 'width: 60px'
        },
        {
          name: 'date',
          label: 'дата',
          field: 'reservedFrom',
          format: value => date.formatDate(value, 'D MMM'),
          style: 'width: 60px'
        },
        {
          name: 'time',
          label: 'время',
          format: (value, { reservedFrom, reservedTo }) => [reservedFrom, reservedTo].map(
            part => date.formatDate(part, 'H:mm')
          ).join(' — '),
          style: 'width: 120px'
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
        {
          name: 'actions',
          style: 'width: 40px'
        }
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
            name: 'Зал №13 капотня хуётня',
            color: 'orange',
          },
          eventType: 'photo',
          prepayment: 4800,
          amount: 4800,
          isPaid: true,
          guestsCount: 6,
          servicesCount: 2,
          reservedFrom: '2019-10-15 13:30',
          reservedTo: '2019-10-15 18:00',
          comment: 'Подготовить что-то, подготовить что-то, подготовить что-то, подготовить что-то, подготовить что-то'
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
          eventType: 'event',
          prepayment: 2400,
          amount: 4800,
          isPaid: false,
          guestsCount: 3,
          reservedFrom: '2019-10-14 12:15',
          reservedTo: '2019-10-14 19:00',
          comment: 'Удалено',
          removed: true,
        },
        {
          id: 55778,
          customer: {
            name: 'Андрей Куранов'
          },
          room: {
            name: 'Зал №11 капотня',
            color: 'cyan',
          },
          eventType: 'video',
          prepayment: 2400,
          amount: 4800,
          isPaid: false,
          guestsCount: 3,
          reservedFrom: '2019-10-14 12:15',
          reservedTo: '2019-10-14 19:00'
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
  tbody
    .room
      max-width 80px
      .q-chip
        width 100%
        div
          width 100%
          overflow hidden
          text-overflow ellipsis

    .comment
      max-width 100px
      overflow hidden
      text-overflow ellipsis
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
</style>
