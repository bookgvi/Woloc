<template lang="pug">
  .refunds
    Menu
    RefundsTable
</template>

<script>
import RefundsTable from './Table/index'
import Menu from '../Menu'
export default {
  name: 'RefundsIndex',
  components: {
    Menu,
    RefundsTable,
  }
}
</script>

<style>
</style>
