<template lang="pug">
  .table.wrapper.wrapper--header
    DataTable(
      title="Дополнительные услуги"
      :loadData="$app.extras.getAll"
      :filter="$app.filters.getValues('settings')"
      :columns="columns"
      @toggleDialogRow="toggleDialogRow"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить услугу" no-caps)

      // template(#row-controls="props")
        q-btn(flat round icon="drag_handle" no-caps title="Редактировать")
    q-dialog(v-model="editExtras")
      q-card(style="min-width: 700px")
        q-card-section
          editExtras(:singleStudio="singleStudio" :rooms="rooms" :dataset="dataset" @hide="editExtras = false")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editExtras from '../editExtrasModal/editExtras'
export default {
  name: 'extrasTable',
  components: { DataTable, editExtras },
  data: () => ({
    columns,
    details,
    editExtras: false,
    dataset: {},
    singleStudio: {},
    rooms: []
  }),
  methods: {
    toggleDialogRow (props) {
      const { studio, rooms } = props
      this.singleStudio = studio
      this.rooms = rooms
      this.editExtras = true
      this.dataset = props
    }
  }
}
</script>
