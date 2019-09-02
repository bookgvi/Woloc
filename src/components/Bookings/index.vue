<template lang="pug">
  q-page
    .wrapper
      Menu

      q-table(
        row-key="id"
        hide-bottom
        :data="data"
        :columns="columns"
        :pagination.sync="pagination"
        :loadind="loading"
        @request="onRequest"
      )
        template(v-slot:top-left)
          .text-h6 Бронирования

        template(v-slot:top-right="props")
          q-input.q-mr-sm(
            :dense="true"
            square
            outlined
            type="search"
            placeholder="Поиск"
          )
            template(v-slot:prepend)
              q-icon(name="search") {{ log(props) }}

          q-pagination(
            color="black"
            :max="props.pagesNumber"
            :maxPages="3"
            :boundary-numbers="true"
            :value="props.pagination.page"
            @input="changePage"
          )
          q-select.q-mx-md(
            square
            :value="props.pagination.rowsPerPage"
            :options="options"
            :dense="true"
            @input="changeRowsPerPage"
            outlined
          )
          q-btn(
            flat
            color="secondary"
            class="no-shadow"
            icon="chevron_left"
            :dense="true"
            :disable="props.isFirstPage"
            @click="props.prevPage"
          )
          q-btn(
            flat
            color="secondary"
            class="no-shadow"
            icon="chevron_right"
            :dense="true"
            :disable="props.isLastPage"
            @click="props.nextPage"
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

    async getBookings (startRow, rowsPerPage, filter, sortBy, descending) {
      this.loading = true
      // await this.$app.bookings.getAll()
      this.loading = false
      // this.data = this.$app.bookings.list
      this.pagination.rowsNumber = bookings.length

      return bookings.slice(startRow, startRow + rowsPerPage)
    },
    getEventIcon (eventType) {
      return icons.find(({ name }) => name === eventType).icon
    },
    changeRowsPerPage ($event) {
      this.pagination.rowsPerPage = $event
      this.onRequest({ pagination: this.pagination })
    },
    changePage ($event) {
      this.pagination.page = $event
      this.onRequest({ pagination: this.pagination })
    },
    async onRequest ({ filter, pagination: { page, rowsPerPage, sortBy, descending } }) {
      const startRow = (page - 1) * rowsPerPage

      this.data = await this.getBookings(startRow, rowsPerPage, filter, sortBy, descending)
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending
    },
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  data () {
    return {
      options: [10, 50, 100, 250],
      some: 100,
      current: 1,
      data: [],
      columns,
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
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
    .q-btn--standard
      border none
      background-color $primary !important
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
