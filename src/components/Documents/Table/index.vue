<template lang="pug">
  DataTable(
    :columns="columns"
    :details="details"
    :loadData="$app.documents.getAll"
  )
    template(#row-controls="props")
      q-btn(flat icon-right="get_app" title="Скачать" @click="handle(props.row.file)")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
export default {
  name: 'DocumentsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  }),
  methods: {
    handle (url) {
      console.log('Downloading... ', url)
    }
  }
}
</script>

<style scoped>
</style>
