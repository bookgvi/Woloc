<template lang="pug">
  data-table(
    title="Бронирования"
    :getDialogTitle="(row) => `Бронь ${row.id}`"
    :loadData="$app.bookings.getAll"
    :filter="$app.filters.getValues('bookings')"
    :columns="columns"
    :details="details"
  )
    template(#row-dialog="props")
      bookings-dialog(v-bind="props")

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
  name: 'bookings-table',
  components: { DataTable, BookingsDialog },
  data: () => ({
    columns,
    details
  })

}
</script>
