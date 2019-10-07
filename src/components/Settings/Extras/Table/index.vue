<template lang="pug">

  DataTable(
    title="Дополнительные услуги"
    :loadData="$app.extras.getAll"
    :columns="columns"
    :details="details"
  )
    template(#row-controls)
      q-btn(flat round icon="drag_handle" no-caps)
    template(#table-controls-append)
      q-btn.q-ml-md.text-white.bg-primary(label="Добавить услугу" no-caps)

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'

export default {
  name: 'extrasTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  })
}
</script>

<style scoped>
</style>
