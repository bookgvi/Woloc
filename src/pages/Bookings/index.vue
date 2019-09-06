<script>
import UcTable from '../../components/UcTable'
import columns from './columns'
import details from './details'

export default {
  name: 'bookings-page',
  components: { UcTable },
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

      uc-table(
        title="Бронирования"
        :controller="$app.bookings"
        :columns="columns"
        :details="details"
      )
        template(v-slot:rowActions="props")
          q-btn(flat round icon="comment")
          q-btn(flat round icon="delete")
          q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)")
          q-btn(flat round icon="thumb_up")
</template>
