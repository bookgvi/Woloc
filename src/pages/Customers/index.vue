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
        template(v-slot:tableActions)
          q-btn(color="primary" label="Добавить пользователя")
</template>
