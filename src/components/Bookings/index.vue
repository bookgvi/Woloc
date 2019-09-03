<script>
import Menu from '../Menu'
import TableControls from './table-controls'
import TableRow from './table-row'
import columns from './columns'
import details from './details'
import pagination from './pagination'
import RowDialog from './row-details'
import bookings from '../../mocks/bookings'

export default {
  name: 'Bookings',
  components: { RowDialog, Menu, TableControls, TableRow },
  mixins: [pagination],
  data () {
    return {
      row: bookings[10],
      data: [],
      columns,
      details,
      controller: this.$app.bookings,
      openedRowId: null,
    }
  },
  methods: {
    toggleOpenedRow (id) {
      this.openedRowId = this.openedRowId === id
        ? null
        : id
    }
  }
}
</script>

<template lang="pug">
q-page
  .wrapper
    Menu

    row-dialog(:opened="true" :row="row" :sections="details")

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
        table-row(v-bind="props" @openRow="toggleOpenedRow" :openedRowId="openedRowId")
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
