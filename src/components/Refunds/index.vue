<template lang="pug">
  .wrapper
    TableTitle
    DataTable(
      title="Возврат"
      :controller="$app.refunds"
      :columns="columns"
    )
      template(#row-controls)
        q-btn(flat round icon="block")
        q-btn(flat round icon="thumb_up")
</template>

<script>
import TableTitle from './Table/TableTitle'
// import Menu from '../Menu'
export default {
  name: 'RefundsIndex',
  components: {
    TableTitle,
    // Menu
  }
}
</script>

<style>
</style>
