<script>
import columns from './columns'
import details from './details'
import UcTable from '../UcTable'

export default {
  name: 'Bookings',
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
      :controller="$app.bookings"
      :columns="columns"
      :details="details"
    )
</template>
