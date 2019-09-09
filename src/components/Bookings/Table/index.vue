<template lang="pug">

  DataTable(
    title="Бронирования"
    :controller="$app.bookings"
    :columns="columns"
    :details="details"
  )
    template(v-slot:row-controls="props")
      q-btn(flat round icon="comment" title="Открыть чат")
      q-btn(flat round icon="delete" title="Удалить")
      q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
      q-btn(flat round icon="thumb_up")

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from '../../DataTable'

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
