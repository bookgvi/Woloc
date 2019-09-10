<template lang="pug">
  q-page
    .wrapper
      Menu
      uc-table(
        title="Возврат"
        :controller="$app.refunds"
        :columns="columns"
        :details="[]"
      )
        template(v-slot:row-controls="props")
          q-btn(flat round icon="comment" title="Открыть чат")
          q-btn(flat round icon="delete" title="Удалить")
          q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
          q-btn(flat round icon="thumb_up")

</template>

<script>
import UcTable from '../../components/UcTable'
import columns from './columns'

export default {
  name: 'refunds',
  components: { UcTable },
  data () {
    return {
      columns
    }
  },
}
</script>
