<template lang="pug">

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
export default {
  name: 'index'
}
</script>

<style scoped>
</style>
