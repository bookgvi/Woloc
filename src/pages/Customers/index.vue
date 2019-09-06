<script>
import UcTable from '../../components/UcTable'
import columns from './columns'

export default {
  name: 'customers-page',
  components: { UcTable },
  data () {
    return {
      columns
    }
  }
}
</script>

<template lang="pug">
  q-page
    .wrapper
      Menu

      uc-table(
        title="Пользователи"
        :controller="$app.customers"
        :columns="columns"
        :details="[]"
      )
        template(v-slot:table-controls)
          q-btn.q-ml-md(color="primary" label="Добавить пользователя")

        template(v-slot:row-controls="props")
          q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
          q-btn(flat round icon="phone" title="Позвонить")
          q-btn(flat round icon="email" title="Отправить E-mail")
          q-btn(flat round icon="comment" title="Открыть чат")
</template>
