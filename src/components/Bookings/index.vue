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
      q-table(
        :data="bookings"
        :columns="columns"
        row-key="id"
        hide-bottom
      )
        template(v-slot:body="props")
          q-tr(:props="props" :class="props.row.removed && 'removed'")
            q-td(
              v-for="{name, value} of props.cols"
              :key="name"
              :props="props"
              :class="name"
            )
              template(v-if="name === 'room'")
                q-chip(dense square :color="value.color" :title="value.name") {{value.name}}
              template(v-else-if="name === 'eventType'")
                q-icon(size="sm" :name='getEventIcon(value)')
              template(v-else-if="name === 'isPaid'")
                q-icon(size="sm" name="check" color="green" v-if="value")
              template(v-else-if="name === 'comment'")
                span(:title="value") {{value}}
              template(v-else-if="name === 'actions'")
                i(class="fas fa-ellipsis-v")
              template(v-else) {{ value }}
</template>

<script>
import icons from 'src/common/eventType/icons'
import bookings from '../../mocks/bookings'
import columns from './columns'

export default {
  name: 'Bookings',
  methods: {
    async getBookings () {
      await this.$app.bookings.getAll()
      this.bookings = this.$app.bookings.list
      this.bookings = bookings
    },
    getEventIcon (eventType) {
      return icons.find(({ name }) => name === eventType).icon
    }
  },
  created () {
    this.getBookings()
  },
  data () {
    return {
      bookings: [],
      columns
    }
  }
}
</script>

<style lang="stylus">
  thead tr:first-child th
    opacity 1
    background-color $grey-12
    text-transform uppercase
    text-align left
  tbody
    tr.removed
      opacity: .2
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
</style>
