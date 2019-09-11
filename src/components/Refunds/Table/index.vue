<template lang="pug">

  DataTable(
    title="Возврат"
    :controller="$app.refunds"
    :getDialogTitle="() => 'Возврат'"
    :columns="columns"
    :details="details"
  )
    template(#row-controls)
      q-btn(flat round icon="block")
      q-btn(flat round icon="thumb_up")

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'

export default {
  name: 'RefundsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  })
}
</script>

<style scoped>
</style>
