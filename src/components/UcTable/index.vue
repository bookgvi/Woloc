<script>
import Menu from '../Menu'
import TableControls from './table-controls'
import TableRow from './table-row'
import pagination from './pagination'
import RowDialog from './row-dialog'

export default {
  name: 'uc-table',
  components: { RowDialog, Menu, TableControls, TableRow },
  mixins: [pagination],
  props: {
    title: String,
    columns: Array,
    details: Array,
    controller: Object,
  },
  data () {
    return {
      data: [],
      actionsRowId: undefined,
      dialogRowId: undefined,
    }
  },
  methods: {
    toggleActionsRow (id) {
      this.actionsRowId = this.actionsRowId === id ? undefined : id
    },
    toggleDialogRow (id) {
      this.dialogRowId = this.dialogRowId === id ? undefined : id
    }
  },
  computed: {
    dialogRow () {
      return this.dialogRowId && this.data.find(({ id }) => id === this.dialogRowId)
    }
  }
}
</script>

<template lang="pug">
q-page
  .wrapper
    Menu

    row-dialog(
      readonly
      :row="dialogRow"
      :details="details"
      @toggleDialogRow="toggleDialogRow"
    )

    q-table(
      row-key="id"
      hide-bottom
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      @request="onRequest"
    )
      template(v-slot:top-left)
        .text-h6 {{ title }}

      template(v-slot:top-right="props")
        table-controls(v-bind="props" :setPagination="setPagination")
          slot(name="tableActions")

      template(v-slot:body="props")
        table-row(
          v-bind="props"
          v-slot="props"
          :actionsRowId="actionsRowId"
          @toggleActions="toggleActionsRow"
        )
          slot(name="rowActions" :row="props.row" :toggleDialogRow="toggleDialogRow")
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
