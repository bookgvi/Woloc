<template lang="pug">

  DataTable(
    :title="$t('customers')"
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

<script>
import columns from './columns'
import DataTable from '../../DataTable'

export default {
  name: 'CustomersTable',
  components: { DataTable },
  data: () => ({
    columns,
  })

}
</script>

<style scoped>
</style>
