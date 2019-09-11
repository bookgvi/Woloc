<template lang="pug">
  DataTable(
    :columns="columns"
    :details="details"
    :controller="$app.documents"
  )
    template(#row-controls)
      q-btn(flat icon-right="get_app" title="Скачать")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
export default {
  name: 'DocumentsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  })
}
</script>

<style scoped>
</style>
