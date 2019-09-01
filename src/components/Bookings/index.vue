<template lang="pug">
  q-page
    .wrapper
      Menu

      q-table(
        :data="bookings"
        :columns="columns"
        row-key="id"
        hide-bottom
      )
        template(v-slot:top-left)
          .text-h6 Бронирования

        template(v-slot:top-right="props")
          q-input.q-mr-sm(
            v-model="search"
            :dense="true"
            square
            outlined
            type="search"
            placeholder="Поиск"
          )
            template(v-slot:prepend)
              q-icon(name="search")

          q-pagination(
            color="primary"
            :max="12"
            :maxPages="3"
            :boundary-numbers="true"
            :value="props.pagination.page"
          )
          q-select.q-mx-md(
            square
            v-model="some"
            :options="options"
            :dense="true"
            outlined
          )
          q-btn(
            flat
            color="secondary"
            class="no-shadow"
            icon="chevron_left"
            :dense="true"
          )
          q-btn(
            flat
            color="secondary"
            class="no-shadow"
            icon="chevron_right"
            :dense="true"
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
import Menu from '../Menu'
import bookings from '../../mocks/bookings'
import columns from './columns'

export default {
  name: 'Bookings',
  components: { Menu },
  methods: {
    log (...args) {
      console.log(...args)
    },

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
      options: [10, 50, 100, 250],
      some: 100,
      current: 1,
      bookings: [],
      columns
    }
  }
}
</script>

<style lang="stylus">
  .q-table__top
    padding 20px 0
  .q-table__control
    .q-btn
      width 3em
      padding 7px 16px !important
      font-weight bold
    .q-btn--flat
      border $grey-12 solid 1px
      color black !important
    .q-btn--standard
      border none
      color white

    .q-pagination .q-btn
      margin 0 4px

    .q-select
      .q-field__native
        font-weight bold

    .q-field__control
      input
        font-weight bold

    .q-field__control:before
        border-color $grey-12
  thead tr:first-child th
    opacity 1
    background-color $grey-12
    text-transform uppercase
    text-align left
  tbody
    tr.removed
      opacity: .2
    .room
      .q-chip
        width 100px
        div
          width 100%
          overflow hidden
          text-overflow ellipsis

    .comment
      max-width 100px
      overflow hidden
      text-overflow ellipsis
</style>
