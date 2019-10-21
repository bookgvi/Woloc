<template lang="pug">
  data-table(
    title="Бронирования"
    :getDialogTitle="({ id }) => `Бронь ${id}`"
    :loadData="$app.bookings.getAll"
    :filter="$app.filters.getValues('bookings')"
    :columns="columns"
    :details="details"
    :isRowDisabled="({ status }) => status === disabledStatus"
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
import DataTable from 'components/DataTable'
import BookingsDialog from './BookingsDialog'

import { BOOKING_STATUSES } from 'src/common/constants'

export default {
  name: 'bookings-table',
  components: { DataTable, BookingsDialog },
  data: () => ({
    columns,
    details,
    disabledStatus: BOOKING_STATUSES.CANCELED
  })
}
</script>
