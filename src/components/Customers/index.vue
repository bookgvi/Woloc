<script>
import DataTable from '../DataTable/index'
import columns from './Table/columns'
import Filters from '../Filters/index'

export default {
  name: 'CustomersPage',
  components: { Filters, DataTable },
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
      Filters

</template>
