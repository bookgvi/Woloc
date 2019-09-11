<template lang="pug">
  .documents
    Menu
    DocumentsTable
</template>

<script>
import DocumentsTable from './Table/index.vue'
import Menu from '../Menu/index'

export default {
  components: {
    Menu,
    DocumentsTable
  }
}
</script>

<style scoped>

</style>
