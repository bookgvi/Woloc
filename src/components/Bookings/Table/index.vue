<template lang="pug">
  DataTable(
    title="Бронирования"
    :getDialogTitle="(row) => `Бронь ${row.id}`"
    :controller="$app.bookings"
    :columns="columns"
    :details="details"
  )
    template(#row-dialog="props")
      BookingsDialog(v-bind="props")

    template(#row-controls="props")
      q-btn(flat round icon="comment" title="Открыть чат")
      q-btn(flat round icon="delete" title="Удалить")
      q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
      q-btn(flat round icon="thumb_up")

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from '../../DataTable'
import BookingsDialog from './BookingsDialog'

export default {
  name: 'BookingsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  })

}
</script>

<style scoped>
</style>
