<template lang="pug">
  .refunds
    Menu
    FinancesTable
</template>

<script>
import FinancesTable from './Table/index'
import Menu from '../Menu'
export default {
  name: 'RefundsIndex',
  components: {
    Menu,
    FinancesTable,
  }
}
</script>

<style>
</style>
