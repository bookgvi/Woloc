<template lang="pug">
  .table
    DataTable(
      title="Дополнительные услуги"
      :loadData="$app.extras.getAll"
      :columns="columns"
      :details="details"
    )
      template(#row-controls)
        q-btn(flat round icon="drag_handle" no-caps title="Редактировать" @click="editExtras = true")
    q-dialog(v-model="editExtras" persistent)
      q-card
        q-card-section
          editExtras(@hide="editExtras = false")

      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить услугу" no-caps)

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
    editExtras: false
  })
}
</script>

<style scoped>
</style>
