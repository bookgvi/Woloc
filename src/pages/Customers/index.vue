<script>
import UcTable from '../../components/UcTable'

export default {
  name: 'customers-page',
  components: { UcTable },
}
</script>

<template lang="pug">
  q-page
    .wrapper
      Menu

      uc-table(
        :controller="$app.customers"
        :columns="[]"
        :details="[]"
      )
</template>
