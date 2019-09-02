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
        @request="onRequest"
      )
        template(v-slot:top-left)
          .text-h6 Бронирования

        template(v-slot:top-right="props")
          table-controls(v-bind="props" :setPagination="setPagination")

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
import TableControls from './table-controls'
import bookings from '../../mocks/bookings'
import columns from './columns'

export default {
  name: 'Bookings',
  components: { TableControls, Menu },
  methods: {
    async getBookings (startRow, rowsPerPage, filter, sortBy, descending) {
      const useMock = true

      if (!useMock) await this.$app.bookings.getAll()

      const data = useMock
        ? bookings
        : this.$app.bookings.list
      this.pagination.rowsNumber = bookings.length

      return data.slice(startRow, startRow + rowsPerPage)
    },
    getEventIcon (eventType) {
      return icons.find(({ name }) => name === eventType).icon
    },
    setPagination (prop, value) {
      this.pagination[prop] = value
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
      data: [],
      columns,
      pagination: {
        sortBy: 'name',
        descending: false,
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
