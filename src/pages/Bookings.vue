<template lang="pug">
  q-page
    q-separator
    .wrapper
      .top-btn-container.flex
        div.main-btn.flex.q-mr-auto
          q-btn(
            no-caps
            label="Оплата"
          )
        q-btn.reset-btn(
          no-caps
          label="Сбросить все"
        )
    q-separator
    .wrapper
      .row.justify-end.q-px-none.q-mb-md
        .text-h5.q-ma-none Бронирования
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
        .flex.flex-center.q-mr-md
          q-pagination(
            v-model="current"
            color="primary"
            max="12"
            maxPages="3"
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
          icon="chevron_left"
          dense
        )
        q-btn(
          outline
          color="secondary"
          icon="chevron_right"
          dense
        )
      q-table(
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
import bookings from 'src/components/Calendar/Data/bookings'
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
      data: bookings
    }
  }
}
</script>

<style lang="stylus">
</style>
