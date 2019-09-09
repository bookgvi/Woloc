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
        template(v-slot:table-controls)

        template(v-slot:row-controls="props")
          q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
          q-btn(flat round icon="phone" title="Позвонить")
          q-btn(flat round icon="email" title="Отправить E-mail")
          q-btn(flat round icon="comment" title="Открыть чат")
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
  created () {
    console.log(this.$api)
  }
}
</script>
