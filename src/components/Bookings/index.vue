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
import bookings from '../../mocks/bookings'
import columns from './columns'

export default {
  name: 'Bookings',
  methods: {
    async getBookings () {
      // await this.$app.bookings.getAll()
      // this.bookings = this.$app.bookings.list
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
</style>
