<template lang="pug">

  DataTable(
    title="Дополнительные услуги"
    :loadData="$app.extras.getAll"
    :columns="columns"
    :details="details"
  )
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
