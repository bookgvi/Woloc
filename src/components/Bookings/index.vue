<script>
import Menu from '../Menu'
import TableControls from './table-controls'
import TableRow from './table-row'
import bookings from '../../mocks/bookings'
import columns from './columns'

export default {
  name: 'Bookings',
  components: { Menu, TableControls, TableRow },
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
        table-row(v-bind="props")
</template>

<style lang="stylus">
  .q-table__top
    padding 20px 0

  thead tr:first-child th
    opacity 1
    background-color $grey-12
    text-transform uppercase
    text-align left
</style>
