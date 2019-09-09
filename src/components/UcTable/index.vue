<script>
import Menu from '../Menu'
import TableControls from './TableControls'
import TableRow from './TableRow'
import pagination from './pagination'

export default {
  name: 'UcTable',
  components: { Menu, TableControls, TableRow },
  mixins: [pagination],
  props: {
    title: String,
    getDialogTitle: Function,
    columns: Array,
    details: Array,
    controller: Object,
    activeColumns: Array,
  },
  data () {
    return {
      data: [],
      controlsRowId: undefined,
      dialogRowId: undefined,
    }
  },
  methods: {
    toggleControlsRow (id) {
      this.controlsRowId = this.controlsRowId === id ? undefined : id
    },
    toggleDialogRow (id) {
      this.dialogRowId = this.dialogRowId === id ? undefined : id
    },
  },
  computed: {
    dialogRow () {
      return this.dialogRowId && this.data.find(({ id }) => id === this.dialogRowId)
    },
    normalizedColumns () {
      return this.columns.map(col => ({
        ...col,
        field: col.field || col.name,
        align: 'left',
        style: col.width && `width: ${col.width}px`
      }))
    },
    normalizedDetails () {
      return this.details.map(section => ({
        ...section,
        fields: section.fields.map(field => ({
          ...field,
          field: field.field || field.name,
        }))
      }))
    }
  }
}
</script>

<template lang="pug">
q-page
  .wrapper
    Menu

    slot(
      name="row-dialog"
      readonly
      :row="dialogRow"
      :details="normalizedDetails"
      :getTitle="getDialogTitle"
      @toggleDialogRow="toggleDialogRow"
    )

    q-table(
      row-key="id"
      hide-bottom
      :data="data"
      :columns="normalizedColumns"
      :pagination.sync="pagination"
      @request="onRequest"
    )
      template(#top-left)
        .text-h6 {{ title }}

      template(#top-right="props")
        table-controls(v-bind="props" :setPagination="setPagination")
          slot(name="table-controls")

      template(#body="props")
        table-row(
          v-bind="props"
          v-slot="props"
          :controlsRowId="controlsRowId"
          @toggleControls="toggleControlsRow"
          @toggleDialogRow="toggleDialogRow"
        )
          slot(name="row-controls" :row="props.row" :toggleDialogRow="toggleDialogRow")
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
