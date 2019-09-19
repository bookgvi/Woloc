<template lang="pug">

  DataTable(
    title="Финансы"
    :loadData="$app.finances.getAll"
    :getDialogTitle="() => 'Финансы'"
    :columns="columns"
    :details="details"
  )
    template(#title_advance)
      .text-h6.inline-block.q-px-xl 27 456 р.
      q-btn.bg-primary(no-caps text-color='white' label="Вывести на счет")

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
