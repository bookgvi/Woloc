<template lang="pug">
  .customers
    Menu
    CustomersTable

</template>

<script>
import Menu from '../Menu'
import CustomersTable from './Table/index'

export default {
  name: 'CustomersPage',
  components: { CustomersTable, Menu },
}
</script>
