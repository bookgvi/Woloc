<template lang="pug">
  q-page
    .wrapper
      Menu

      uc-table(
        title="Возврат"
        :controller="$app.refunds"
        :columns="columns"
      )
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
  }
}
</script>
