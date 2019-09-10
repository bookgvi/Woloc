<template lang="pug">
  .customers
    Menu
    CustomersTable

</template>

<script>
import DataTable from '../DataTable/index'
import columns from './Table/columns'
import Filters from '../Filters/index'
import Menu from '../Menu'
import CustomersTable from './Table/index'

export default {
  name: 'CustomersPage',
  components: { CustomersTable, Menu, Filters, DataTable },
  data () {
    return {
      columns
    }
  }
}
</script>
