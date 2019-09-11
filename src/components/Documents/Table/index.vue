<template lang="pug">
  DataTable(
    :columns="columns"
    :details="details"
  )
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
