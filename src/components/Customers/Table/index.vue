<template lang="pug">
  DataTable(
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

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import CustomersDialog from './CustomersDialog'

export default {
  name: 'CustomersTable',
  components: { DataTable, CustomersDialog },
  data: () => ({
    columns,
    details,
  })
}
</script>

<style scoped>
</style>
