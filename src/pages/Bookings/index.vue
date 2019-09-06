<script>
import columns from './columns'
import details from './details'
import UcTable from '../../components/UcTable'

export default {
  name: 'bookings-page',
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
