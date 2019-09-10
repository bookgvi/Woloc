<script>
import UcTable from 'components/UcTable'
import columns from './columns'
import details from './details'
import CustomersDialog from './CustomersDialog'

export default {
  name: 'customers-page',
  components: { CustomersDialog, UcTable },
  data () {
    return {
      columns,
      details,
    }
  }
}
</script>

<template lang="pug">
  q-page
    .wrapper
      Menu

      UcTable(
        title="Пользователи"
        :getDialogTitle="() => 'Личные данные'"
        :controller="$app.customers"
        :columns="columns"
        :details="details"
      )
        template(#table-controls)
          q-btn.q-ml-md(color="primary" label="Добавить пользователя")

        template(#row-dialog="props")
          CustomersDialog(v-bind="props")

        template(#row-controls="props")
          q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
          q-btn(flat round icon="phone" title="Позвонить")
          q-btn(flat round icon="email" title="Отправить E-mail")
          q-btn(flat round icon="comment" title="Открыть чат")
</template>
