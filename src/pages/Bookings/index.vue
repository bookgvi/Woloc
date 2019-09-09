<script>
import UcTable from 'components/UcTable'
import BookingsDialog from './BookingsDialog'
import columns from './columns'
import details from './details'

export default {
  name: 'bookings-page',
  components: { UcTable, BookingsDialog },
  data () {
    return {
      columns,
      details,
    }
  },
}
</script>

<template lang="pug">
  q-page
    .wrapper
      Menu

      UcTable(
        title="Бронирования"
        :getDialogTitle="(row) => `Бронь ${row.id}`"
        :controller="$app.bookings"
        :columns="columns"
        :details="details"
      )
        template(v-slot:row-dialog="props")
          BookingsDialog(v-bind="props")

        template(v-slot:row-controls="props")
          q-btn(flat round icon="comment" title="Открыть чат")
          q-btn(flat round icon="delete" title="Удалить")
          q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
          q-btn(flat round icon="thumb_up")
</template>
