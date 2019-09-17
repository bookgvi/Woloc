<template lang="pug">

  DataTable(
    title="Финансы"
    :controller="$app.finances"
    :getDialogTitle="() => 'Финансы'"
    :columns="columns"
    :details="details"
    :isRowDisabled="({ status }) => !status"
  )
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'

export default {
  name: 'FinancesTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  })
}
</script>

<style scoped>
</style>
